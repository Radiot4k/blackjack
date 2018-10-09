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
    Chips: [{
      name: 'type1',
      value: 1
    },
    {
      name: 'type2',
      value: 5
    },
    {
      name: 'type3',
      value: 10
    },
    {
      name: 'type4',
      value: 25
    },
    {
      name: 'type5',
      value: 50
    },
    {
      name: 'type6',
      value: 100
    }],
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
    addClass: function (elem, className) {
      elem.classList.add(className);
    },
    removeClass: function (elem, className) {
      elem.classList.remove(className);
    },
    setStyle: function (elem, st, val) {
      elem.style[st] = val;
    },
    selectChips: function (parent, pileNumber, amount) {
      var pilesAll = parent.querySelectorAll('.chips__pile--' + pileNumber);
      var chips = [];
      for (var i = 0; i < pilesAll.length; i++) {
        for (var j = 0; j < pilesAll[i].children.length; j++) {
          chips.splice(0, 0, pilesAll[i].children[j]);
        }
      }
      var selectedChips = [];
      for (i = 0; i < amount; i++) {
        selectedChips.splice(0, 0, chips[i]);
      }
      return selectedChips;
    },
    getCoordinatesToMove: function (element, toParentRect) {
      var elementTransform = element.style.transform;
      var elementRect = element.getBoundingClientRect();
      var coord = {};
      coord.x = toParentRect.left - elementRect.left + toParentRect.width / 2 - elementRect.width / 2 + parseInt(elementTransform.slice(10, elementTransform.indexOf('px')), 10);
      coord.y = toParentRect.top - elementRect.top + parseInt(elementTransform.slice(elementTransform.indexOf(',') + 2, elementTransform.indexOf('px', elementTransform.indexOf(','))), 10);
      return coord;
    },
    splitChips: function (elements, k) {
      for (var i = 0; i < elements.length; i++) {
        var elemTransform = elements[i].style.transform;
        var x = elemTransform.slice(10, elemTransform.indexOf('px')) - (20 * i * k);
        var y = elemTransform.slice(elemTransform.indexOf(',') + 2, elemTransform.indexOf('px', elemTransform.indexOf(','))) - (i * k);
        var deg = elemTransform.slice(elemTransform.indexOf('rotate(') + 7, elemTransform.indexOf('deg'));
        elements[i].style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(' + deg + 'deg)';
      }
    },
    assembleChips: function (elements) {
      for (var i = 0; i < elements.length; i++) {
        var elemTransform = elements[i].style.transform;
        var x = elemTransform.slice(10, elemTransform.indexOf('px')) - 20 * i;
        var y = elemTransform.slice(elemTransform.indexOf(',') + 2, elemTransform.indexOf('px', elemTransform.indexOf(','))) - i;
        var deg = window.util.getRandomNumber(-30, 30);
        elements[i].style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(' + deg + 'deg)';
      }
    },
    checkPile: function (parent, pileNumber) {
      var piles = parent.querySelectorAll('.chips__pile--' + pileNumber);
      if (piles[piles.length - 1].children.length === 0) {
        piles[piles.length - 1].remove();
        //window.sortPiles(parent);
      }
    },
    findNeighbor: function (parent, pileNumber) {
      var neighbor = {};
      var pilesAll = parent.querySelectorAll('.chips__pile');
      for (var i = 0; i < pilesAll.length; i++) {
        if (pilesAll[i].classList.value.slice(-1) <= pileNumber) {
          neighbor.val = pilesAll[i];
          neighbor.pos = 'current';
        } else {
          neighbor.val = pilesAll[i];
          neighbor.pos = 'next';
          break;
        }
      }
      return neighbor;
    },
    addChipsInPile: function (chipToAdd, toParent, pileNumber, fromParent, rotateDeg) {
      var piles = toParent.querySelectorAll('.chips__pile--' + pileNumber);

      var pastePile = function () {
        var pilesAll = toParent.querySelectorAll('.chips__pile');
        var pileNeighbor = window.util.findNeighbor(toParent, pileNumber);
        var pile = window.util.createChipsPile(pileNumber);
        switch (pileNeighbor.pos) {
          case 'current':
            pileNeighbor.val.after(pile);
            break;
          case 'next':
            pileNeighbor.val.before(pile);
        }
        piles = toParent.querySelectorAll('.chips__pile--' + pileNumber);
      };

      if (piles.length === 0 || piles[piles.length - 1].children.length === 10) {
        pastePile();
      }
      var pileRect = piles[piles.length - 1].getBoundingClientRect();
      var fromParentRect = fromParent.getBoundingClientRect();
      var x = fromParentRect.left - pileRect.left + fromParentRect.width / 2 - pileRect.width / 2;
      var y = fromParentRect.top - pileRect.top;
      var deg = rotateDeg;
      chipToAdd.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(' + deg + 'deg)';
      piles[piles.length - 1].appendChild(chipToAdd);
    },
    hideElement: function (elem, time, method) {
      switch (method.name) {
        case 'opacity':
          elem.style.opacity = method.end;
          break;
        case 'translateY':
          elem.style.transform = method.end;
          break;
      }
      window.setTimeout(window.util.addClassHide, time, elem);
    },
    showElement: function (elem, method) {
      switch (method.name) {
        case 'opacity':
          elem.style.opacity = method.start;
          window.setTimeout(window.util.setOpacity, 10, elem, method.end);
          break;
        case 'transform':
          elem.style.transform = method.start;
          window.setTimeout(window.util.setTransform, 10, elem, method.end);
          break;
      }
      elem.classList.remove('hide');
    },
    addElement: function (parent, element) {
      parent.appendChild(element);
    },
    removeElement: function (element) {
      element.remove();
    }
  };
})();
