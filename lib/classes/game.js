class Game {
  constructor(canvas) {
    this.canvas = canvas;

    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = boardWidth;
    this.canvas.height = boardHeight;
    this.canvas.style.background = "black";

    this.interval = null;

    this.board = new Board(this.ctx);
    this.pacman = new Pacman(this.ctx, pacmanInitX, pacmanInitY, pacmanWidth, pacmanHeight);
  }

  start() {
    this.interval = setInterval(() => {
      this.clear();
      this.draw();
      this.move(this.board.tileSet);
      this.checksCollisions();
      this.checkPacmanInsideBoard();

    }, 1000 / fps);
    
    document.addEventListener("keydown", this.onKeyDown.bind(this));
  }

  draw() {
    this.board.draw();
    this.pacman.draw();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  onKeyDown(event) {
    this.pacman.onKeyDown(event, this.board.tileSet);
  }

  move() {
    this.pacman.move(this.board.tileSet);
  }

  checksCollisions() {
    this.checkPacmanCollisions();
  }

  checkPacmanCollisions() {
    if(this.pacman.collidesWall(this.board.tileSet)){
      this.pacman.vx = 0;
      this.pacman.vy = 0;
    };
  }

  checkPacmanInsideBoard() {
    this.pacman.exitsBoard(this.board);
  }
  
}