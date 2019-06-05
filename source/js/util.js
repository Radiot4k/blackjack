'use strict';

window.util = (function () {
  var ESC_KEY = 'Escape'; //27
  var ENTER_KEY = 'Enter'; //13

  return {
    isEscEvent: function (evt, action) {
      if (evt.key === 'Escape') {
        action();
      }
    },
    isEnterEvent: function (evt, action1, action2) {
      if (evt.key === 'Enter' && !evt.altKey) {
        action1(evt);
      }
      if (evt.key === 'Enter' && evt.altKey) {
        action2(evt);
      }
    },
    isAltEnterEvent: function (evt, action) {
      if (evt.key === 'Enter' && evt.altKey) {
        action(evt);
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
      //var elementParentRect = element.parentElement.getBoundingClientRect();
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
        elements[i].style.transform = 'translate(' + x + 'px, ' + y + 'px)';
      }
    },
    // assembleChips: function (elements) {
    //   for (var i = 0; i < elements.length; i++) {
    //     var elemTransform = elements[i].style.transform;
    //     var x = elemTransform.slice(10, elemTransform.indexOf('px')) - 20 * i;
    //     var y = elemTransform.slice(elemTransform.indexOf(',') + 2, elemTransform.indexOf('px', elemTransform.indexOf(','))) - i;
    //     var deg = window.util.getRandomNumber(-30, 30);
    //     elements[i].style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(' + deg + 'deg)';
    //   }
    // },
    checkPile: function (parent, pileNumber) {
      var piles = parent.querySelectorAll('.chips__pile--' + pileNumber);
      if (piles[piles.length - 1].children.length === 0) {
        piles[piles.length - 1].remove();
      } else {
        window.util.setTabindex(piles[piles.length - 1]);
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
    pastePile: function (toParent, pileNumber) {
      var pilesAll = toParent.querySelectorAll('.chips__pile');
      var pileNeighbor = window.util.findNeighbor(toParent, pileNumber);
      var pile = window.util.createChipsPile(pileNumber);
      switch (pileNeighbor.pos) {
        case 'current':
          pileNeighbor.val.after(pile);
          break;
        case 'next':
          pileNeighbor.val.before(pile);
          break;
        default:
          toParent.appendChild(pile);
      }
    },
    addChipInPile: function (chipToAdd, toParent, pileNumber) {
      var piles = toParent.querySelectorAll('.chips__pile--' + pileNumber);
      if (piles.length === 0 || piles[piles.length - 1].children.length === 10) {
        window.util.pastePile(toParent, pileNumber);
        piles = toParent.querySelectorAll('.chips__pile--' + pileNumber);
      }
      piles[piles.length - 1].appendChild(chipToAdd);
      window.util.setTabindex(piles[piles.length - 1]);
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
    },
    removeAttr: function (element, attr) {
      element.removeAttribute(attr);
    },
    toggleClass: function (element, className) {
      element.classList.toggle(className);
    },
    setTabindex: function (parent) {
      var chips = parent.querySelectorAll('.chip');
      var lastChip = parent.querySelector('.chip:last-child');
      for (var i = 0; i < chips.length; i++) {
        chips[i].removeAttribute('tabindex');
      }
      lastChip.setAttribute('tabindex', '1');
    }
  };
})();
