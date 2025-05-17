class Ghost {
  constructor(ctx, x, y, w, h, ghostColor = "white") {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.vx = 0;
    this.vy = 0;

    this.behaviour = "waiting";
    this.home = true;

    this.ghostColor = ghostColor;

    this.forbiddenDirections = [];
    this.currentMovement = "Right";
  }

  draw() {
    this.ctx.save();
    this.ctx.fillStyle = this.ghostColor;
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
    this.ctx.restore();
  }

  banDirection(direction) {
    this.forbiddenDirections.push(direction);
  }

  clearForbiddenDirections() {
    this.forbiddenDirections = [];
  }

  checkIfCanMoveY() {
    
  }

  move(tileSet, pacman) {
    if (this.collidesWall(tileSet)) {
      this.checkIfCanMoveY();
    }
    switch (this.currentMovement) {
      case "Up":
        this.moveUp(tileSet);
        break;
      case "Down":
        this.moveDown(tileSet);
        break;
      case "Left":
        this.moveLeft(tileSet);
        break;
      case "Right":
        this.moveRight(tileSet);
        break;
      default:
        break;
    }
    this.x += this.vx;
    this.y += this.vy;
  }

  moveRight(tileSet) {
    this.vx = movementSpeed;
  }

  moveLeft(tileSet) {
    this.vx = - movementSpeed;
  }

  collidesWall(tileSet) {
    let collides = false;
    tileSet.forEach(tile => {
      if (tile !== undefined) {
        if (tile instanceof Wall) {
          // Checks if the next move (meanig actual x or y plus the vx or vy) is gonna collide
          // colX = tile left side <= pacman right side + vx & tile right side >= pacman left side + vx
          const colX = tile.x + gameMargin <= this.x + this.w + this.vx && tile.x + tile.w - gameMargin >= this.x + this.vx;
  
          // colY = tile bottom side >= pacman top side + vy & tile top side <= pacman bottom side + vy
          const colY = tile.y + tile.h - gameMargin >= this.y + this.vy && tile.y + gameMargin <= this.y + this.h + this.vy;
  
          if(colX && colY) {
            collides = true;
            this.banDirection(this.currentMovement);
          }
        }
      }
      
    });
    return collides;
  }

}