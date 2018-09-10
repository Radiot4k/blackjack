'use strict';

(function () {
  var TIME = 1000;
  var TIME_TRANSFORM = 20;
  var ROTATE_DEG = 180;

  var body = document.querySelector('body');
  var stack = body.querySelector('#player-stack');
  var modal = body.querySelector('.modal');
  var overlay = body.querySelector('.modal-overlay');
  var context = modal.querySelector('.context-menu');
  var chipRack = body.querySelector('.table__chip-rack');
  var modalText = body.querySelector('.modal-text');
  var timer;

  var addChipsInPile = function (pileNumber, numOfChips) {
    var pile;
    var pileNeighbor = {};
    var rectChipRack = chipRack.getBoundingClientRect();
    var pilesAll = stack.querySelectorAll('.chips__pile');

    var pastePile = function () {
      pile = window.util.createChipsPile(pileNumber);
      switch (pileNeighbor.pos) {
        case 'current':
          pileNeighbor.val.after(pile);
          break;
        case 'next':
          pileNeighbor.val.before(pile);
      }
      window.sortPiles(stack);
      piles = stack.querySelectorAll('.chips__pile--' + pileNumber);
    };
    for (var q = 0; q < pilesAll.length; q++) {
      if (pilesAll[q].classList[1].slice(-1) <= pileNumber) {
        pileNeighbor.val = pilesAll[q];
        pileNeighbor.pos = 'current';
      } else {
        pileNeighbor.val = pilesAll[q];
        pileNeighbor.pos = 'next';
        break;
      }
    }
    var piles = stack.querySelectorAll('.chips__pile--' + pileNumber);

    if (piles.length === 0) {
      pastePile();
    }
    for (var i = 0; i < numOfChips; i++) {
      for (var j = 0; j < piles.length; j++) {
        if (piles[j].children.length < 10) {
          var chip = window.util.createChip(pileNumber);
          var rectPile = piles[j].getBoundingClientRect();
          var rotateDegEnd = window.util.getRandomNumber(-30, 30);
          var translateXPxEnd = window.util.getRandomNumber(-1, 1);
          var translateYPxEnd = piles[j].children.length * -1;
          chip.setAttribute('style', 'transform: translate(' + (rectChipRack.left - rectPile.left + rectChipRack.width / 2 - HALF_OF_CHIP) + 'px, -' + (rectPile.top + rectPile.height * 2) + 'px) rotate(' + ROTATE_DEG + 'deg)');
          piles[j].appendChild(chip);
          window.setTimeout(window.util.setTransform, TIME_TRANSFORM, chip, 'translate(' + translateXPxEnd + 'px,' + translateYPxEnd + 'px) rotate(' + rotateDegEnd + 'deg)');
          break;
        } else {
          if (j === piles.length - 1) {
            pastePile();
          }
        }
      }
    }
  };

  var changeChips = function (pressedButton, pressedChip) {
    var PILE_REM;
    var PILE_ADD;
    var AMOUNT_PLUS;
    var AMOUNT_MINUS;
    var rectChipRack = chipRack.getBoundingClientRect();

    var hideModalText = function () {
      modalText.classList.add('hide');
    };

    modalText.textContent = 'Exchanging chips...';
    modalText.classList.remove('hide');
    window.setTimeout(hideModalText, TIME * 2);

    switch (pressedButton.classList[1]) {
      case 'context-menu__button--1to5':
        window.util.player.chips[0] -= 5;
        window.util.player.chips[1] += 1;
        PILE_REM = 0;
        AMOUNT_MINUS = 5;
        PILE_ADD = 1;
        AMOUNT_PLUS = 1;
        break;
      case 'context-menu__button--5to1':
        window.util.player.chips[1] -= 1;
        window.util.player.chips[0] += 5;
        PILE_REM = 1;
        AMOUNT_MINUS = 1;
        PILE_ADD = 0;
        AMOUNT_PLUS = 5;
        break;
      case 'context-menu__button--5to10':
        window.util.player.chips[1] -= 2;
        window.util.player.chips[2] += 1;
        PILE_REM = 1;
        AMOUNT_MINUS = 2;
        PILE_ADD = 2;
        AMOUNT_PLUS = 1;
        break;
      case 'context-menu__button--5to25':
        window.util.player.chips[1] -= 5;
        window.util.player.chips[3] += 1;
        PILE_REM = 1;
        AMOUNT_MINUS = 5;
        PILE_ADD = 3;
        AMOUNT_PLUS = 1;
        break;
      case 'context-menu__button--10to5':
        window.util.player.chips[2] -= 1;
        window.util.player.chips[1] += 2;
        PILE_REM = 2;
        AMOUNT_MINUS = 1;
        PILE_ADD = 1;
        AMOUNT_PLUS = 2;
        break;
      case 'context-menu__button--10to5and25':
        window.util.player.chips[2] -= 3;
        window.util.player.chips[1] += 1;
        window.util.player.chips[3] += 1;
        PILE_REM = 2;
        AMOUNT_MINUS = 3;
        PILE_ADD = 1;
        AMOUNT_PLUS = 1;
        window.setTimeout(addChipsInPile, TIME, PILE, AMOUNT_PLUS);
        PILE_ADD = 3;
        break;
      case 'context-menu__button--10to50':
        window.util.player.chips[2] -= 5;
        window.util.player.chips[4] += 1;
        PILE_REM = 2;
        AMOUNT_MINUS = 5;
        PILE_ADD = 4;
        AMOUNT_PLUS = 1;
        break;
      case 'context-menu__button--25to5':
        window.util.player.chips[3] -= 1;
        window.util.player.chips[1] += 5;
        PILE_REM = 3;
        AMOUNT_MINUS = 1;
        PILE_ADD = 1;
        AMOUNT_PLUS = 5;
        break;
      case 'context-menu__button--25to5and10':
        window.util.player.chips[3] -= 1;
        window.util.player.chips[1] += 1;
        window.util.player.chips[2] += 2;
        PILE_REM = 3;
        AMOUNT_MINUS = 1;
        PILE_ADD = 2;
        AMOUNT_PLUS = 2;
        window.setTimeout(addChipsInPile, TIME, PILE, AMOUNT_PLUS);
        PILE_ADD = 1;
        AMOUNT_PLUS = 1;
        break;
      case 'context-menu__button--25to50':
        window.util.player.chips[3] -= 2;
        window.util.player.chips[4] += 1;
        PILE_REM = 3;
        AMOUNT_MINUS = 2;
        PILE_ADD = 4;
        AMOUNT_PLUS = 1;
        break;
      case 'context-menu__button--25to100':
        window.util.player.chips[3] -= 4;
        window.util.player.chips[5] += 1;
        PILE_REM = 3;
        AMOUNT_MINUS = 4;
        PILE_ADD = 5;
        AMOUNT_PLUS = 1;
        break;
      case 'context-menu__button--50to10':
        window.util.player.chips[4] -= 1;
        window.util.player.chips[2] += 5;
        PILE_REM = 4;
        AMOUNT_MINUS = 1;
        PILE_ADD = 2;
        AMOUNT_PLUS = 5;
        break;
      case 'context-menu__button--50to25':
        window.util.player.chips[4] -= 1;
        window.util.player.chips[3] += 2;
        PILE_REM = 4;
        AMOUNT_MINUS = 1;
        PILE_ADD = 3;
        AMOUNT_PLUS = 2;
        break;
      case 'context-menu__button--50to100':
        window.util.player.chips[4] -= 2;
        window.util.player.chips[5] += 1;
        PILE_REM = 4;
        AMOUNT_MINUS = 2;
        PILE_ADD = 5;
        AMOUNT_PLUS = 1;
        break;
      case 'context-menu__button--100to25':
        window.util.player.chips[5] -= 1;
        window.util.player.chips[3] += 4;
        PILE_REM = 5;
        AMOUNT_MINUS = 1;
        PILE_ADD = 3;
        AMOUNT_PLUS = 4;
        break;
      case 'context-menu__button--100to50':
        window.util.player.chips[5] -= 1;
        window.util.player.chips[4] += 2;
        PILE_REM = 5;
        AMOUNT_MINUS = 1;
        PILE_ADD = 4;
        AMOUNT_PLUS = 2;
        break;
    }
    window.util.removeChipsOfPile(stack, PILE_REM, AMOUNT_MINUS, rectChipRack, ROTATE_DEG);
    window.setTimeout(window.util.addChipsInPile, TIME, PILE_ADD, AMOUNT_PLUS);
  };

  var hideUnnecessary = function (contextMenu) {
    switch (contextMenu.classList[0]) {
      case 'context-menu__0':
        if (window.util.player.chips[0] < 5) {
          modal.classList.add('hide');
          overlay.classList.add('hide');
          contextMenu.classList.add('hide');
        }
        break;
      case 'context-menu__1':
        if (window.util.player.chips[1] < 2) {
          contextMenu.querySelector('.context-menu__button--5to10').classList.add('hide');
          contextMenu.querySelector('.context-menu__button--5to25').classList.add('hide');
          break;
        }
        if (window.util.player.chips[1] < 5) {
          contextMenu.querySelector('.context-menu__button--5to25').classList.add('hide');
        }
        break;
      case 'context-menu__2':
        if (window.util.player.chips[2] < 3) {
          contextMenu.querySelector('.context-menu__button--10to5and25').classList.add('hide');
          contextMenu.querySelector('.context-menu__button--10to50').classList.add('hide');
          break;
        }
        if (window.util.player.chips[2] < 5) {
          contextMenu.querySelector('.context-menu__button--10to50').classList.add('hide');
        }
        break;
      case 'context-menu__3':
        if (window.util.player.chips[3] < 2) {
          contextMenu.querySelector('.context-menu__button--25to50').classList.add('hide');
          contextMenu.querySelector('.context-menu__button--25to100').classList.add('hide');
          break;
        }
        if (window.util.player.chips[3] < 4) {
          contextMenu.querySelector('.context-menu__button--25to100').classList.add('hide');
        }
        break;
      case 'context-menu__4':
        if (window.util.player.chips[4] < 2) {
          contextMenu.querySelector('.context-menu__button--50to100').classList.add('hide');
        }
        break;
    }
  };

  window.onStackContextClick = function (evt) {
    var onOverlayEscPress = function (evt) {
      window.util.isEscEvent(evt, onOverlayClick);
    };

    var onOverlayClick = function () {
      overlay.removeEventListener('click', onOverlayClick);
      modal.removeEventListener('click', onContextClick);
      document.removeEventListener('keydown', onOverlayEscPress);
      modal.classList.add('hide');
      overlay.classList.add('hide');
      for (var i = 1; i < context.children.length; i++) {
        if (!context.children[i].classList.contains('hide')) {
          context.children[i].classList.add('hide');
          var buttons = context.children[i].querySelectorAll('.context-menu__button');
          for (var j = 0; j < buttons.length; j++) {
            if (buttons[j].classList.contains('hide')) {
              buttons[j].classList.remove('hide');
            }
          }
          break;
        }
      }
    };

    var onContextClick = function (evt) {
      modal.removeEventListener('click', onContextClick);
      var pressedButton = window.util.findAncestor(evt.target, 'context-menu__button');
      if (pressedButton) {
        changeChips(pressedButton, pressedChip);
      } else if (evt.target.classList.contains('context-menu__button')) {
        changeChips(evt.target, pressedChip);
      }
      onOverlayClick();
    };

    evt.preventDefault();
    var pressedChip = window.util.findAncestor(evt.target, 'chip');
    if (pressedChip) {
      var contextMenu = modal.querySelector('.context-menu__' + parseInt(pressedChip.classList.value.slice(-1)), 10);
      contextMenu.classList.remove('hide');
      modal.classList.remove('hide');
      overlay.classList.remove('hide');
      hideUnnecessary(contextMenu);
      overlay.addEventListener('click', onOverlayClick);
      document.addEventListener('keydown', onOverlayEscPress);
      modal.addEventListener('click', onContextClick);
    }
  };

  var moveChipOnBet = function (pileNumber) {
    var piles = stack.querySelectorAll('.chips__pile--' + pileNumber);
    var betCircle = document.querySelector('.bet__circle-stack');
    var pileInBet = betCircle.querySelector('.chips__pile--' + pileNumber);
    if (!pileInBet) {
      pileInBet = window.util.createChipsPile(pileNumber);
      betCircle.appendChild(pileInBet);
    }
    var rectPileInBet = pileInBet.getBoundingClientRect();
    var chip = piles[piles.length - 1].lastChild;
    var rectChip = chip.getBoundingClientRect();
    var rotateDegEnd = window.util.getRandomNumber(-30, 30);
    var translateXPxEnd = window.util.getRandomNumber(-1, 1);
    var translateYPxEnd = pileInBet.children.length * -1;
    var rotateDegStart = chip.style.transform.slice(chip.style.transform.indexOf('rotate'));
    chip.remove();
    chip.style.transform = 'translate(' + (rectChip.left - rectPileInBet.left) + 'px, ' + (rectChip.top - rectPileInBet.top) + 'px) ' + rotateDegStart;
    pileInBet.appendChild(chip);
    window.setTimeout(window.util.setTransform, TIME_TRANSFORM, chip, 'translate(' + translateXPxEnd + 'px,' + translateYPxEnd + 'px) rotate(' + rotateDegEnd + 'deg)');

    window.sortPiles(betCircle);
    window.sortPiles(stack);
  };

  var oneChipBet = function (evt, pressedChip) {
    switch (pressedChip.classList[1]) {
      case 'chip--5':
        window.util.player.chips[5] -= 1;
        window.util.player.money -= 100;
        window.util.player.bet += 100;
        break;
      case 'chip--4':
        window.util.player.chips[4] -= 1;
        window.util.player.money -= 50;
        window.util.player.bet += 50;
        break;
      case 'chip--3':
        window.util.player.chips[3] -= 1;
        window.util.player.money -= 25;
        window.util.player.bet += 25;
        break;
      case 'chip--2':
        window.util.player.chips[2] -= 1;
        window.util.player.money -= 10;
        window.util.player.bet += 10;
        break;
      case 'chip--1':
        window.util.player.chips[1] -= 1;
        window.util.player.money -= 5;
        window.util.player.bet += 5;
        break;
      case 'chip--0':
        window.util.player.chips[0] -= 1;
        window.util.player.money -= 1;
        window.util.player.bet += 1;
        break;
    }

    moveChipOnBet(pressedChip.classList.value.slice(-1));
  };

  window.onStackClick = function (evt) {
    var pressedChip = window.util.findAncestor(evt.target, 'chip');
    if (pressedChip) {
      oneChipBet(evt, pressedChip);
    }

    window.elements.deal.addEventListener('click', onDealClick);
  };
})();
