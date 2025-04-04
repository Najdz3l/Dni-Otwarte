const playerImage = document.querySelector("#player");

const playerSprites = [
  "./images/playerUp.png",
  "./images/playerRight.png",
  "./images/playerDown.png",
  "./images/playerLeft.png",
];

const playerMoveSpeed = 2;
let isPlayerMoving = false;
let clickedButtons = [];

const inputKeys = {
  ArrowUp: false,
  ArrowRight: false,
  ArrowDown: false,
  ArrowLeft: false,
};

const updatePlayerDirection = () => {
  let lastClickedButton = clickedButtons[clickedButtons.length - 1];
  let image = playerSprites[2];

  switch (lastClickedButton) {
    case "ArrowUp":
      image = playerSprites[0];
      break;
    case "ArrowRight":
      image = playerSprites[1];
      break;
    case "ArrowDown":
      image = playerSprites[2];
      break;
    case "ArrowLeft":
      image = playerSprites[3];
      break;
    default:
      break;
  }

  playerImage.style.backgroundImage = `url(${image})`;
};

const handlePlayerMovement = () => {
  if (inputKeys.ArrowUp) playerImage.style.top = `${playerImage.offsetTop - playerMoveSpeed}px`;
  if (inputKeys.ArrowRight) playerImage.style.left = `${playerImage.offsetLeft + playerMoveSpeed}px`;
  if (inputKeys.ArrowDown) playerImage.style.top = `${playerImage.offsetTop + playerMoveSpeed}px`;
  if (inputKeys.ArrowLeft) playerImage.style.left = `${playerImage.offsetLeft - playerMoveSpeed}px`;

  if (isPlayerMoving) {
    updatePlayerDirection();
  }
};

window.addEventListener("keydown", (event) => {
  if (clickedButtons.includes(event.key)) return;
  if (inputKeys.hasOwnProperty(event.key)) {
    inputKeys[event.key] = true;
    clickedButtons.push(event.key);
    isPlayerMoving = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (inputKeys.hasOwnProperty(event.key)) {
    inputKeys[event.key] = false;
    clickedButtons = clickedButtons.filter((key) => key !== event.key);
    if (clickedButtons.length === 0) {
      isPlayerMoving = false;
    }
  }
});

const gameLoop = () => {
  handlePlayerMovement();
  requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);
