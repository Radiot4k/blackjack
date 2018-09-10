'use strict';

(function () {
  var header = document.querySelector('.page-header');
  var settingsForm = header.querySelector('#settings-form');
  var deposit = settingsForm.querySelector('#deposit');
  var table = document.querySelector('.table');
  var colValue = table.querySelectorAll('.info__col-value');
  var stack = document.querySelector('#player-stack');

  var formValidation = function () {
    var DEPOSIT_MAX = 1000;
    if (deposit > DEPOSIT_MAX) {
      return 'Maximum $1000!';
    }
    return '';
  };

  window.renderChipsInStack = function () {
    var mod;
    window.util.player.chips[5] = Math.floor(window.util.player.money / 100);
    mod = window.util.player.money % 100;
    window.util.player.chips[4] = Math.floor(mod / 50);
    mod = mod % 50;
    window.util.player.chips[3] = Math.floor(mod / 25);
    mod = mod % 25;
    window.util.player.chips[2] = Math.floor(mod / 10);
    mod = mod % 10;
    window.util.player.chips[1] = Math.floor(mod / 5);
    mod = mod % 5;
    window.util.player.chips[0] = mod;

    for (var i = 0; i < window.util.player.chips.length; i++) {
      if (window.util.player.chips[i] > 0) {
        var tr = 0;
        for (var j = 0; j < window.util.player.chips[i]; j++) {
          if (j % 10 === 0) {
            var pile = window.util.createChipsPile(i);
            tr = 0;
            stack.appendChild(pile);
          }
          var chip = window.util.createChip(i);
          chip.setAttribute('style', 'transform: translate(' + window.util.getRandomNumber(-1, 1) + 'px, ' + tr * -1 + 'px) rotate(' + window.util.getRandomNumber(-30, 30) + 'deg)');
          pile.appendChild(chip);
          tr++;
        }
      }
    }
    window.sortPiles(stack);
  };

  window.sortPiles = function (elem) {
    var pilesAll = elem.querySelectorAll('.chips__pile');
    var row = 0;
    var line = -1;
    for (var i = 0; i < pilesAll.length; i++) {
      if (i % 3 === 0) {
        row = 0;
        line++;
      }
      var x = row * 34;
      var y = line * 42;
      pilesAll[i].style.transform = 'translate(' + x + 'px, ' + y +'px)';
      row++;
    }
    if (line > 0) {
      elem.style.width = '102px';
    } else {
      elem.style.width = (row) * 34 + 'px';
    }
    elem.style.height = (line + 1) * 34 + 'px';
  };

  var onStartGamePress = function (evt) {
    evt.preventDefault();
    var numOfDecks = settingsForm.querySelector('.form__radio:checked');
    window.util.player.money = parseInt(deposit.value, 10);
    var divPlayerMoney = table.querySelector('.player__money span');
    divPlayerMoney.textContent = window.util.player.money;
    header.classList.add('hide');
    table.classList.remove('hide');
    colValue[0].textContent = '$' + deposit.value;
    colValue[1].textContent = '$0';
    colValue[2].textContent = numOfDecks.value;
    window.util.dealer.cards = [];
    window.util.player.cards = [];
    window.newDeck(numOfDecks);
    renderChipsInStack();
    stack.addEventListener('click', window.onStackClick);
    stack.addEventListener('contextmenu', window.onStackContextClick);
    //dealing();
  };

  deposit.addEventListener('input', function () {
    deposit.setCustomValidity(formValidation());
  });

  settingsForm.addEventListener('submit', onStartGamePress);
})();
