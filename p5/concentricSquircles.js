class Point { constructor(x, y) { this.x = x; this.y = y } }
class Agent {
  constructor(points, p) {
    this.p = p
    this.points = points
    this.widths = points.map(_ => this.p.random(0.5,4))
  }

  update() {
    this.points.forEach(pt => { pt.x += this.p.randomGaussian(0, 0.12); pt.y += this.p.randomGaussian(0, 0.12) } )
  }

  draw() {
    this.p.noFill()
    this.p.stroke(TXT_COLOR)
    this.p.beginShape()
    this.points.forEach((pt, idx) => {
      this.p.strokeWeight(this.widths[idx] ?? 1)
      this.p.splineVertex(pt.x, pt.y)
    })
    this.p.endShape(this.p.CLOSE)
    this.p.push()
    this.p.fill(TXT_COLOR)
    this.points.forEach(pt => this.p.circle(pt.x, pt.y, 10))
    this.p.pop()
  }
}

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

const QUADRANTS = [[1,1],[1,-1],[-1,-1],[-1,1]]
const FACTORS = [9,6,5,4.5,3.75]
let agents;

const concentricSquircles = (p) => {
  p.setup = () => {
    // canvas stuff
    const body = document.getElementById('body');
    const bodyComputedStyle = window.getComputedStyle(body);
    const isDesktop = window.matchMedia(`(min-width: ${xlBreakpoint})`).matches;
    p.createCanvas(
      p.min(p.windowWidth, p.windowHeight) * (isDesktop ? 0.75 : 1) - parseFloat(bodyComputedStyle.paddingLeft) - parseFloat(bodyComputedStyle.paddingRight), 
      p.min(p.windowWidth, p.windowHeight) * (isDesktop ? 0.75 : 1) - parseFloat(bodyComputedStyle.paddingTop) - parseFloat(bodyComputedStyle.paddingBottom)
    )
    // colors
    BG_COLOR = p.color(olive100)
    TXT_COLOR = p.color(gray950)
    // agents and drawing
    p.translate(p.width/2, p.height/2)
    agents = []
    FACTORS.forEach(e => {
      agents.push(new Agent(QUADRANTS.map(([x, y]) => new Point(x * p.random(p.width/e, p.width/(e-1)), y * p.random(p.height/e, p.height/(e-1)))), p))
    })
    
  }

  p.draw = () => {
    p.translate(p.width/2, p.height/2)
    p.background(BG_COLOR);
    agents.forEach(a => a.update())
    agents.forEach(a => a.draw())
  }

  p.windowResized = () => {
    p.setup()
  };
}

new p5(concentricSquircles, 'sketch-container');