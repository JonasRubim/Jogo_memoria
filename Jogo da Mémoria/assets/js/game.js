let game = {
  lockMode: false,
  firstCard: null,
  secondCard: null,
  hh: 0,
  mm: 0,
  ss: 0,
  cron: null,

  startCron: function () {
    this.cron = setInterval(() => {
      timer();
    }, 1000);
  },

  pararCron: function () {
    clearInterval(this.cron);
  },

  restartCron: function () {
    clearInterval(this.cron);
    this.hh = 0;
    this.mm = 0;
    this.ss = 0;
  },

  techs: [
    "bootstrap",
    "css",
    "html",
    "react",
    "electron",
    "javascript",
    "mongo",
    "firebase",
    "node",
    "jquery",
  ],

  setCard: function (id) {
    let card = this.cards.filter((card) => card.id === id)[0];
    if (card.flipped || this.lockMode) {
      return false;
    }

    if (!this.firstCard) {
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    } else {
      this.secondCard = card;
      this.secondCard.flipped = true;
      this.lockMode = true;
      return true;
    }
  },

  checkMath: function () {
    if (!this.firstCard || !this.secondCard) {
      return false;
    }
    return this.firstCard.icon === this.secondCard.icon;
  },

  clearCards: function () {
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },
  unflipCards: function () {
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  },

  checKGameOver: function () {
    return this.cards.filter((card) => !card.flipped).length == 0;
  },

  cards: null,

  shufflerCards: function () {
    let currentIndex = this.cards.length;

    let randowIndex = 0;
    while (currentIndex !== 0) {
      randowIndex = Math.floor(Math.random() * currentIndex);

      currentIndex--;
      [this.cards[currentIndex], this.cards[randowIndex]] = [
        this.cards[randowIndex],
        this.cards[currentIndex],
      ];
    }
  },

  createCardsFromTechs: function () {
    this.cards = [];

    this.techs.forEach((tech) => {
      this.cards.push(this.createPairFromTech(tech));
    });
    this.cards = this.cards.flatMap((pars) => pars);
    this.shufflerCards();
    return this.cards;
  },

  createPairFromTech: function (tech) {
    return [
      {
        id: this.createIdWithTech(tech),
        icon: tech,
        flipped: false,
      },
      {
        id: this.createIdWithTech(tech),
        icon: tech,
        flipped: false,
      },
    ];
  },
  createIdWithTech: function (tech) {
    return tech + parseInt(Math.random() * 1000);
  },
};
