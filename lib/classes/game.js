class Game {
  constructor(canvas) {
    this.canvas = canvas;

    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = boardWidth;
    this.canvas.height = boardHeight;
    this.canvas.style.background = "black";

    this.interval = null;

    this.board = new Board(this.ctx);
    this.pacman = new Pacman(this.ctx, pacmanInitX, pacmanInitY, tileSize, tileSize);
  }

  start() {
    /*this.interval = setInterval(() => {
      this.clear();
      this.draw();

    }, 1000 / fps);*/
    this.clear();
    this.draw();
  }

  draw() {
    this.board.draw();
    this.pacman.draw();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}