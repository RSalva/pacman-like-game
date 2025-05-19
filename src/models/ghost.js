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

    this.posibleDirections = [];
    this.currentMovement = "Right";

    this.movementFrame = 1;

  }

  draw() {
    this.ctx.save();
    this.ctx.fillStyle = this.ghostColor;
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
    this.ctx.restore();
  }

  move(tileSet, pacman) {
    this.posibleDirections = [];
    this.checkPossibleMovements(tileSet);
    this.cantGoBack();
    
    if (this.movementFrame > 25) {
      this.chooseNewDirection();
      this.movementFrame = 1;
    }
    this.movementFrame++;

    switch(this.currentMovement) {
      case "Right":
        this.vx = movementSpeed;
        this.vy = 0;
        break;
      case "Left":
        this.vx = - movementSpeed;
        this.vy = 0;
        break;
      case "Up":
        this.vx = 0;
        this.vy = - movementSpeed;
        break;
      case "Down":
        this.vx = 0;
        this.vy = movementSpeed;
        break;
      default:
        break;
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  chooseNewDirection() {
    const options = this.posibleDirections.length;
    this.currentMovement = this.posibleDirections[Math.floor(Math.random() * options)];
  }

  checkPossibleMovements(tileSet) {
    const allDirections = ["Right", "Left", "Up", "Down"];
    allDirections.forEach(dir => {
      if(!this.collidesWithWallsInDirection(tileSet, dir)) {
        this.posibleDirections.push(dir);
      }
    });
    //console.log(this.posibleDirections);
  }

  cantGoBack() {
    switch(this.currentMovement) {
      case "Right":
        this.posibleDirections = this.posibleDirections.reduce((newDirArr, dir) => {
          if (dir !== "Left") {
            newDirArr.push(dir);
          }
          return newDirArr;
        }, []);
        break;
      case "Left":
        this.posibleDirections = this.posibleDirections.reduce((newDirArr, dir) => {
          if (dir !== "Right") {
            newDirArr.push(dir);
          }
          return newDirArr;
        }, []);
        break;
      case "Up":
        this.posibleDirections = this.posibleDirections.reduce((newDirArr, dir) => {
          if (dir !== "Down") {
            newDirArr.push(dir);
          }
          return newDirArr;
        }, []);
        break;
      case "Down":
        this.posibleDirections = this.posibleDirections.reduce((newDirArr, dir) => {
          if (dir !== "Up") {
            newDirArr.push(dir);
          }
          return newDirArr;
        }, []);
        break;
      default:
        break;
    }
    // console.log(this.posibleDirections);
  }

  collidesWithWallsInDirection(tileSet, direction) {
    let dirX = 0;
    let dirY = 0;
    switch(direction) {
      case "Right":
        dirX = 1;
        break;
      case "Left":
        dirX = -1;
        break;
      case "Up":
        dirY = -1;
        break;
      case "Down":
        dirY = 1;
        break;
      default:
        break;
    }
    let collision = false;
    tileSet.forEach(tile => {
      if (tile instanceof Wall) {
        const colX = 
          tile.x < this.x + this.w + dirX &&
          tile.x + tile.w > this.x + dirX;
        const colY = 
          tile.y < this.y + this.h + dirY &&
          tile.y + tile.h > this.y + dirY;
        if (colX && colY) {
          collision = true;
        }
      } 
    });
    return collision;
  }


}