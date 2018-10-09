'use strict';
(function () {
  var TIME_TO_MOVE = 400;
  var HOLD = 10;
  var stack = document.querySelector('.player__stack');
  var moveChipOnBet = function (chipNumber) {
    var piles = stack.querySelectorAll('.chips__pile--' + chipNumber);
    var betCircle = document.querySelector('.bet__circle');
    var betCircleRect = betCircle.getBoundingClientRect();
    var chip = piles[piles.length - 1].lastChild;
    var chipRect = chip.getBoundingClientRect();

    chip.remove();
    var x = chipRect.left - betCircleRect.left;
    var y =chipRect.top - betCircleRect.top;
    var deg = window.util.getRandomNumber(-30, 30);
    chip.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(' + deg + 'deg)';
    betCircle.appendChild(chip);
    var val = 'translate(0px, 0px) rotate(' + deg + 'deg)';
    window.setTimeout(window.util.setStyle, HOLD, chip, 'transform', val);
    //window.sortPiles(betCircle);
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
    var spanPlayerMoney = document.querySelector('.player__money span');
    spanPlayerMoney.textContent = window.util.player.money;
    var spanBetValue = document.querySelector('.bet__value span');
    spanBetValue.textContent = window.util.player.bet;
  };

  window.onStackClick = function (evt) {
    var pressedChip = window.util.findAncestor(evt.target, 'chip');
    if (pressedChip) {
      oneChipBet(evt, pressedChip);
    }

    window.elements.deal.addEventListener('click', onDealClick);
  };
})();
