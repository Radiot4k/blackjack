'use strict';

window.elements = (function () {
  return {

    chipTemplate: document.querySelector('#chip-template'),

    tableShoe: document.querySelector('.table__shoe'),

    playerHand: document.querySelector('#player'),
    playerButtons: document.querySelector('.player__buttons'),
    hit: document.querySelector('#hit'),
    double: document.querySelector('#double'),
    surrender: document.querySelector('#surrender'),
    stop: document.querySelector('#stop'),
    deal: document.querySelector('#deal'),
    dealerPoints: document.querySelector('.dealer-points'),
    playerPoints: document.querySelector('.player-points')
  };
})();
