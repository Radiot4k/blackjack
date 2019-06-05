'use strict';

(function () {
  var HOLD = 10;
  var TIME = 500;
  var deck = document.querySelector('.game__deck');
  var points = document.querySelectorAll('.game__points');
  var playerHand = document.querySelector('.game__players-hand');
  var dealerHand = document.querySelector('.game__dealers-hand');
  var pointsAlternate = 0;
  var betCircle = document.querySelector('.bet__circle');

  var calcPoints = function (person) {
    person.points = 0;
    pointsAlternate = 0;
    var point = 0;
    var pointA = 0;
    var sortedCards = person.cards.slice();

    for (var i = 0; i < sortedCards.length; i++) {
      if (sortedCards[i].rank === 'A') {
        var el = sortedCards.splice(i, 1);
        sortedCards.splice(sortedCards.length, 0, el[0]);
      }
    }

    for (i = 0; i < sortedCards.length; i++) {
      point = sortedCards[i].points;
      pointA = point;
      if (sortedCards[i].rank === 'A') {
        if (person.points + 11 > 21) {
          point = sortedCards[i].points[0];
        } else {
          point = sortedCards[i].points[1];
        }
        pointA = sortedCards[i].points[0];

      }
      person.points += point;
      pointsAlternate += pointA;
    }
  };

  var dealingCards = function (hand) { // Раздача карт
    var elemBefore;
    var childrenLength;
    if (hand.classList.contains('game__players-hand')) {
      elemBefore = points[1];
      childrenLength = hand.children.length - 1;
      window.util.player.cards.splice(window.util.player.cards.length, 0, window.util.gameDeck[0]);
      calcPoints(window.util.player);
      if (window.util.player.points !== pointsAlternate) {
        points[1].textContent = pointsAlternate + '/' + window.util.player.points;
      } else {
        points[1].textContent = window.util.player.points;
      }
    } else {
      elemBefore = points[0];
      childrenLength = hand.children.length;
      window.util.dealer.cards.splice(window.util.dealer.cards.length, 0, window.util.gameDeck[0]);
      calcPoints(window.util.dealer);
      if (hand.lastChild.classList.contains('card--open')) {
        points[0].textContent = window.util.dealer.points;
      } else {
        if (window.util.dealer.cards[0].rank === 'A') {
          points[0].textContent = window.util.dealer.cards[0].points[1];
        } else {
          points[0].textContent = window.util.dealer.cards[0].points;
        }
      }
    }

    window.util.gameDeck.splice(0, 1);
    var handRect = hand.getBoundingClientRect();
    var deckRect = deck.getBoundingClientRect();
    var card = document.createElement('div');
    for (var i = 0; i < 5; i++) {
      var span = document.createElement('span');
      card.appendChild(span);
    }
    card.className = 'card';
    var x = deckRect.left - handRect.left;
    var y = deckRect.bottom - handRect.bottom;
    card.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(-45deg)';
    elemBefore.before(card);
    hand.classList.value = hand.classList.item(0) + ' ' + hand.classList.item(0) + '--children-' + childrenLength;

    window.setTimeout(window.util.removeAttr, HOLD, card, 'style');
  };

  var openCard = function (hand, cardNumber) {
    var card = hand.querySelector('.card:nth-child(' + cardNumber + ')');
    var spans = card.querySelectorAll('span');
    card.classList.add('card--open');
    if (hand.classList.contains('game__players-hand')) {
      card.classList.add('card--' + window.util.player.cards[cardNumber - 1].suit);
      card.classList.add('card--' + window.util.player.cards[cardNumber - 1].rank);
    } else {
      card.classList.add('card--' + window.util.dealer.cards[cardNumber - 1].suit);
      card.classList.add('card--' + window.util.dealer.cards[cardNumber - 1].rank);
      window.setTimeout(window.util.setStyle, 240, card, 'zIndex', '1');
    }
    for (var i = 0; i < spans.length; i++) {
      spans[i].classList.add('span--show');
    }
  };

  var checkPlayersPoints = function () {
    if (window.util.player.points >= 9 && window.util.player.points <= 11) {
      // напоминаем о возможности удвоить ставку
      console.log('Remind: You can double bet');
    }
  };

  var checkSecondDealersCard = function () {
    if (window.util.dealer.points === 21) {
      // у дилера BlackJack
      // открываем вторую карту
      openCard(dealerHand, 2);
      // показываем сообщение о проигрыше
      console.log('dealer has BlackJack');
      // сбрасываем карты
    }
  };

  var checkFirstDealersCard = function () {
    if (window.util.dealer.cards[0].points === 10) {
      // диллер смотрит закрытую вторую карту
      var secondDealersCard = dealerHand.lastChild;
      var secondDealersCardTransform = secondDealersCard.style.transform;
      var x = secondDealersCardTransform.slice(secondDealersCardTransform.indexOf('translateX(') + 11, secondDealersCardTransform.indexOf('px)'));
      var y = 10;
      secondDealersCard.style.transform = 'translate(' + (parseInt(x, 10) + 10) + 'px, -' + y + 'px) rotateY(-180deg) rotate(-5deg)';
      window.setTimeout(window.util.setStyle, TIME * 2, secondDealersCard, 'transform', secondDealersCardTransform);
      // проверяем вторую карту
      window.setTimeout(checkSecondDealersCard, TIME * 2);
    } else if (window.util.dealer.cards[0].rank === 'A') {
      // диллер предлагает взять страховку
      console.log('take insurance?');
      // проверяем вторую карту
      window.setTimeout(checkSecondDealersCard, TIME * 2);
    } else {
      // показываем кнопки
      // вешаем на кнопки обработку click
      // проверяем, набрал ли игрок 9, 10 или 11 очков
      checkPlayersPoints();
    }
  };

  var dealing = function () {
    window.util.player.points = 0;
    window.util.dealer.points = 0;
    dealingCards(playerHand);
    window.setTimeout(openCard, TIME, playerHand, 1);
    window.setTimeout(dealingCards, TIME * 3, dealerHand);
    window.setTimeout(dealingCards, TIME * 5, playerHand);
    window.setTimeout(openCard, TIME * 6, playerHand, 2);
    window.setTimeout(dealingCards, TIME * 8, dealerHand);
    window.setTimeout(openCard, TIME * 10, dealerHand, 1);
    if (points[1].classList.contains('hide')) {
      window.setTimeout(window.util.removeClass, TIME * 7, points[1], 'hide');
      window.setTimeout(window.util.addClass, TIME * 7 + HOLD, points[1], 'opacity-1');
    }
    if (points[0].classList.contains('hide')) {
      window.setTimeout(window.util.removeClass, TIME * 11, points[0], 'hide');
      window.setTimeout(window.util.addClass, TIME * 11 + HOLD, points[0], 'opacity-1');
    }
    // проверка первой карты диллера
    window.setTimeout(checkFirstDealersCard, TIME * 12);
  };

  window.onDealClick = function () {
    var HAND_TIME = 2000;
    var gameHand = document.querySelector('.game__hand');
    gameHand.classList.remove('hide');
    window.setTimeout(window.util.addClass, HAND_TIME, gameHand, 'hide');
    var stack = document.querySelector('.player__stack');
    var deal = document.querySelector('#deal');
    var betCircle = document.querySelector('.bet__circle');
    stack.removeEventListener('click', window.onStackClick);
    stack.removeEventListener('touchstart', onStackTap);
    stack.removeEventListener('touchend', onStackTapEnd);
    betCircle.removeEventListener('click', window.onBetCircleClick);
    stack.removeEventListener('contextmenu', window.onStackContextClick);
    deal.classList.add('hide');
    window.setTimeout(dealing, HAND_TIME);
  };
})();
