const n = 7;

const addImgs = () => {
    const div = document.getElementById('imgs')
    console.log(document.getElementById('imgs'))

    const i = Math.floor(Math.random() * n)
    div.innerHTML += `<img src="imgs/${i}.png" alt="" width="400"/>`
}
addImgs()

/*
// generate your own.
let img;
let output;

async function setup() {
  createCanvas(400, 400);
  colorMode(HSB)
  
  detect()
}

function draw() {
  background(220);
  if (img) image(img, 0, 0)
  
  if (output) {
    for (let o of output) {
      //console.log(o)
      rectMode(CORNERS)
      noFill()
      strokeWeight(4)
      let c = map(o.score, 0.2, 1, 0, 100)
      stroke(c, 100, 100)
      rect(o.box.xmin, o.box.ymin, o.box.xmax, o.box.ymax, 8)

      rectMode(CORNER)
      noStroke()
      fill(c, 100, 100)
      rect(o.box.xmin, o.box.ymax - 10, textWidth(o.label) + 5, 12)
      fill("black")
      text(o.label, o.box.xmin, o.box.ymax)
    }
  }
}

async function detect() {
  console.log('detecting...')
  output = []
  let { pipeline } = await import("https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.3");
  
  const i = "https://picsum.photos/400/400";
  img = await loadImage(i)
  image(img, 0 , 0)
  
  const detector = await pipeline("object-detection", "Xenova/yolos-small");
  output = await detector(i, { threshold: 0.2 });
  console.log(output);
  console.log('...detected!')
  
  if (!output[0]) detect();
}

function keyPressed() {
  if (key === " ") detect()
}
*/