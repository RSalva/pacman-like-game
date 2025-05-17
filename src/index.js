window.onload = function() {
  const canvas = document.getElementById("canvas");

  const game = new Game(canvas);

  game.start();
}