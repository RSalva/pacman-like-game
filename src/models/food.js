class Food {
  constructor(ctx, x, y, w, h, powerup, value = 10) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.powerup = powerup;
    this.value = value;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x + this.w /2, this.y + this.h / 2, this.w/2, 0, 2 * Math.PI);
    this.ctx.stroke();
    const defaultFillStyle = this.ctx.fillStyle;
    this.ctx.fillStyle = "white";
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.fillStyle = defaultFillStyle;
  }
}