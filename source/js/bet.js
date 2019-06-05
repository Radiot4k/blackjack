'use strict';
(function () {
  var TIME_TO_MOVE = 500;
  var HOLD = 20;
  var stack = document.querySelector('.player__stack');
  var overlay = document.querySelector('.overlay');
  var betCircle = document.querySelector('.bet__circle');
  var spanPlayerMoney = document.querySelector('.player__money span');
  var spanBetValue = document.querySelector('.bet__value span');
  var playersHand = document.querySelector('.game__players-hand');

  var moveChipOnBet = function (chipNumber) {
    var piles = stack.querySelectorAll('.chips__pile--' + chipNumber);
    var chip = piles[piles.length - 1].lastChild;
    // chip.style.willChange = 'transform';
    // chip.addEventListener('animationEnd', function () {
    //   chip.style.willChange = 'auto';
    // });
    var pileRect = piles[piles.length - 1].getBoundingClientRect();
    var betCircleRect = betCircle.getBoundingClientRect();
    var x = pileRect.left - betCircleRect.left;
    var y = pileRect.top - betCircleRect.top - piles[piles.length - 1].children.length;
    chip.remove();
    chip.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    betCircle.appendChild(chip);
    playersHand.classList.add('z-index');
    window.setTimeout(window.util.removeAttr, HOLD, chip, 'style');
    window.util.checkPile(stack, chipNumber);
    window.setTimeout(window.util.removeClass, TIME_TO_MOVE + HOLD, playersHand, 'z-index');
    window.util.setTabindex(betCircle);
    if (piles[piles.length - 1].children.length > 0) {
      window.util.setTabindex(piles[piles.length - 1]);
    }
  };

  var moveChipToStack = function (chip) {
    var pileNumber = chip.classList.value.slice(-1);
    var piles = stack.querySelectorAll('.chips__pile--' + pileNumber);
    if (piles.length === 0 || piles[piles.length - 1].children.length === 10) {
      window.util.pastePile(stack, pileNumber);
      piles = stack.querySelectorAll('.chips__pile--' + pileNumber);
    }
    var betCircleRect = betCircle.getBoundingClientRect();
    var pileRect = piles[piles.length - 1].getBoundingClientRect();
    var x = betCircleRect.left - pileRect.left + betCircleRect.width / 2 - pileRect.width / 2;
    var y = betCircleRect.top - pileRect.top + betCircleRect.width / 2 - pileRect.width / 2 - betCircle.children.length;
    chip.remove();
    chip.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    piles[piles.length - 1].appendChild(chip);
    piles[piles.length - 1].classList.add('z-index');
    window.setTimeout(window.util.removeAttr, HOLD, chip, 'style');
    window.setTimeout(window.util.removeClass, TIME_TO_MOVE + HOLD, piles[piles.length - 1], 'z-index');
    if (betCircle.children.length > 0) {
      window.util.setTabindex(betCircle);
    }
    window.util.setTabindex(piles[piles.length - 1]);
  };

  var oneChipBet = function (pressedChip) {
    switch (pressedChip.classList.value.slice(-1)) {
      case '5':
        window.util.player.chips[5] -= 1;
        window.util.player.money -= 100;
        window.util.player.bet += 100;
        break;
      case '4':
        window.util.player.chips[4] -= 1;
        window.util.player.money -= 50;
        window.util.player.bet += 50;
        break;
      case '3':
        window.util.player.chips[3] -= 1;
        window.util.player.money -= 25;
        window.util.player.bet += 25;
        break;
      case '2':
        window.util.player.chips[2] -= 1;
        window.util.player.money -= 10;
        window.util.player.bet += 10;
        break;
      case '1':
        window.util.player.chips[1] -= 1;
        window.util.player.money -= 5;
        window.util.player.bet += 5;
        break;
      case '0':
        window.util.player.chips[0] -= 1;
        window.util.player.money -= 1;
        window.util.player.bet += 1;
        break;
    }
    moveChipOnBet(pressedChip.classList.value.slice(-1));
    spanPlayerMoney.textContent = window.util.player.money;
    spanBetValue.textContent = window.util.player.bet;
  };

  window.onStackClick = function (evt) {
    evt.preventDefault();
    if (window.isLongTouch) {
      return;
    }
    var deal = document.querySelector('#deal');
    var pressedChip = window.util.findAncestor(evt.target, 'chips__pile');
    if (pressedChip) {
      oneChipBet(pressedChip);
      deal.classList.remove('hide');
    } else if (evt.target.classList.contains('chips__pile')) {
      oneChipBet(evt.target);
    }
    deal.addEventListener('click', window.onDealClick);
  };

  var cancelBet = function () {
    var pressedChip = betCircle.lastChild;
    switch (pressedChip.classList[1]) {
      case 'chip--5':
        window.util.player.chips[5] += 1;
        window.util.player.money += 100;
        window.util.player.bet -= 100;
        break;
      case 'chip--4':
        window.util.player.chips[4] += 1;
        window.util.player.money += 50;
        window.util.player.bet -= 50;
        break;
      case 'chip--3':
        window.util.player.chips[3] += 1;
        window.util.player.money += 25;
        window.util.player.bet -= 25;
        break;
      case 'chip--2':
        window.util.player.chips[2] += 1;
        window.util.player.money += 10;
        window.util.player.bet -= 10;
        break;
      case 'chip--1':
        window.util.player.chips[1] += 1;
        window.util.player.money += 5;
        window.util.player.bet -= 5;
        break;
      case 'chip--0':
        window.util.player.chips[0] += 1;
        window.util.player.money += 1;
        window.util.player.bet -= 1;
        break;
    }
    moveChipToStack(pressedChip);
    spanPlayerMoney.textContent = window.util.player.money;
    spanBetValue.textContent = window.util.player.bet;
  };

  window.onBetCircleClick = function (evt) {
    evt.preventDefault();
    var pressedChip = window.util.findAncestor(evt.target, 'chip');
    if (pressedChip || evt.target.classList.contains('chip')) {
      if (betCircle.children.length === 1) {
        deal.classList.add('hide');
      }
      cancelBet();
    }
  };

  var onBetCircleEnterPress = function (evt) {
    window.util.isEnterEvent(evt, window.onBetCircleClick);
  };

  betCircle.addEventListener('click', onBetCircleClick);
  betCircle.addEventListener('keydown', onBetCircleEnterPress);
})();
