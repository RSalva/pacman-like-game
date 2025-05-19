class Game {
  constructor(canvas) {
    this.canvas = canvas;

    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = boardWidth;
    this.canvas.height = boardHeight;
    this.canvas.style.background = "black";

    this.interval = null;

    this.scoreboard = document.getElementById("score");
    this.score = 0;

    this.board = new Board(this.ctx);
    this.pacman = new Pacman(this.ctx, pacmanInitX, pacmanInitY, pacmanWidth, pacmanHeight);
    this.ghost = new Ghost(this.ctx, ghost1InitX, ghost1InitY, ghost1Width, ghost1Height); 
  }

  start() {
    this.interval = setInterval(() => {
      this.clear();
      this.checkAllInsideBoard();
      this.move(this.board.tileSet);
      this.checksCollisions();
      this.checkScore();
      this.draw();

    }, 1000 / fps);
    
    document.addEventListener("keydown", this.onKeyDown.bind(this));
  }

  draw() {
    this.board.draw();
    this.pacman.draw();
    this.ghost.draw();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  onKeyDown(event) {
    this.pacman.onKeyDown(event, this.board.tileSet);
  }

  move() {
    this.pacman.move(this.board.tileSet);
    this.ghost.move(this.board.tileSet, this.pacman);
  }

  checksCollisions() {
    this.checkPacmanWallsCollisions();
    this.checkPacmanEatsFood();
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
        this.score += currentTile.value;
      }
      return reducedTileset;
    }, []);

    this.board.tileSet = newTileSet;

  }

  checkScore() {
    this.drawScore();
  }

  drawScore() {
    this.scoreboard.innerText = this.score;
  }

  checkAllInsideBoard() {
    this.pacman.exitsBoard(this.board);
    this.ghost.exitsBoard(this.board);
  }
  
}