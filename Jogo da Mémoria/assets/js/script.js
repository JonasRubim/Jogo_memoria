const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";

startGame();

function startGame() {
  initializeCards(game.createCardsFromTechs());
}
function initializeCards() {
  let gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";
  game.cards.forEach((card) => {
    let cardElement = document.createElement("div");
    cardElement.id = card.id;
    cardElement.classList.add(CARD);

    cardElement.dataset.icon = card.icon;
    createCardContent(card, cardElement);
    cardElement.addEventListener("click", flipCard);

    gameBoard.appendChild(cardElement);
  });
}

function createCardContent(card, cardElement) {
  createCardFace(FRONT, card, cardElement);
  createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {
  let cardElementFace = document.createElement("div");
  cardElementFace.classList.add(face);

  if (face === FRONT) {
    let iconElement = document.createElement("img");
    iconElement.src = "./assets/images/" + card.icon + ".png";
    cardElementFace.appendChild(iconElement);
  } else {
    cardElementFace.innerHTML = "&lt/&gt";
  }
  element.appendChild(cardElementFace);
}

function flipCard() {
  if (game.setCard(this.id)) {
    this.classList.add("flip");
    if (game.secondCard) {
      if (game.checkMath()) {
        game.clearCards();
        if (game.checKGameOver()) {
          let gameOver = document.getElementById("gameOver");
          gameOver.style.display = "flex";
          game.pararCron();
          congratulations();
        }
      } else {
        setTimeout(() => {
          let firstCardView = document.getElementById(game.firstCard.id);
          let secondCardView = document.getElementById(game.secondCard.id);
          firstCardView.classList.remove("flip");
          secondCardView.classList.remove("flip");
          game.unflipCards();
        }, 500);
      }
    }
  }
}

function congratulations() {
  let msg_gameOver = document.querySelector(".msg_gameOver");
  msg_gameOver.innerHTML = "Parabéns, você completou o Jogo!";
  let restart = document.getElementById("restart");
  restart.innerHTML = "Jogar Novamente";
}

function restart() {
  game.clearCards();
  startGame();
  game.restartCron();
  game.startCron();
  let gameOver = document.getElementById("gameOver");
  gameOver.style.display = "none";
}

function timer() {
  game.ss++;
  if (game.ss == 60) {
    game.ss = 0;
    game.mm++;
  }
  if (game.mm == 60) {
    game.mm = 0;
    game.hh++;
  }
  var format =
    (game.hh < 10 ? "0" + game.hh : game.hh) +
    ":" +
    (game.mm < 10 ? "0" + game.mm : game.mm) +
    ":" +
    (game.ss < 10 ? "0" + game.ss : game.ss);

  document.querySelector("span").innerHTML = format;
  document.querySelector(".time").style.display = "inline-block";
}
