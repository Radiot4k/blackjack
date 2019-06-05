'use strict';

(function () {
  window.shuffleCards = function () {
    var HOLD = 10;
    var TIME = 20;
    var TIME2 = 800;
    var TIME3 = 200;

    var compareRandom = function (a, b) {
      return Math.random() - Math.random();
      //return Math.random() > 0.5 ? 1 : -1;
    };

    var deck = document.querySelector('.game__deck');
    var cards = deck.querySelectorAll('.card');
    var modalText = document.querySelector('.modal-text');

    modalText.textContent = 'Shuffling cards...';
    modalText.classList.remove('hide');
    window.setTimeout(window.util.addClass, HOLD, modalText, 'opacity-1');
    window.setTimeout(window.util.removeClass, 3600, modalText, 'opacity-1');
    window.setTimeout(window.util.addClass, 4000, modalText, 'hide');

    for (var i = 0; i < cards.length; i++) {
      // cards[i].style.willChange = 'transform';
      // cards[i].addEventListener('animationEnd', function () {
      //   cards[i].style.willChange = 'auto';
      // });
      cards[i].classList.add('card--shuffle');
      window.setTimeout(window.util.removeClass, 4000, cards[i], 'card--shuffle');
    }
    for (var i = 0; i < 5; i++) {
      window.setTimeout(window.util.toggleClass, 1200 + i * 400, cards[2], 'z-index');
    }
    window.setTimeout(window.util.removeClass, 4000, cards[2], 'z-index');

    window.util.gameDeck.sort(compareRandom);
    window.util.gameDeck.splice(-window.util.gameDeck.length / 4, 0, 'yellow');
  };

  window.newDeck = function (numberOfDecks) {
    var CardDeck = [
      {
        'suit': 'spades',
        'rank': '2',
        'points': 2
      },
      {
        'suit': 'spades',
        'rank': '3',
        'points': 3
      },
      {
        'suit': 'spades',
        'rank': '4',
        'points': 4
      },
      {
        'suit': 'spades',
        'rank': '5',
        'points': 5
      },
      {
        'suit': 'spades',
        'rank': '6',
        'points': 6
      },
      {
        'suit': 'spades',
        'rank': '7',
        'points': 7
      },
      {
        'suit': 'spades',
        'rank': '8',
        'points': 8
      },
      {
        'suit': 'spades',
        'rank': '9',
        'points': 9
      },
      {
        'suit': 'spades',
        'rank': '10',
        'points': 10
      },
      {
        'suit': 'spades',
        'rank': 'J',
        'points': 10
      },
      {
        'suit': 'spades',
        'rank': 'Q',
        'points': 10
      },
      {
        'suit': 'spades',
        'rank': 'K',
        'points': 10
      },
      {
        'suit': 'spades',
        'rank': 'A',
        'points': [1, 11]
      },
      {
        'suit': 'hearts',
        'rank': '2',
        'points': 2
      },
      {
        'suit': 'hearts',
        'rank': '3',
        'points': 3
      },
      {
        'suit': 'hearts',
        'rank': '4',
        'points': 4
      },
      {
        'suit': 'hearts',
        'rank': '5',
        'points': 5
      },
      {
        'suit': 'hearts',
        'rank': '6',
        'points': 6
      },
      {
        'suit': 'hearts',
        'rank': '7',
        'points': 7
      },
      {
        'suit': 'hearts',
        'rank': '8',
        'points': 8
      },
      {
        'suit': 'hearts',
        'rank': '9',
        'points': 9
      },
      {
        'suit': 'hearts',
        'rank': '10',
        'points': 10
      },
      {
        'suit': 'hearts',
        'rank': 'J',
        'points': 10
      },
      {
        'suit': 'hearts',
        'rank': 'Q',
        'points': 10
      },
      {
        'suit': 'hearts',
        'rank': 'K',
        'points': 10
      },
      {
        'suit': 'hearts',
        'rank': 'A',
        'points': [1, 11]
      },
      {
        'suit': 'clubs',
        'rank': '2',
        'points': 2
      },
      {
        'suit': 'clubs',
        'rank': '3',
        'points': 3
      },
      {
        'suit': 'clubs',
        'rank': '4',
        'points': 4
      },
      {
        'suit': 'clubs',
        'rank': '5',
        'points': 5
      },
      {
        'suit': 'clubs',
        'rank': '6',
        'points': 6
      },
      {
        'suit': 'hearts',
        'rank': '7',
        'points': 7
      },
      {
        'suit': 'clubs',
        'rank': '8',
        'points': 8
      },
      {
        'suit': 'clubs',
        'rank': '9',
        'points': 9
      },
      {
        'suit': 'clubs',
        'rank': '10',
        'points': 10
      },
      {
        'suit': 'clubs',
        'rank': 'J',
        'points': 10
      },
      {
        'suit': 'clubs',
        'rank': 'Q',
        'points': 10
      },
      {
        'suit': 'clubs',
        'rank': 'K',
        'points': 10
      },
      {
        'suit': 'clubs',
        'rank': 'A',
        'points': [1, 11]
      },
      {
        'suit': 'diamonds',
        'rank': '2',
        'points': 2
      },
      {
        'suit': 'diamonds',
        'rank': '3',
        'points': 3
      },
      {
        'suit': 'diamonds',
        'rank': '4',
        'points': 4
      },
      {
        'suit': 'diamonds',
        'rank': '5',
        'points': 5
      },
      {
        'suit': 'diamonds',
        'rank': '6',
        'points': 6
      },
      {
        'suit': 'diamonds',
        'rank': '7',
        'points': 7
      },
      {
        'suit': 'diamonds',
        'rank': '8',
        'points': 8
      },
      {
        'suit': 'diamonds',
        'rank': '9',
        'points': 9
      },
      {
        'suit': 'diamonds',
        'rank': '10',
        'points': 10
      },
      {
        'suit': 'diamonds',
        'rank': 'J',
        'points': 10
      },
      {
        'suit': 'diamonds',
        'rank': 'Q',
        'points': 10
      },
      {
        'suit': 'diamonds',
        'rank': 'K',
        'points': 10
      },
      {
        'suit': 'diamonds',
        'rank': 'A',
        'points': [1, 11]
      },
    ];
    var i = 0;

    while (i < 52 * numberOfDecks) {
      for (var cd = 0; cd < CardDeck.length; cd++) {
        window.util.gameDeck[i] = CardDeck[cd];
        i++;
      }
    }

    window.shuffleCards();
  };
})();
