'use strict';

var calcPoints = function (person) {
  var points = 0;
  for (var i = 0; i < person.cards.length; i++) {
    var card = person.cards[i].slice(-1);
    points = parseInt(card, 10);
    if (card === 'K' || card === 'Q' || card === 'J' || card === "0") {
      points = 10;
    }
    if (card === 'A') {
      if (person.cards.length > 2) {
        points = 1;
      } else {
        points = 11;
      }
    }
  }
  person.points += points;
};

var cardToPlayer = function () {
  var firstCard = document.querySelector('.player-card1');
  var secondCard = document.querySelector('.player-card2');
  firstCard.textContent = player.cards[0];
  secondCard.textContent = player.cards[1];
  calcPoints(player);
  playerPoints.textContent = player.points;
}

var cardToDealer = function () {
  var firstCard = document.querySelector('.dealer-card1');
  var secondCard = document.querySelector('.dealer-card2');
  firstCard.textContent = dealer.cards[0];
  secondCard.textContent = dealer.cards[1];
  calcPoints(dealer);
  dealerPoints.textContent = dealer.points;
}

var dealing = function () {
  dealer.points  = 0;
  player.points = 0;
  for (var i = 0; i < 4; i++) {
    var card = getTheCard();
    if (i === 0 || i === 2) {
      player.cards.push(card);
      cardToPlayer();
    } else {
      dealer.cards.push(card);
      cardToDealer();
    }
  }
  surrender.addEventListener('click', function () {

  });
  hit.addEventListener('click', function () {
    card = getTheCard();
    player.cards.push(card);
    cardToPlayer();
  });
};

var onDealClick = function () {
  stack.removeEventListener('click', onStackClick);
  deal.classList.add('hide');
};

var getTheCard = function () {
  var pos = getRandomNumber(0, gameDeck.length - 1);
  var card = gameDeck[pos];
  gameDeck.splice(pos, 1);
  return card;
};
