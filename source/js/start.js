'use strict';

(function () {
  var TIME = 300;
  var HOLD = 10;
  var pageHeader = document.querySelector('.page-header');
  var startGameSection = pageHeader.querySelector('.start-game');
  var buttons = startGameSection.querySelectorAll('.button--new-game, .button--continue');
  var newGameButton = buttons[0];
  var continueButton = buttons[1];
  var settings = pageHeader.querySelector('.settings');
  var settingsForm = settings.querySelector('.settings__form');
  var gameSettings = settingsForm.querySelectorAll('#player-name, #deposit');
  var table = document.querySelector('.table');
  var chipsRack = table.querySelector('.table__chip-rack');
  var stack = table.querySelector('.player__stack');
  var playerMoney = table.querySelector('.player__money span');
  var isStorageSupport = true;
  var storPlayer = {};
  var method = {};

  try {
    storPlayer.name = localStorage.getItem('BJplayerName');
    storPlayer.money = localStorage.getItem('BJplayerMoney');
  } catch (err) {
    isStorageSupport = false;
  }

  if (!storPlayer.name || !storPlayer.money) {
    continueButton.classList.add('hide');
  } else {
    continueButton.textContent = 'Continue as ' + storPlayer.name;
    gameSettings[0].value = storPlayer.name;
    gameSettings[1].value = storPlayer.money;
  }

  var renderChipsInStack = function () {
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
           chip.style.transform = 'translate(0px, ' + tr * -1 + 'px) rotate(' + window.util.getRandomNumber(-30, 30) + 'deg)';
           pile.appendChild(chip);
           tr++;
         }
       }
     }
     window.sortPiles(stack);
  };

  var formValidation = function () {
    var DEPOSIT_MAX = 2000;
    var DEPOSIT_MIN = 1;
    if (gameSettings[1].value > DEPOSIT_MAX) {
      return 'Maximum $1000!';
    }
    if (gameSettings[1].value < DEPOSIT_MIN) {
      return 'Minimum $1!'
    }
    return '';
  };

  var onStartGamePress = function (evt) {
    evt.preventDefault();
    pageHeader.style.opacity = '0';
    window.setTimeout(window.util.addClass, TIME, pageHeader, 'hide');
    table.style.opacity = '0';
    window.setTimeout(window.util.removeClass, TIME, table, 'hide');
    window.setTimeout(window.util.setStyle, TIME + HOLD, table, 'opacity', '1');
    if(isStorageSupport) {
      localStorage.setItem('BJplayerName', gameSettings[0].value);
      localStorage.setItem('BJplayerMoney', gameSettings[1].value);
    }
    window.util.player.name = gameSettings[0].value;
    window.util.player.money = gameSettings[1].value;
    window.util.dealer.cards = [];
    window.util.player.cards = [];
    var numOfDecks = settingsForm.querySelector('.form__radio:checked');
    chipsRack.textContent = 'Hello, ' + window.util.player.name + '!';
    playerMoney.textContent = window.util.player.money;
    window.newDeck(numOfDecks.value);
    window.setTimeout(renderChipsInStack, TIME);
    stack.addEventListener('click', window.onStackClick);
    stack.addEventListener('contextmenu', window.onStackContextClick);
  };

  var onNewGameButtonPress = function () {
    startGameSection.style.opacity = '0';
    window.setTimeout(window.util.addClass, TIME, startGameSection, 'hide');
    settings.style.opacity = '0';
    window.setTimeout(window.util.removeClass, TIME, settings, 'hide');
    window.setTimeout(window.util.setStyle, TIME + HOLD, settings, 'opacity', '1');
    settingsForm.addEventListener('submit', onStartGamePress);
    gameSettings[1].addEventListener('input', function () {
      gameSettings[1].setCustomValidity(formValidation());
    });
  };

  newGameButton.addEventListener('click', onNewGameButtonPress);
  continueButton.addEventListener('click', onStartGamePress);
})();
