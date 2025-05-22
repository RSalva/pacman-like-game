// board config
const tileSize = 26;
const rows = 28;
const columns = 31;
const boardWidth = rows * tileSize;
const boardHeight = columns * tileSize;
const gameMargin = 1;


// game config
const fps = 60;
const movementSpeed = 1;
const backgroundMusicPath = "/assets/sounds/music.mp3";
const eatFoodMusicPath = "/assets/sounds/eat_ball.mp3";
const dieMusicPath = "/assets/sounds/die.mp3";
const volume = 0.05;

// pacman config
const pacmanInitX = 14 * tileSize
const pacmanInitY = 23 * tileSize;
const pacmanWidth = tileSize;
const pacmanHeight = tileSize;

// ghosts config
const ghost1InitX = 12 * tileSize;
const ghost1InitY = 14 * tileSize;
const ghost1Width = tileSize;
const ghost1Height = tileSize;
const ghostsColors = ["Red", "Pink", "LightBlue", "Yellow"];
const numberOfGhosts = 4;

// liveBoard
const livesSrc = "assets/images/pacman_live.png";
const livesAlt = "pacman-live-img";