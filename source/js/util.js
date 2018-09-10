'use strict';

window.util = (function () {
  var ESC_KEYCODE = 27;

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    findAncestor: function (el, cls) {
      while ((el = el.parentElement) && !el.classList.contains(cls));
      return el;
    },
    dealer: {
      cards: [],
      points: 0
    },
    player: {
      cards: [],
      points: 0,
      money: 0,
      chips: [0, 0, 0, 0, 0, 0],
      bet: 0
    },
    gameDeck: [],
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max + 1 - min) + min);
    },
    createChipsPile: function (chip) {
      var chipsPile = document.createElement('li');
      chipsPile.className = 'chips__pile chips__pile--' + chip;
      return chipsPile;
    },
    createChip: function (chip) {
      var chipTemplate = document.querySelector('#chip-template').content.querySelector('.chip--' + chip);
      var chipElement = chipTemplate.cloneNode(true);
      return chipElement;
    },
    setTransform: function (el, val) {
      el.style.transform = val;
    },
    removeChipsOfPile: function (parent, pileNumber, numOfChips, rect, deg) {
      var HALF_OF_CHIP = 16;

      var removeChip = function (chips) {
        for (var i = 0; i < numOfChips; i++) {
          chips[i].remove();
        }
        if (piles[piles.length - 1].children.length === 0) {
          piles[piles.length - 1].remove();
          window.sortPiles(parent);
        }
      };

      var piles = parent.querySelectorAll('.chips__pile--' + pileNumber);
      var removedChips = [];

      for (var i = 0; i < piles.length; i++) {
        for (var j = 0; j < piles[i].children.length; j++) {
          removedChips.splice(0, 0, piles[i].children[j]);
        }
      }
      for (var k = 0; k < numOfChips; k++) {
        var rectChip = removedChips[k].getBoundingClientRect();
        window.util.setTransform(removedChips[k], 'translate(' + (rect.left - rectChip.left + rect.width / 2 - HALF_OF_CHIP) + 'px, -' + (rectChip.top + rectChip.height * 2) + 'px) rotate(' + deg + 'deg)');
      }
      window.setTimeout(removeChip, TIME, removedChips);
    }
  };
})();
