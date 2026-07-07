import p5 from "p5";

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

function create_tree(p, xpos, ypos, sign) {
  if (xpos < p.width && ypos < p.height && xpos > 0 && ypos > 0) {
    p.stroke(TXT_COLOR);
    let xrandom = p.random(-20, 20);
    xrandom *= sign;
    let xsign = Math.sign(xrandom);
    let xdiff = xrandom + 10 * xsign;
    let yrandom = p.random(-15, 20);
    yrandom *= sign;
    let ysign = Math.sign(yrandom);
    let ydiff = yrandom + 10 * ysign;
    // line go brr
    p.line(xpos, ypos, xpos + xdiff, ypos + ydiff);
    create_tree(p, xpos + xdiff, ypos + ydiff, sign);
  }
}

const fourCtLines = (p) => {
    p.setup = () => {
        BG_COLOR = p.color(olive100)
        TXT_COLOR = p.color(gray950)

        const body = document.getElementById('body');
        const bodyComputedStyle = window.getComputedStyle(body);
        const isDesktop = window.matchMedia(`(min-width: ${xlBreakpoint})`).matches;
        p.createCanvas(
            p.min(p.windowWidth, p.windowHeight) * (isDesktop ? 0.75 : 1) - parseFloat(bodyComputedStyle.paddingLeft) - parseFloat(bodyComputedStyle.paddingRight), 
            p.min(p.windowWidth, p.windowHeight) * (isDesktop ? 0.75 : 1) - parseFloat(bodyComputedStyle.paddingTop) - parseFloat(bodyComputedStyle.paddingBottom)
        )
        p.background(BG_COLOR)

        create_tree(p, p.random(p.width/3, 2*p.width/3), p.random(p.height/3, 2*p.height/3), 1);
        create_tree(p, p.random(p.width/3, 2*p.width/3), p.random(p.height/3, 2*p.height/3), -1);
        create_tree(p, p.random(p.width/3, 2*p.width/3), p.random(p.height/3, 2*p.height/3), 0.5);
        create_tree(p, p.random(p.width/3, 2*p.width/3), p.random(p.height/3, 2*p.height/3), -0.5);
    }

    p.draw = () => {}

    p.mousePressed = () => {
        if (p.mouseX < p.width && p.mouseY < p.height && p.mouseX > 0 && p.mouseY > 0) {
            console.log(`Mouse pressed at ${p.mouseX}, ${p.mouseY}`)
            p.background(BG_COLOR)
            create_tree(p, p.mouseX, p.mouseY, 1);
            create_tree(p, p.mouseX, p.mouseY, -1);
            create_tree(p, p.mouseX, p.mouseY, 0.5);
            create_tree(p, p.mouseX, p.mouseY, -0.5);
        }
    }

    p.windowResized = () => {
        const body = document.getElementById('body');
        const bodyComputedStyle = window.getComputedStyle(body);
        const isDesktop = window.matchMedia(`(min-width: ${xlBreakpoint})`).matches;
        p.resizeCanvas(
            p.min(p.windowWidth, p.windowHeight) * (isDesktop ? 0.75 : 1) - parseFloat(bodyComputedStyle.paddingLeft) - parseFloat(bodyComputedStyle.paddingRight), 
            p.min(p.windowWidth, p.windowHeight) * (isDesktop ? 0.75 : 1) - parseFloat(bodyComputedStyle.paddingTop) - parseFloat(bodyComputedStyle.paddingBottom)
        )
        p.background(BG_COLOR)

        create_tree(p, p.random(p.width/3, 2*p.width/3), p.random(p.height/3, 2*p.height/3), 1);
        create_tree(p, p.random(p.width/3, 2*p.width/3), p.random(p.height/3, 2*p.height/3), -1);
        create_tree(p, p.random(p.width/3, 2*p.width/3), p.random(p.height/3, 2*p.height/3), 0.5);
        create_tree(p, p.random(p.width/3, 2*p.width/3), p.random(p.height/3, 2*p.height/3), -0.5);
    }
}
new p5(fourCtLines, 'sketch-container');