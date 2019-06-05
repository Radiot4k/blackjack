'use strict';

(function () {
   window.sortPiles = function (elem) {
     var pilesAll = elem.querySelectorAll('.chips__pile');
     if (pilesAll.length === 0) {
       return ;
     }
     var width = pilesAll[0].getBoundingClientRect().width;
     var row = 0;
     var line = -1;
     for (var i = 0; i < pilesAll.length; i++) {
       if (i % 3 === 0) {
         row = 0;
         line++;
       }
       var x = row * (width + 2);
       var y = line * (width + 10);
       pilesAll[i].style.transform = 'translate(' + x + 'px, ' + y +'px)';
       row++;
     }
     elem.style.height = (line + 1) * (width + 10) - 10 + 'px';
   };
})();
