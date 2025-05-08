class Pacman {
  constructor(ctx, x, y, w, h) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.lives = 3;

    this.vx = 0;
    this.vy = 0;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x + tileSize/2, this.y + tileSize/2, tileSize/2, 0, 2 * Math.PI);
    this.ctx.stroke();
    const defaultFillStyle = this.ctx.fillStyle;
    this.ctx.fillStyle = "yellow";
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.fillStyle = defaultFillStyle;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  onKeyDown(event) {
    switch(event.key) {
      case "ArrowDown":
        this.vy += 1;
        break;
      case "ArrowUp":
        this.vy -= 1;
        break;
      case "ArrowRight":
        this.vx += 1;
        break;
      case "ArrowLeft":
        this.vx -= 1;
        break;
    }
  }
}