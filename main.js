const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const knightAnim = new SpriteAnimation({
  src: 'assets/knight/basicknight/basicknightforwardslash.png',
  frameWidth: 32,
  frameHeight: 32,
  frameCount: 6,
  frameSpeed: 91, // for 11 fps
  x: 100,
  y: 100
});

function mainLoop(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  knightAnim.draw(ctx, timestamp);
  requestAnimationFrame(mainLoop);
}

knightAnim.img.onload = function() {
  requestAnimationFrame(mainLoop);
};
