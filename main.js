class SpriteAnimation {
  constructor(options) {
    this.img = new Image();
    this.img.src = options.src;
    this.frameWidth = options.frameWidth;
    this.frameHeight = options.frameHeight;
    this.frameCount = options.frameCount;
    this.frameSpeed = options.frameSpeed;
    this.columns = options.columns;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.onLoad = options.onLoad;

    this.currentFrame = 0;
    this.lastFrameTime = null;
    this.isLoaded = false;

    this.img.addEventListener('load', () => {
      this.isLoaded = true;
      if (!this.columns) {
        this.columns = Math.max(1, Math.floor(this.img.width / this.frameWidth));
      }
      if (typeof this.onLoad === 'function') this.onLoad();
    });

    this.img.addEventListener('error', () => {
      console.error('Failed to load image:', this.img.src);
    });
  }

  update(timestamp) {
    if (!this.isLoaded) return;
    if (this.lastFrameTime === null) {
      this.lastFrameTime = timestamp;
      return;
    }
    if (timestamp - this.lastFrameTime > this.frameSpeed) {
      this.currentFrame = (this.currentFrame + 1) % this.frameCount;
      this.lastFrameTime = timestamp;
    }
  }

  draw(ctx) {
    if (!this.isLoaded) return;

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
if (!canvas) throw new Error('Missing #gameCanvas element');
const ctx = canvas.getContext('2d');
if (!ctx) throw new Error('Could not get 2D context from #gameCanvas');
ctx.imageSmoothingEnabled = false;

const knightAnim = new SpriteAnimation({
  src: 'assets/knight/basicknight/basicknightforwardslash.png',
  frameWidth: 32,
  frameHeight: 32,
  frameCount: 6,
  frameSpeed: 91, // for ~11 fps
  columns: 2, // or omit to auto-calc from image width
  x: 100,
  y: 100,
  onLoad: () => requestAnimationFrame(mainLoop)
});

function mainLoop(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  knightAnim.update(timestamp);
  knightAnim.draw(ctx);
  requestAnimationFrame(mainLoop);
}

// No additional onload override needed; onLoad option starts the loop.
