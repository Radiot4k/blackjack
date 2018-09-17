'use strict';

(function () {
  window.shuffleCards = function () {
    var compareRandom = function (a, b) {
      return Math.random() - 0.5;
    };

    window.util.gameDeck.sort(compareRandom);
    window.util.gameDeck.splice(-window.util.gameDeck.length / 4, 0, 'yellow');
  };

  window.newDeck = function (numberOfDecks) {
    var CardDeck = [
      's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's1', 'sJ', 'sQ', 'sK', 'sA', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c1', 'cJ', 'cQ', 'cK', 'cA', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd1', 'dJ', 'dQ', 'dK', 'dA', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9', 'h1', 'hJ', 'hQ', 'hK', 'hA'
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
