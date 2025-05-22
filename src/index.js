window.onload = function() {
  //mainScreen();
  homeScreen();

  //game.start();
}

function homeScreen() {
  const mainContainer = document.getElementById("main-container");

  const homeScreen = document.createElement("div");
    homeScreen.classList.add("d-flex", "align-self-center", "justify-content-center", "alert", "alert-secondary", "mt-5", "h-100");
    homeScreen.id = "home-screen";
  const startButton = document.createElement("button");
    startButton.type = "button";
    startButton.classList.add("btn", "btn-primary", "btn-lg", "align-self-center");
    startButton.id = "start-button";
    startButton.innerText = "Press this button or spacebar to start";
    startButton.addEventListener("click", event => mainScreen());
    document.addEventListener("keydown", event => {
      if (event.key === " ") {
        mainScreen();
      }
      //console.log(event);
    });

    homeScreen.appendChild(startButton);
    mainContainer.appendChild(homeScreen);

  /*<div id="home-screen" class="d-flex align-self-center justify-content-center alert alert-secondary mt-5 h-100">
      <button type="button" class="btn btn-primary btn-lg align-self-center" id="start-button">Press this button or spacebar to start</button>
    </div>*/
}

function clearScreen() {
  document.getElementById("main-container").innerHTML = "";
}

function mainScreen() {
  clearScreen();
  const mainContainer = document.getElementById("main-container");
  
  const topContainer = document.createElement("div");
    topContainer.id = "top-container";
    topContainer.classList.add("d-flex", "mb-0", "justify-content-center", "justify-self-center", "alert", "alert-primary");
  const scoreText = document.createElement("span");
    scoreText.id = "score-text";
    scoreText.classList.add("mr-2");
    scoreText.innerText = "Score:";
  const score = document.createElement("span");
    score.id = "score";
    score.innerText = 0;
  topContainer.appendChild(scoreText);
  topContainer.appendChild(score);

  const canvasContainer = document.createElement("div");
    canvasContainer.id = "canvas-container";
    canvasContainer.classList.add("d-flex", "justify-content-center");
  const canvas = document.createElement("canvas");
    canvas.id = "canvas";
    canvas.classList.add("align-self-center");
  canvasContainer.appendChild(canvas);

  const livesContainer = document.createElement("div");
    livesContainer.id = "lives-container";
    livesContainer.classList.add("d-flex", "mt-0", "justify-content-center", "alert", "alert-primary");
  const livesText = document.createElement("span");
    livesText.classList.add("align-middle", "mr-2");
    livesText.innerText = "Lives:";
  const liveImgOne = document.createElement("img");
    liveImgOne.src = "../assets/images/pacman_live.png";
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
  livesContainer.appendChild(liveImgThree);

  mainContainer.appendChild(topContainer);
  mainContainer.appendChild(canvasContainer);
  mainContainer.appendChild(livesContainer);


  const game = new Game(canvas);

  game.start();
}

function gameOverScreen() {

}

/*

<div id="main-container" class="container py-2">
    <div id="top-container" class="d-flex gap-2 mb-2 justify-content-center alert alert-primary">
      <div id="score-container" class="d-flex gap-2 mb-2">
        <span id="score-text" class="mr-2">Score:</span>
        <span id="score" class="">0</span>
      </div>
    </div>
    <div id="canvas-container" class="d-flex justify-content-center">
      <canvas id="canvas" class="align-self-center"></canvas>
    </div>
    <div id="lives-container" class="d-flex mt-2 justify-content-center alert alert-primary">
      <span class="align-middle mr-2">Lives: </span>
      <img src="assets/images/pacman_live.png" alt="pacman-live-img">
      <img src="assets/images/pacman_live.png" alt="pacman-live-img">
      <img src="assets/images/pacman_live.png" alt="pacman-live-img">
    </div>
    */