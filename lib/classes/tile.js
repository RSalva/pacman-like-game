class Tile {
  constructor (ctx, x, y, w, h) {
    //console.log(ctx);
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw () {
    //console.log("Drawing tile!");
    //console.log(this.ctx);
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}