'use strict';

window.util = (function () {
  var ESC_KEYCODE = 27;
  var HALF_OF_CHIP = 16;
  var TIME_TRANSFORM = 20;

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
      name: '',
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
    setOpacity: function (el, val) {
      el.style.opacity = val;
    },
    removeChipsFromPile: function (fromParent, pileNumber, toParent, deg, amount) {
      window.count++;
      if (window.count === amount) {
        clearInterval(window.intevalId);
      }
      var piles = fromParent.querySelectorAll('.chips__pile--' + pileNumber);
      var chipToRemove = piles[piles.length - 1].lastChild;
      var chipToRemoveRect = chipToRemove.getBoundingClientRect();
      var toParentRect = toParent.getBoundingClientRect();
      var coord = {};
      coord.x = toParentRect.left - chipToRemoveRect.left + toParentRect.width / 2 - chipToRemoveRect.width / 2;
      coord.y = (chipToRemoveRect.top + chipToRemoveRect.height) * -1;
      coord.deg = deg;

      var checkPile = function () {
        if (piles[piles.length - 1].children.length === 0) {
          piles[piles.length - 1].remove();
          window.sortPiles(fromParent);
        }
      };

      window.util.removeElement(chipToRemove, 500, 'translate', coord);
      window.setTimeout(checkPile, 500);
    },
    addChipsInPile: function (toParent, pileNumber, fromParent, deg, amount) {
      window.countAdd++;
      if (window.countAdd === amount) {
        clearInterval(window.intevalIdAdd);
      }
      var pilesAll = toParent.querySelectorAll('.chips__pile');
      var piles = toParent.querySelectorAll('.chips__pile--' + pileNumber);
      var pileNeighbor = {};
      for (var i = 0; i < pilesAll.length; i++) {
        if (pilesAll[i].classList[1].slice(-1) <= pileNumber) {
          pileNeighbor.val = pilesAll[i];
          pileNeighbor.pos = 'current';
        } else {
          pileNeighbor.val = pilesAll[i];
          pileNeighbor.pos = 'next';
          break;
        }
      }
      var pastePile = function () {
        var pile = window.util.createChipsPile(pileNumber);
        switch (pileNeighbor.pos) {
          case 'current':
            pileNeighbor.val.after(pile);
            break;
          case 'next':
            pileNeighbor.val.before(pile);
        }
        window.sortPiles(toParent);
        piles = toParent.querySelectorAll('.chips__pile--' + pileNumber);
      };

      if (piles.length === 0 || piles[piles.length - 1].children.length === 10) {
        pastePile();
      }

      var chipToAdd = window.util.createChip(pileNumber);
      var pileRect = piles[piles.length - 1].getBoundingClientRect();
      var fromParentRect = fromParent.getBoundingClientRect();
      var coord = {};
      coord.x1 = fromParentRect.left - pileRect.left + fromParentRect.width / 2 - pileRect.width / 2;
      coord.y1 = (pileRect.top - fromParentRect.top + pileRect.height) * -1;
      coord.deg1 = deg;
      coord.x2 = window.util.getRandomNumber(-1, 1);
      coord.y2 = piles[piles.length - 1].children.length * -1;
      coord.deg2 = window.util.getRandomNumber(-30, 30);
      window.util.addElement(piles[piles.length - 1], chipToAdd, 'transform', coord);
    },
    hideElement: function (elem, time, method) {
      switch (method) {
        case 'opacity':
          elem.style.opacity = '0';
          break;
        case 'translateY':
          elem.style.transform = 'translateY(-100%)';
          break;
      }
      window.setTimeout(window.util.addClassHide, time, elem);
    },
    addClassHide: function (elem) {
      elem.classList.add('hide');
      elem.removeAttribute('style');
    },
    showElement: function (elem, method) {
      switch (method) {
        case 'opacity':
          elem.style.opacity = '0';
          window.setTimeout(window.util.setOpacity, 10, elem, '1');
          break;
        case 'translateY':
          elem.style.transform = 'translateY(-100%)';
          window.setTimeout(window.util.setTransform, 10, elem, 'translateY(0)');
          break;
      }
      elem.classList.remove('hide');
    },
    addElement: function (parent, elem, method, coordinates) {
      switch (method) {
        case 'opacity':
          elem.style.opacity = '0';
          window.setTimeout(window.util.setOpacity, 10, elem, '1');
          break;
        case 'transform':
          elem.style.transform = 'translate(' + coordinates.x1 + 'px, ' + coordinates.y1 + 'px) rotate(' + coordinates.deg1 + 'deg)';
          window.setTimeout(window.util.setTransform, 20, elem, 'translate(' + coordinates.x2 + 'px, ' + coordinates.y2 + 'px) rotate(' + coordinates.deg2 + 'deg)');
          break;
      }
      parent.appendChild(elem);
    },
    removeElement: function (elem, time, method, coordinates) {
      var remove = function () {
        elem.remove();
      };
      switch (method) {
        case 'opacity':
          elem.style.opacity = '0';
          break;
        case 'translate':
          elem.style.transform = 'translate(' + coordinates.x + 'px, ' + coordinates.y + 'px) rotate(' + coordinates.deg + 'deg)';
          break;
      }
      window.setTimeout(remove, time);
    }
  };
})();
