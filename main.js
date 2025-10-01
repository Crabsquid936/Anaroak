const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const basicknightforwardslash = new SpriteAnimation({
  src: 'assets/knight/basicknight/basicknightforwardslash.png',
  frameWidth: 64,
  frameHeight: 64,
  frameCount: 5,
  frameSpeed: 91,
  x: 0,
  y: 0
});


function mainLoop(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  basicknightforwardslash.draw(ctx, timestamp);
    requestAnimationFrame(mainLoop);
}

basicknightforwardslash.img.onload = function() {
  requestAnimationFrame(mainLoop);
};
