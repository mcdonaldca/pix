Game.prototype.keyboardController = function() {
  var moveKeys = [37, 38, 39 , 40];
  var keyActions = {
    37: keyPress(37),  // left
    38: keyPress(38),  // up
    39: keyPress(39),  // right
    40: keyPress(40),  // down
    13: keyPress(13),  // enter
    32: keyPress(32),  // space
    87: keyPress(87),  // w
    65: keyPress(65),  // a
    83: keyPress(83),  // s
    68: keyPress(68),  // d
    82: keyPress(82)   // r
  }
  var timer = {};
  var repeat = 150;

  document.onkeydown = function(e) {
    var key = e.which;
    if ($.inArray(key, moveKeys) == -1 || game.status == "convo") { 
      if (key in keyActions) {
        keyActions[key]();
      }
      return true; 
    }

    if (timer.key == undefined || timer.key != key) {
      if (game.face == "lf" && key == 37 ||
          game.face == "up" && key == 38 ||
          game.face == "rt" && key == 39 ||
          game.face == "dw" && key == 40) {
        keyActions[key]();
      }

      
      if (timer.key != key) {
        clearInterval(timer.interval);
      }
      timer.key = key;
      timer.interval = setInterval(keyActions[key], repeat);
    }

    e.preventDefault();
  };

  document.onkeyup= function(e) {
    var key = e.which;
    if (timer.key == key) {
      if ($.inArray(key, moveKeys) != -1) {
        switch(key) {
          case 38: // up
            keyPress(87)();
            break;

          case 37: // left
            keyPress(65)();
            break;

          case 40: // down
            keyPress(83)();
            break;

          case 39: // right
            keyPress(68)();
            break;
        }
      }
      if (timer.interval != undefined) { 
        clearInterval(timer.interval); 
      }
      timer = {};
    }
  };

  window.onblur= function() {
    timer = {};
  };

  var game = this;
  function keyPress(key) {
    return function() {
      switch(key) {
        case 37: // left
          if (game.status == "free") game.moveLeft();
          break;

        case 38: // up
          if (game.status == "free") game.moveUp();
          if (game.status == "convo") game.focus.arrowUp();
          break;

        case 39: // right
          if (game.status == "free") game.moveRight();
          break;

        case 40: // down
          if (game.status == "free") game.moveDown();
          if (game.status == "convo") game.focus.arrowDown();
          break;




        case 13: // enter
        case 32: // space
          game.interact();
          break;




        case 87: // w
          if (game.status == "free") game.faceDir("up");
          break;

        case 65: // a
          if (game.status == "free") game.faceDir("lf");
          break;

        case 83: // s
          if (game.status == "free") game.faceDir("dw");
          break;

        case 68: // d
          if (game.status == "free") game.faceDir("rt");
          break;




        case 82: // r (reset)
          window.sessionStorage.clear()
          break;

        default: return; // exit this handler for other keys
      }
    };
  }
};