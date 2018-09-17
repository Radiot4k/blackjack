'use strict';

(function () {
  var TIME = 1000;
  var TIME_TRANSFORM = 20;
  var ROTATE_DEG = 180;
  var HALF_OF_CHIP = 16;

  var body = document.querySelector('body');
  var modal = body.querySelector('.modal');
  var overlay = body.querySelector('.modal-overlay');
  var context = modal.querySelector('.context-menu');
  var modalText = body.querySelector('.modal-text');

  var changeChips = function (pressedButton) {
    var PILE_REM;
    var PILE_ADD;
    var AMOUNT_PLUS;
    var AMOUNT_MINUS;
    var stack = document.querySelector('.player__stack');
    var chipRack = document.querySelector('.table__chip-rack');
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
        for (i = 0; i < AMOUNT_PLUS; i++) {
          window.setTimeout(window.util.addChipsInPile, TIME, stack, PILE_ADD, chipRack, ROTATE_DEG);
        }
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
        for (i = 0; i < AMOUNT_PLUS; i++) {
          window.setTimeout(window.util.addChipsInPile, TIME, stack, PILE_ADD, chipRack, ROTATE_DEG);
        }
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

    window.count = 0;
    window.intevalId = setInterval(window.util.removeChipsFromPile, 520, stack, PILE_REM, chipRack, ROTATE_DEG, AMOUNT_MINUS);
    // for (var i = 0; i < AMOUNT_MINUS; i++) {
    //   window.util.removeChipsFromPile(stack, PILE_REM, chipRack, ROTATE_DEG);
    // }
    var startAdd = function () {
      window.countAdd = 0;
      window.intevalIdAdd = setInterval(window.util.addChipsInPile, 520, stack, PILE_ADD, chipRack, ROTATE_DEG, AMOUNT_PLUS);
    };

    window.setTimeout(startAdd, 520 * AMOUNT_MINUS);

    // window.util.removeChipsFromPile(stack, PILE_REM, AMOUNT_MINUS, rectChipRack, ROTATE_DEG);
    // window.setTimeout(window.util.addChipsInPile, TIME, stack, PILE_ADD, AMOUNT_PLUS, rectChipRack, ROTATE_DEG);
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
    evt.preventDefault();

    var onOverlayEscPress = function (evt) {
      window.util.isEscEvent(evt, onOverlayClick);
    };

    var onOverlayClick = function () {
      overlay.removeEventListener('click', onOverlayClick);
      modal.removeEventListener('click', onContextClick);
      document.removeEventListener('keydown', onOverlayEscPress);
      window.util.hideElement(modal, 600, 'translateY');
      window.util.hideElement(overlay, 600, 'opacity');
      for (var i = 1; i < context.children.length; i++) {
        if (!context.children[i].classList.contains('hide')) {
          window.util.hideElement(context.children[i], 600);
          var buttons = context.children[i].querySelectorAll('.context-menu__button');
          for (var j = 0; j < buttons.length; j++) {
            if (buttons[j].classList.contains('hide')) {
              //buttons[j].classList.remove('hide');
              window.setTimeout(window.util.showElement, 600, buttons[j]);
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
        changeChips(pressedButton);
      } else if (evt.target.classList.contains('context-menu__button')) {
        changeChips(evt.target);
      }
      onOverlayClick();
    };

    var pressedChip = window.util.findAncestor(evt.target, 'chip');
    if (pressedChip) {
      var contextMenu = modal.querySelector('.context-menu__' + pressedChip.classList.value.slice(-1));
      contextMenu.classList.remove('hide');
      window.util.showElement(modal, 'translateY');
      window.util.showElement(overlay, 'opacity');
      hideUnnecessary(contextMenu);
      overlay.addEventListener('click', onOverlayClick);
      document.addEventListener('keydown', onOverlayEscPress);
      modal.addEventListener('click', onContextClick);
    }
  };
})();
