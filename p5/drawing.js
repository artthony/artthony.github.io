function getSubImageAndColours(img, x, y, radius) {
  let subImage = img.get(x - radius / 2, y - radius / 2, radius, radius)
  subImage.loadPixels()
  let colours = []
  for (let i = 0; i < subImage.pixels.length; i += subImage.width * 4) {
    let tmp = []
    for (let j = i; j < i + (subImage.width * 4); j += 4) {
      tmp.push([
        subImage.pixels[j],
        subImage.pixels[j+1],
        subImage.pixels[j+2],
        subImage.pixels[j+3]
      ])
    }
    colours.push(tmp)
  }
  return { subImage, colours }
}

// from params
const JUMP = 6
const STROKE_WEIGHT = 2
const THRESH = 0.3
const AGENT_NUM = 30

// other constants
// const CANVAS_SIZE = 600
// const PADDING = CANVAS_SIZE / 8
let CANVAS_SIZE
let CANVAS_WIDTH
let CANVAS_HEIGHT
let PADDING


const olive100 = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-olive-200')
  .trim();
let BG_COLOR
const gray950 = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-gray-950')
  .trim();
let TXT_COLOR
const xlBreakpoint = getComputedStyle(document.documentElement)
  .getPropertyValue('--breakpoint-xl')
  .trim();

class Agent {
    constructor(p5) {
      this.p5 = p5
      this.x = p5.random(PADDING, CANVAS_WIDTH - PADDING);
      this.y = p5.random(PADDING, CANVAS_HEIGHT - PADDING);
      this.px = this.x;
      this.py = this.y;
    }
  
    update() {
      this.px = this.x;
      this.py = this.y;
  
      const RAD = JUMP * 2 + 1
      let { colours } = getSubImageAndColours(img, this.px, this.py, RAD)
      let possible = [] // we want possible xys
      // loop over colours
      for (let i = 0; i < RAD; i += 1) { // y
        for (let j = 0; j < RAD; j += 1) { // x
          // if not pure white pixel
          if (i !== j && !colours[i][j].every(e => e === 255))
            possible.push([j,i]) // push x y coord
        }
      }
      if (possible.length) {
        // array has locations
        let [xx, yy] = possible[Math.floor(this.p5.random(0, possible.length))]
        this.x += xx - JUMP
        this.y += yy - JUMP
      } else {
        // no possible locations, randomize it
        this.x += this.p5.random(-JUMP, JUMP);
        this.y += this.p5.random(-JUMP, JUMP);
        // if off screen reset
        if (this.x > CANVAS_WIDTH || this.y > CANVAS_HEIGHT || this.x < 0 || this.y < 0) {
          this.x = this.p5.random(PADDING, CANVAS_WIDTH - PADDING)
          this.y = this.p5.random(PADDING, CANVAS_HEIGHT - PADDING)
        }
      } 
    }
  
    draw() {
      // draw a line between last position
      // and current position
      this.p5.strokeWeight(STROKE_WEIGHT / (isDesktop ? 1 : 2));
      // get stroke colour based off correct location or not
      let col = img.get(this.x, this.y)
      if (col.every(e => e === 255)) this.p5.stroke(BG_COLOR)
      else this.p5.stroke(TXT_COLOR);
      //if (p.imageOverlay) this.p5.stroke(255, 0, 0)
      this.p5.line(this.px, this.py, this.x, this.y);
    }
  }


let agents;
let sourceImage;
let img;

let body
let bodyComputedStyle
let isDesktop


const drawing = (p) => {
  p.setup = async () => {
    sourceImage = await p.loadImage('/p5/data/anthony.png');

    body = document.getElementById('body');
    bodyComputedStyle = window.getComputedStyle(body);
    isDesktop = window.matchMedia(`(min-width: ${xlBreakpoint})`).matches;
    CANVAS_WIDTH = p.min(p.windowWidth, p.windowHeight) * (isDesktop ? 0.75 : 1) - parseFloat(bodyComputedStyle.paddingLeft) - parseFloat(bodyComputedStyle.paddingRight)
    CANVAS_HEIGHT = p.min(p.windowWidth, p.windowHeight) * (isDesktop ? 0.75 : 1) - parseFloat(bodyComputedStyle.paddingTop) - parseFloat(bodyComputedStyle.paddingBottom)
    PADDING = CANVAS_WIDTH / 8
    p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

    sourceImage.resize(CANVAS_WIDTH, CANVAS_HEIGHT)
    img = sourceImage.get()
    img.filter(p.THRESHOLD, THRESH)
    // colors
    BG_COLOR = p.color(olive100)
    TXT_COLOR = p.color(gray950)

    createAgents(p);
  }

  p.draw = () => {
    agents.forEach(a => a.update());
    agents.forEach(a => a.draw());
  }

  p.windowResized = () => {
    CANVAS_WIDTH = p.min(p.windowWidth, p.windowHeight) * (isDesktop ? 0.75 : 1) - parseFloat(bodyComputedStyle.paddingLeft) - parseFloat(bodyComputedStyle.paddingRight)
    CANVAS_HEIGHT = p.min(p.windowWidth, p.windowHeight) * (isDesktop ? 0.75 : 1) - parseFloat(bodyComputedStyle.paddingTop) - parseFloat(bodyComputedStyle.paddingBottom)
    PADDING = CANVAS_WIDTH / 8
    console.log(`Resizing canvas to ${CANVAS_WIDTH}x${CANVAS_HEIGHT}`)
    p.resizeCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    sourceImage.resize(CANVAS_WIDTH, CANVAS_HEIGHT)
    img = sourceImage.get()
    img.filter(p.THRESHOLD, THRESH)
    createAgents(p);
  }
}
function createAgents(p) {
  p.background(BG_COLOR);

  agents = [];
  for (let i = 0; i < AGENT_NUM; i++) { agents.push(new Agent(p)) }
}

new p5(drawing, 'sketch-container');