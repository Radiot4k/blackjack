'use strict';

(function () {
  var TIME = 600;
  var HOLD = 10;
  var ROTATE_DEG = 180;

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
    var TIME_TO_MOVE = 400;
    var stack = document.querySelector('.player__stack');
    var chipRack = document.querySelector('.table__chip-rack');
    var chipRackRect = chipRack.getBoundingClientRect();
    var newChips = [];
    var i;
    var toSplit = false;
    var toSplitNew = false;
    var t = 2;

    modalText.textContent = 'Exchanging chips...';
    modalText.style.opacity = '0';
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
    var rulesRect = document.querySelector('.rules').getBoundingClientRect();
    for (i = 0; i < chipsToExchange.length; i++) {
      var coord = window.util.getCoordinatesToMove(chipsToExchange[i], rulesRect);
      var deg = window.util.getRandomNumber(-30, 30);
      chipsToExchange[i].style.transform = 'translate(' + coord.x + 'px, ' + (coord.y - i) + 'px) rotate(' + deg + 'deg)';
      window.setTimeout(window.util.removeElement, TIME_TO_MOVE * (t + 1), chipsToExchange[i]);
    }
    if (toSplit) {
      window.setTimeout(window.util.splitChips, TIME_TO_MOVE * 2, chipsToExchange, -1);
      window.setTimeout(window.util.splitChips, TIME_TO_MOVE * 4, chipsToExchange, 1);
    }

    var moveToDealer = function (chips) {
      for (var i = 0; i < chips.length; i++) {
        coord = window.util.getCoordinatesToMove(chips[i], chipRackRect);
        chips[i].style.transform = 'translate(' + coord.x + 'px, ' + (coord.y - chips[i].getBoundingClientRect().width) + 'px) rotate(' + ROTATE_DEG + 'deg)';
      }
    };
    window.setTimeout(moveToDealer, TIME_TO_MOVE * t, chipsToExchange);
    window.setTimeout(window.util.checkPile, TIME_TO_MOVE * (t + 2), stack, PILE_REM);

    for (i = 0; i < AMOUNT_PLUS; i++) {
      newChips.splice(0, 0, window.util.createChip(PILE_ADD));
    }
    var setTransform = function (elem, i) {
      coord = window.util.getCoordinatesToMove(elem, rulesRect);
      deg = window.util.getRandomNumber(-30, 30);
      elem.style.transform = 'translate(' + coord.x + 'px, ' + (coord.y - i) + 'px) rotate(' + deg + 'deg)';
    };
    for (i = 0; i < newChips.length; i++) {
      window.setTimeout(window.util.addChipsInPile, TIME_TO_MOVE * (t + 2), newChips[i], stack, newChips[i].classList.value.slice(-1), chipRack, ROTATE_DEG);
      window.setTimeout(setTransform, TIME_TO_MOVE * (t + 2), newChips[i], i);
    }
    if (toSplitNew) {
      window.setTimeout(window.util.splitChips, TIME_TO_MOVE * (t + 4), newChips, -1);
      window.setTimeout(window.util.splitChips, TIME_TO_MOVE * (t + 6), newChips, 1);
      t = t + 8;
    } else {
      t = t + 4;
    }
    var moveToStack = function (chips) {
      var q = 0;
      var chipsLength = chips.length;
      var parentElementChildrenLength = 0;
      for (i = chips.length - 1; i >= 0; i--) {
        if (parentElementChildrenLength !== chips[i].parentElement.children.length) {
          parentElementChildrenLength = chips[i].parentElement.children.length;
          chipsLength -= q;
        }
        q++;
        var y = (chips[i].parentElement.children.length - chipsLength) * -1 - i;
        deg = window.util.getRandomNumber(-30, 30);
        chips[i].style.transform = 'translate(0px, ' + y + 'px) rotate(' + deg + 'deg)';
      }
      window.sortPiles(stack);
    };
    window.setTimeout(moveToStack, TIME_TO_MOVE * t, newChips);
    window.setTimeout(window.util.setStyle, HOLD, modalText, 'opacity', '1');
    window.setTimeout(window.util.setStyle, TIME_TO_MOVE * t, modalText, 'opacity', '0');
    window.setTimeout(window.util.addClass, TIME_TO_MOVE * t + TIME, modalText, 'hide');

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
      modal.removeAttribute('style');
      window.setTimeout(window.util.addClass, TIME, modal, 'hide');
      overlay.style.opacity = '0';
      window.setTimeout(window.util.addClass, TIME, overlay, 'hide');
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

    var pressedChip = window.util.findAncestor(evt.target, 'chip');

    if (pressedChip) {
      var contextMenu = modal.querySelector('.context-menu__' + pressedChip.classList.value.slice(-1));
      contextMenu.classList.remove('hide');
      modal.classList.remove('hide');
      window.setTimeout(window.util.setStyle, HOLD, modal, 'transform', 'translateY(0)');
      overlay.style.opacity = '0';
      overlay.classList.remove('hide');
      window.setTimeout(window.util.setStyle, HOLD, overlay, 'opacity', '1');
      hideUnnecessary(contextMenu);
      overlay.addEventListener('click', onOverlayClick);
      document.addEventListener('keydown', onOverlayEscPress);
      modal.addEventListener('click', onContextClick);
    }
  };
})();
