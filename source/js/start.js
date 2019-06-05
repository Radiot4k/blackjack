'use strict';

(function () {
  var TIME = 400;
  var HOLD = 10;
  var INIT_DEPOSIT = 500;
  var pageHeader = document.querySelector('.page-header');
  var title = pageHeader.querySelector('.page-header__title');
  var startGameSection = pageHeader.querySelector('.start-game');
  var buttons = startGameSection.querySelectorAll('.button--new-game, .button--continue');
  var newGameButton = buttons[0];
  var continueButton = buttons[1];
  var settings = pageHeader.querySelector('.settings');
  var settingsForm = settings.querySelector('.settings__form');
  var gameSettings = settingsForm.querySelectorAll('#player-name, #deposit');
  var gameNumOfDecks = settingsForm.querySelectorAll('.form__radio');
  var table = document.querySelector('.table');
  var chipsRack = table.querySelector('.table__chip-rack');
  var stack = table.querySelector('.player__stack');
  var playerMoney = table.querySelector('.player__money span');
  var isStorageSupport = true;
  var storPlayer = {};

  try {
    storPlayer.name = localStorage.getItem('BJplayerName');
    storPlayer.money = localStorage.getItem('BJplayerMoney');
    storPlayer.decks = localStorage.getItem('BJplayeDecks');
  } catch (err) {
    isStorageSupport = false;
  }

  if (!storPlayer.name || !storPlayer.money || !storPlayer.decks) {
    continueButton.classList.add('hide');
  } else {
    continueButton.textContent = 'Continue as ' + storPlayer.name;
    gameSettings[0].value = storPlayer.name;
    gameSettings[1].value = storPlayer.money;
    for (var a = 0; a < gameNumOfDecks.length; a++) {
      if (gameNumOfDecks[a].value === storPlayer.decks) {
        gameNumOfDecks[a].setAttribute('checked', 'checked');
        break;
      }
    }
  }

  var renderChipsInStack = function () {
    var mod = window.util.player.money;
    while (window.util.player.chips[0] < 5 && mod > 0) {
      window.util.player.chips[0] += 1;
      mod -= 1;
    }
    while (window.util.player.chips[1] < 5 && mod >= 5) {
      window.util.player.chips[1] += 1;
      mod -= 5;
    }
    while (window.util.player.chips[2] < 5 && mod >= 10) {
      window.util.player.chips[2] += 1;
      mod -= 10;
    }
    while (window.util.player.chips[3] < 5 && mod >= 25) {
      window.util.player.chips[3] += 1;
      mod -= 25;
    }
    while (window.util.player.chips[4] < 5 && mod >= 50) {
      window.util.player.chips[4] += 1;
      mod -= 50;
    }
    while (window.util.player.chips[5] < 5 && mod >= 100) {
      window.util.player.chips[5] += 1;
      mod -= 100;
    }
    window.util.player.chips[5] += Math.floor(mod / 100);
    mod = mod % 100;
    window.util.player.chips[4] += Math.floor(mod / 50);
    mod = mod % 50;
    window.util.player.chips[3] += Math.floor(mod / 25);
    mod = mod % 25;
    window.util.player.chips[2] += Math.floor(mod / 10);
    mod = mod % 10;
    window.util.player.chips[1] += Math.floor(mod / 5);
    mod = mod % 5;
    window.util.player.chips[0] += mod;

    for (var i = 0; i < window.util.player.chips.length; i++) {
      if (window.util.player.chips[i] > 0) {
        for (var j = 0; j < window.util.player.chips[i]; j++) {
          if (j % 10 === 0) {
            var pile = window.util.createChipsPile(i);
            stack.appendChild(pile);
          }
          var chip = window.util.createChip(i);;
          pile.appendChild(chip);
          window.util.setTabindex(pile);
         }
       }
     }
  };

  var onStartGamePress = function (evt) {
    evt.preventDefault();
    var body = document.querySelector('.body');
    var numOfDecks = settingsForm.querySelector('.form__radio:checked');
    pageHeader.classList.remove('opacity-1');
    window.setTimeout(window.util.addClass, TIME, pageHeader, 'hide');
    window.setTimeout(window.util.addClass, TIME, body, 'body--brown');
    window.setTimeout(window.util.removeClass, TIME, table, 'hide');
    if(isStorageSupport) {
      localStorage.setItem('BJplayerName', gameSettings[0].value);
      localStorage.setItem('BJplayerMoney', gameSettings[1].value);
      localStorage.setItem('BJplayeDecks', numOfDecks.value);
    }
    window.util.player.name = gameSettings[0].value;
    window.util.player.money = gameSettings[1].value;
    window.util.dealer.cards = [];
    window.util.player.cards = [];
    chipsRack.textContent = 'Welcome, ' + window.util.player.name + '!';
    playerMoney.textContent = window.util.player.money;
    window.setTimeout(window.newDeck, TIME, numOfDecks.value);
    window.setTimeout(renderChipsInStack, TIME);
    var timeoutID;
    window.onStackTap = function (evt) {
      evt.preventDefault();
      timeoutID = window.setTimeout(window.onStackContextClick, 700, evt);
    };
    window.onStackTapEnd = function (evt) {
      evt.preventDefault();
      window.clearTimeout(timeoutID);
      window.onStackClick(evt);
    };
    var onStackEnterPress = function (evt) {
      window.util.isEnterEvent(evt, window.onStackClick, window.onStackContextClick);
    };
    var stackClickEvent = function () {
      stack.addEventListener('click', window.onStackClick);
      stack.addEventListener('contextmenu', window.onStackContextClick);
      stack.addEventListener('touchstart', window.onStackTap);
      stack.addEventListener('touchend', window.onStackTapEnd);
      stack.addEventListener('keydown', onStackEnterPress);
    };
    window.setTimeout(stackClickEvent, 4500);
  };

  var onNewGameButtonPress = function () {
    startGameSection.classList.remove('opacity-1');
    window.setTimeout(window.util.addClass, TIME, startGameSection, 'hide');
    window.setTimeout(window.util.removeClass, TIME, settings, 'hide');
    window.setTimeout(window.util.addClass, TIME + HOLD, settings, 'opacity-1');
    title.classList.add('page-header__title--opacity');
    window.setTimeout(window.util.removeClass, TIME * 2, title, 'page-header__title--opacity');
    gameSettings[1].value = INIT_DEPOSIT;
    settingsForm.addEventListener('submit', onStartGamePress);
  };

  newGameButton.addEventListener('click', onNewGameButtonPress);
  continueButton.addEventListener('click', onStartGamePress);
})();
