class SpriteAnimation {
  constructor(options) {
    this.img = new Image();
    this.img.src = options.src;
    this.frameWidth = options.frameWidth;
    this.frameHeight = options.frameHeight;
    this.frameCount = options.frameCount;
    this.frameSpeed = options.frameSpeed;
    this.columns = options.columns;
    this.x = options.x;
    this.y = options.y;

    this.currentFrame = 0;
    this.lastFrameTime = 0;
    this.isLoaded = false;

    this.img.onload = () => {
      this.isLoaded = true;
    };
    this.img.onerror = () => {
      console.error('Failed to load image:', this.img.src);
    };
  }

  update(timestamp) {
    if (this.isLoaded && timestamp - this.lastFrameTime > this.frameSpeed) {
      this.currentFrame = (this.currentFrame + 1) % this.frameCount;
      this.lastFrameTime = timestamp;
    }
  }

  draw(ctx) {
    if (!this.isLoaded) {
      return;
    }

    const row = Math.floor(this.currentFrame / this.columns);
    const col = this.currentFrame % this.columns;
    const sourceX = col * this.frameWidth;
    const sourceY = row * this.frameHeight;

    ctx.drawImage(
      this.img,
      sourceX,
      sourceY,
      this.frameWidth,
      this.frameHeight,
      this.x,
      this.y,
      this.frameWidth,
      this.frameHeight
    );
  }
}



const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const knightAnim = new SpriteAnimation({
  src: 'assets/knight/basicknight/basicknightforwardslash.png',
  frameWidth: 32,
  frameHeight: 32,
  frameCount: 6,
  frameSpeed: 91, // for 11 fps
  columns: 2,
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
