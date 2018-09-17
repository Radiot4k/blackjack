'use strict';
(function () {
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
    var spanPlayerMoney = table.querySelector('.player__money span');
    spanPlayerMoney.textContent = window.util.player.money;
    var spanBetValue = table.querySelector('.bet__value span');
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
