'use strict';

(function () {
  var TIME = 500;
  var HOLD = 10;

  var modal = document.querySelector('.modal');
  var overlayModal = document.querySelector('.modal-overlay');
  var overlay = document.querySelector('.overlay');
  var context = modal.querySelector('.context-menu');
  var modalText = document.querySelector('.modal-text');

  var changeChips = function (pressedButton) {
    overlay.classList.remove('hide');
    var PILE_REM;
    var PILE_ADD;
    var AMOUNT_PLUS;
    var AMOUNT_MINUS;
    var TIME_TO_MOVE = 400;
    var stack = document.querySelector('.player__stack');
    var chipRack = document.querySelector('.table__chip-rack');
    var newChips = [];
    var i;
    var toSplit = false;
    var toSplitNew = false;
    var t = 2;

    modalText.textContent = 'Exchanging chips...';
    modalText.classList.remove('hide');

    switch (pressedButton.name) {
      case 'exchange-1to5':
        window.util.player.chips[0] -= 5;
        window.util.player.chips[1] += 1;
        toSplit = true;
        t = 6;
        PILE_REM = 0;
        AMOUNT_MINUS = 5;
        PILE_ADD = 1;
        AMOUNT_PLUS = 1;
        break;
      case 'exchange-5to1':
        window.util.player.chips[1] -= 1;
        window.util.player.chips[0] += 5;
        toSplitNew = true;
        PILE_REM = 1;
        AMOUNT_MINUS = 1;
        PILE_ADD = 0;
        AMOUNT_PLUS = 5;
        break;
      case 'exchange-5to10':
        window.util.player.chips[1] -= 2;
        window.util.player.chips[2] += 1;
        toSplit = true;
        t = 6;
        PILE_REM = 1;
        AMOUNT_MINUS = 2;
        PILE_ADD = 2;
        AMOUNT_PLUS = 1;
        break;
      case 'exchange-5to25':
        window.util.player.chips[1] -= 5;
        window.util.player.chips[3] += 1;
        toSplit = true;
        t = 6;
        PILE_REM = 1;
        AMOUNT_MINUS = 5;
        PILE_ADD = 3;
        AMOUNT_PLUS = 1;
        break;
      case 'exchange-10to5':
        window.util.player.chips[2] -= 1;
        window.util.player.chips[1] += 2;
        toSplitNew = true;
        PILE_REM = 2;
        AMOUNT_MINUS = 1;
        PILE_ADD = 1;
        AMOUNT_PLUS = 2;
        break;
      case 'exchange-10to5and25':
        window.util.player.chips[2] -= 3;
        window.util.player.chips[1] += 1;
        window.util.player.chips[3] += 1;
        toSplit = true;
        toSplitNew = true;
        t = 6;
        PILE_REM = 2;
        AMOUNT_MINUS = 3;
        PILE_ADD = 3;
        AMOUNT_PLUS = 1;
        newChips.splice(0, 0, window.util.createChip(PILE_ADD));
        PILE_ADD = 1;
        break;
      case 'exchange-10to50':
        window.util.player.chips[2] -= 5;
        window.util.player.chips[4] += 1;
        toSplit = true;
        t = 6;
        PILE_REM = 2;
        AMOUNT_MINUS = 5;
        PILE_ADD = 4;
        AMOUNT_PLUS = 1;
        break;
      case 'exchange-25to5':
        window.util.player.chips[3] -= 1;
        window.util.player.chips[1] += 5;
        toSplitNew = true;
        PILE_REM = 3;
        AMOUNT_MINUS = 1;
        PILE_ADD = 1;
        AMOUNT_PLUS = 5;
        break;
      case 'exchange-25to5and10':
        window.util.player.chips[3] -= 1;
        window.util.player.chips[1] += 1;
        window.util.player.chips[2] += 2;
        toSplitNew = true;
        PILE_REM = 3;
        AMOUNT_MINUS = 1;
        PILE_ADD = 2;
        AMOUNT_PLUS = 2;
        for (i = 0; i < AMOUNT_PLUS; i++) {
          newChips.splice(0, 0, window.util.createChip(PILE_ADD));
        }
        PILE_ADD = 1;
        AMOUNT_PLUS = 1;
        break;
      case 'exchange-25to50':
        window.util.player.chips[3] -= 2;
        window.util.player.chips[4] += 1;
        toSplit = true;
        t = 6;
        PILE_REM = 3;
        AMOUNT_MINUS = 2;
        PILE_ADD = 4;
        AMOUNT_PLUS = 1;
        break;
      case 'exchange-25to100':
        window.util.player.chips[3] -= 4;
        window.util.player.chips[5] += 1;
        toSplit = true;
        t = 6;
        PILE_REM = 3;
        AMOUNT_MINUS = 4;
        PILE_ADD = 5;
        AMOUNT_PLUS = 1;
        break;
      case 'exchange-50to10':
        window.util.player.chips[4] -= 1;
        window.util.player.chips[2] += 5;
        toSplitNew = true;
        PILE_REM = 4;
        AMOUNT_MINUS = 1;
        PILE_ADD = 2;
        AMOUNT_PLUS = 5;
        break;
      case 'exchange-50to25':
        window.util.player.chips[4] -= 1;
        window.util.player.chips[3] += 2;
        toSplitNew = true;
        PILE_REM = 4;
        AMOUNT_MINUS = 1;
        PILE_ADD = 3;
        AMOUNT_PLUS = 2;
        break;
      case 'exchange-50to100':
        window.util.player.chips[4] -= 2;
        window.util.player.chips[5] += 1;
        toSplit = true;
        t = 6;
        PILE_REM = 4;
        AMOUNT_MINUS = 2;
        PILE_ADD = 5;
        AMOUNT_PLUS = 1;
        break;
      case 'exchange-100to25':
        window.util.player.chips[5] -= 1;
        window.util.player.chips[3] += 4;
        toSplitNew = true;
        PILE_REM = 5;
        AMOUNT_MINUS = 1;
        PILE_ADD = 3;
        AMOUNT_PLUS = 4;
        break;
      case 'exchange-100to50':
        window.util.player.chips[5] -= 1;
        window.util.player.chips[4] += 2;
        toSplitNew = true;
        PILE_REM = 5;
        AMOUNT_MINUS = 1;
        PILE_ADD = 4;
        AMOUNT_PLUS = 2;
        break;
    }

    var chipsToExchange = window.util.selectChips(stack, PILE_REM, AMOUNT_MINUS);
    for (i = 0; i < chipsToExchange.length; i++) {
      chipsToExchange[i].classList.add('chip--exchange-to-dealer-' + i);
      if (toSplit) {
        window.setTimeout(window.util.addClass, TIME * 2, chipsToExchange[i], 'chip--split-' + i);
        window.setTimeout(window.util.removeClass, TIME * 4, chipsToExchange[i], 'chip--split-' + i);
      }
      window.setTimeout(window.util.addClass, TIME * t, chipsToExchange[i], 'chip--delete');
      window.setTimeout(window.util.removeElement, TIME * (t + 1), chipsToExchange[i]);
    }
    window.setTimeout(window.util.checkPile, TIME * (t + 2), stack, PILE_REM);

    // новые фишки после размена:
    for (i = 0; i < AMOUNT_PLUS; i++) {
      newChips.splice(0, 0, window.util.createChip(PILE_ADD));
    }
    for (i = 0; i < newChips.length; i++) {
      window.setTimeout(window.util.addClass, TIME * (t + 2), newChips[i], 'chip--exchange-to-dealer-' + i);
      window.setTimeout(window.util.addClass, TIME * (t + 2), newChips[i], 'chip--delete');
      window.setTimeout(window.util.addChipInPile, TIME * (t + 2), newChips[i], stack, newChips[i].classList.value.slice(-1));
      window.setTimeout(window.util.removeClass, TIME * (t + 3), newChips[i], 'chip--delete');
      if (toSplitNew) {
        window.setTimeout(window.util.addClass, TIME * (t + 5), newChips[i], 'chip--split-' + i);
        window.setTimeout(window.util.removeClass, TIME * (t + 7), newChips[i], 'chip--split-' + i);
      }
    }
    t += toSplitNew ? 9 : 5;
    for (i = 0; i < newChips.length; i++) {
      window.setTimeout(window.util.removeClass, TIME * t, newChips[i], 'chip--exchange-to-dealer-' + i);
    }

    window.setTimeout(window.util.addClass, HOLD, modalText, 'opacity-1');
    window.setTimeout(window.util.removeClass, TIME * t, modalText, 'opacity-1');
    window.setTimeout(window.util.addClass, TIME * t + TIME, modalText, 'hide');
    window.setTimeout(window.util.addClass, TIME * t + TIME, overlay, 'hide');
    //window.setTimeout(window.util.setTabindex, TIME * t, );
  };

  var hideUnnecessary = function (contextMenu) {
    switch (contextMenu.classList[0]) {
      case 'context-menu__0':
        if (window.util.player.chips[0] < 5) {
          modal.classList.add('hide');
          overlayModal.classList.add('hide');
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
    window.isLongTouch = true;

    var onOverlayEscPress = function (evt) {
      window.util.isEscEvent(evt, onOverlayClick);
    };

    var onOverlayClick = function () {
      window.isLongTouch = false;
      overlayModal.removeEventListener('click', onOverlayClick);
      modal.removeEventListener('click', onContextClick);
      document.removeEventListener('keydown', onOverlayEscPress);
      modal.classList.remove('modal--show');
      overlayModal.classList.remove('modal-overlay--opacity-up');
      window.setTimeout(window.util.addClass, TIME, modal, 'hide');
      window.setTimeout(window.util.addClass, TIME, overlayModal, 'hide');
      for (var i = 1; i < context.children.length; i++) {
        if (!context.children[i].classList.contains('hide')) {
          window.setTimeout(window.util.addClass, TIME, context.children[i], 'hide');
          var buttons = context.children[i].querySelectorAll('.context-menu__button');
          for (var j = 0; j < buttons.length; j++) {
            if (buttons[j].classList.contains('hide')) {
              window.setTimeout(window.util.removeClass, TIME, buttons[j], 'hide');
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

    var showModal = function (activeChip) {
      var contextMenu = modal.querySelector('.context-menu__' + activeChip.classList.value.slice(-1));
      contextMenu.classList.remove('hide');
      modal.classList.remove('hide');
      var firstButton = contextMenu.querySelector('button:first-child');
      firstButton.focus();
      overlayModal.classList.remove('hide');
      window.setTimeout(window.util.addClass, HOLD, modal, 'modal--show');
      window.setTimeout(window.util.addClass, HOLD, overlayModal, 'modal-overlay--opacity-up');
      hideUnnecessary(contextMenu);
      overlayModal.addEventListener('click', onOverlayClick);
      document.addEventListener('keydown', onOverlayEscPress);
      modal.addEventListener('click', onContextClick);
    };

    var pressedChip = window.util.findAncestor(evt.target, 'chip');
    if (pressedChip) {
      showModal(pressedChip);
    } else if (evt.target.classList.contains('chip')) {
      showModal(evt.target);
    }
  };
})();
