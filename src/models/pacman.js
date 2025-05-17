class Pacman {
  constructor(ctx, x, y, w, h, lives = 3) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.lives = lives;

    this.vx = 0;
    this.vy = 0;

    this.powered = false;

    this.lastKeyPressed = "ArrowRight";
  }

  draw() {
    // Pacman as a circle
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.x + this.w / 2, this.y + this.h / 2, this.w / 2, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fillStyle = "yellow";
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();    

    // Pacman as a rectangle
    /*
    const defaultFillStyle = this.ctx.fillStyle;
    this.ctx.fillStyle = "yellow";
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
    this.ctx.fillStyle = defaultFillStyle;
    */
  }

  move(tileSet) {
    switch (this.lastKeyPressed) {
      case "ArrowRight":
        this.moveRight(tileSet);
        break;
      case "ArrowLeft":
        this.moveLeft(tileSet);
        break;
      case "ArrowUp":
        this.moveUp(tileSet);
        break;
      case "ArrowDown":
        this.moveDown(tileSet);
        break;
    }
    this.x += this.vx;
    this.y += this.vy;
  }

  onKeyDown(event) {
    this.lastKeyPressed = event.key;
  }

  moveLeft(tileSet) {
    this.vx = - movementSpeed;
    if (this.collidesWall(tileSet)) {
        this.vx = 0;
    }
  }

  moveRight(tileSet) {
    this.vx = movementSpeed;
    if (this.collidesWall(tileSet)) {
        this.vx = 0;
    }
  }

  moveUp(tileSet) {
    this.vy = - movementSpeed;
    if (this.collidesWall(tileSet)) {
      this.vy = 0;
    }
  }

  moveDown(tileSet) {
    this.vy = movementSpeed;
    if (this.collidesWall(tileSet)) {
      this.vy = 0;
    }
  }

  exitsBoard(board) {
    if (this.x >= board.w){
      //console.log("Exited from the right");
      this.x = 0 - this.w;
    } else if (this.x + this.w <= 0) {
      //console.log("Exited from the left");
      this.x = board.w;
    }
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
            //debugger;
            //console.log("Colliding");
          }
        }
      }
      
    });
    return collides;
  }

  eatsFood(food) {
    // colX = tile left side <= pacman center & tile right side >= pacman center
    const colX = food.x <= this.x + this.w / 2 && food.x + food.w >= this.x + this.w / 2;

    // colY = tile bottom side >= pacman center & tile top side <= pacman center
    const colY = food.y + food.h >= this.y + this.h / 2 && food.y <= this.y + this.h / 2;

    if(colX && colY) {
      if (food.powerup) {
        this.powered = true;
      }
      return true;
    }
  }

  /*
  eatsFood(tileSet, score) {
    tileSet.forEach(tile => {
      if (tile instanceof Food) {
        // colX = tile left side <= pacman center & tile right side >= pacman center
        const colX = tile.x <= this.x + this.w / 2 && tile.x + tile.w >= this.x + this.w / 2;
        
        // colY = tile bottom side >= pacman center & tile top side <= pacman center
        const colY = tile.y + tile.h >= this.y + this.h / 2 && tile.y <= this.y + this.h / 2;
        if(colX && colY) {
          tile.eaten = true;
          if (tile.powerup) {
            this.powered = true;
            //score += 1000;
          } else {
            //score += 100;
          }
          //console.log(`Score from pacman: ${score}`);
        }
      }
    });
  }
    */
}