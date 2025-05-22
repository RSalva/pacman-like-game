class Game {
  constructor(canvas) {
    this.canvas = canvas;

    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = boardWidth;
    this.canvas.height = boardHeight;
    this.canvas.style.background = "black";

    this.interval = null;

    this.scoreBoard = document.getElementById("score");
    this.livesBoard = document.getElementById("lives-container");
    this.score = 0;

    this.board = new Board(this.ctx);
    this.pacman = new Pacman(this.ctx, pacmanInitX, pacmanInitY, pacmanWidth, pacmanHeight, false, 3);
    this.ghosts = [];
    this.createGhosts(numberOfGhosts);
    this.startingCount = 1;
    //this.ghost = new Ghost(this.ctx, ghost1InitX, ghost1InitY, ghost1Width, ghost1Height);

    this.backgroundMusic = new Audio(backgroundMusicPath);
    this.backgroundMusic.volume = volume;
    this.backgroundMusic.loop = false;

    this.eatFoodSound = new Audio(eatFoodMusicPath);
    this.eatFoodSound.volume = volume;
    this.eatFoodSound.loop = false;

    this.deathSound = new Audio(dieMusicPath);
    this.deathSound.volume = volume;
    this.deathSound.loop = false;
  }

  start() {
    this.draw();
    this.backgroundMusic.play();
    setTimeout(() => {
      this.checkSomeGhostDead();
      this.checkLives();
      this.interval = setInterval(() => {
      this.clear();
     
      this.checkAllInsideBoard();
      this.move(this.board.tileSet);
      this.checksCollisions();
      this.checkScore();
      this.draw();

    }, 1000 / fps);
    }, 5000);
    
    
    document.addEventListener("keydown", this.onKeyDown.bind(this));
  }

  draw() {
    this.board.draw();
    this.pacman.draw();
    this.ghosts.forEach(ghost => ghost.draw());
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  onKeyDown(event) {
    this.pacman.onKeyDown(event, this.board.tileSet);
  }

  move() {
    this.pacman.move(this.board.tileSet);
    this.ghosts.forEach(ghost => ghost.move(this.board.tileSet, this.pacman));
  }

  checksCollisions() {
    this.checkPacmanWallsCollisions();
    this.checkPacmanEatsFood();
    this.checkPacmanCollidesWithGhosts();
  }

  checkPacmanWallsCollisions() {
    if (this.pacman.collidesWall(this.board.tileSet)) {
      this.pacman.vx = 0;
      this.pacman.vy = 0;
    };
  }

  checkPacmanEatsFood() {
    const newTileSet = this.board.tileSet.reduce((reducedTileset, currentTile) => {
      if (currentTile instanceof Wall || (currentTile instanceof Food && !this.pacman.eatsFood(currentTile))) {
        reducedTileset.push(currentTile);
      } else {
        // adds the value of the food eaten to the score
        this.eatFoodSound.play();
        this.score += currentTile.value;
        if (currentTile.powerup) {
          // CHANGE THINGS TO MAKE THE POWERUP STATE
          //startPowerState();
        }
      }
      return reducedTileset;
    }, []);

    this.board.tileSet = newTileSet;
  }

  checkPacmanCollidesWithGhosts() {
    this.ghosts.forEach(ghost => {
      if (this.pacman.collidesGhost(ghost)) {
        if (this.pacman.powered) {
          ghost.killed();
        } else if (!this.pacman.dead) {
          this.pacmanDies();
        }
      }
    });
  }

  pacmanDies() {
    console.log("Pacman Dead");
    this.pacman.isDead();
    this.checkLives();
    this.deathSound.play();
    const pacmanDies = setTimeout(() => {
      clearInterval(this.interval);
      this.start();
      this.tryAgain();
    }, 5000);
  }

  checkLives() {
    this.livesBoard.innerHTML = "";
    const livesText = document.createElement("span");
      livesText.classList.add("align-middle", "mr-2");
      livesText.innerText = "Lives:";
    this.livesBoard.appendChild(livesText);
    if (this.pacman.lives > 0) {
      for(let i = 0; i < this.pacman.lives; i++) {
        const liveImg = document.createElement("img");
          liveImg.src = "/assets/images/pacman_live.png";
          liveImg.alt = "pacman-live-img";
        this.livesBoard.appendChild(liveImg);
      }
    }

    /* const livesContainer = document.createElement("div");
    livesContainer.id = "lives-container";
    livesContainer.classList.add("d-flex", "mt-0", "justify-content-center", "alert", "alert-primary");
  const livesText = document.createElement("span");
    livesText.classList.add("align-middle", "mr-2");
    livesText.innerText = "Lives:";
  const liveImgOne = document.createElement("img");
    liveImgOne.src = "assets/images/pacman_live.png";
    liveImgOne.alt = "pacman-live-img";
  const liveImgTwo = document.createElement("img");
    liveImgTwo.src = liveImgOne.src;
    liveImgTwo.alt = liveImgOne.alt;
  const liveImgThree = document.createElement("img");
    liveImgThree.src = liveImgOne.src;
    liveImgThree.alt = liveImgOne.alt;
  livesContainer.appendChild(livesText);
  livesContainer.appendChild(liveImgOne);
  livesContainer.appendChild(liveImgTwo);
  livesContainer.appendChild(liveImgThree);*/
    
  }

  checkScore() {
    this.drawScore();
  }

  drawScore() {
    this.scoreBoard.innerText = this.score;
  }

  checkAllInsideBoard() {
    this.pacman.exitsBoard(this.board);
    this.ghosts.forEach(ghost => ghost.exitsBoard(this.board));
  }

  createGhosts(quantityOfGhosts) {
    for (let i = 0; i < quantityOfGhosts; i++) {
      //let randPosX = Math.floor(Math.random() * 3);
      this.ghosts.push(new Ghost(this.ctx, ghost1InitX + tileSize * [i], ghost1InitY, ghost1Width, ghost1Height, ghostsColors[i]));
    }
  }

  checkSomeGhostDead() {
    const chasingIntervalId = setInterval(() => {
      const waitingGhost = this.ghosts.find(ghost => ghost.behaviour === "waiting");
      if (waitingGhost) {
        waitingGhost.startMoving();
      } else {
        clearInterval(chasingIntervalId);
      }
    }, 5000);
  }

  tryAgain() {
    this.pacman.x = pacmanInitX;
    this.pacman.y = pacmanInitY;
  }
  
}