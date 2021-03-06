Game.prototype.keyboardController = function() {
  // Keys that move the player (dud values).
  var moveKeys = { 37:1, 38:1, 39:1, 40:1 };
  // Keys with actions (dud values).
  var keyActions = { 8:1, 27:1, 37:1, 38:1, 39:1, 40:1, 13:1, 32:1, 87:1, 65:1, 83:1, 68:1, 82:1, 67:1 }
  // Tracks movement key presses.
  var timer = {};
  // Prevents player from holding down a button and getting a ton of actions.
  var locked = {};
  // Production: var ANIM_LENGTH = 250;
  var ANIM_LENGTH = 150;

  var game = this;
  document.onkeydown = function(e) {
    var key = e.which;

    if (key in keyActions) {
      // If the key isn't a movement (or the game is in conversation mode).
      if (!(key in moveKeys) || (game.status == "focused")) { 
        // If it's a key we have an action for AND isn't locked.
        if (!(key in locked)) {
          keyPress(key)();
          locked[key] = 1;
        }
        return true; 
      }

      // If no key is pressed, or this isn't our pressed key.
      if ((timer.key == undefined || timer.key != key) && game.status == "free") {
        timer.key = key;
        game.stopWalking();

        // Find the direction we're traveling (to start walking animation)
        var dir = "";
        if (key == 37) dir = DIR.LF;
        if (key == 38) dir = DIR.UP;
        if (key == 39) dir = DIR.RT;
        if (key == 40) dir = DIR.DW;

        // If we're already facing the direction we're traveling.
        if (game.face == dir) {
          // Start walking animation.
          game.startWalking(game.face);
          // Immediately begin walking.
          keyPress(key)();
        } else {
          // Start the animation around when the walking begins.
          if (timer.timeout != undefined) {
            clearTimeout(timer.timeout);
          }
          timer.timeout = setTimeout(function() {game.startWalking(dir);}, ANIM_LENGTH);
        }

        // Start the walking interval.
        if (timer.interval != undefined) {
          clearInterval(timer.interval);
        }
        timer.interval = setInterval(keyPress(key), ANIM_LENGTH);
      }
    }

    e.preventDefault();
  };

  document.onkeyup= function(e) {
    var key = e.which;

    // A (non-movement or conversational) pressed key has been released.
    if (key in locked) {
      delete locked[key];
      return true;
    }

    // If the released key is being tracked.
    if (timer.key == key) {
      // If it's a movement key, trigger a face in the correct direction.
      // Doesn't affect player if already moving -- if a short key press,
      // it will change the direction they face.
      if (key in moveKeys) {
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
        // Stop avatar's walking animation.
        game.stopWalking();
      }
      // If there was an interval set, clear it.
      if (timer.interval != undefined) { 
        clearInterval(timer.interval);
      }
      // If there was a timeout set, clear it.
      if (timer.timeout != undefined) {
        clearTimeout(timer.timeout);
      }
      timer = {};
    }
  };

  window.onblur= function() {
    timer = {};
  };

  function keyPress(key) {
    return function() {
      switch(key) {
        case 37: // left
          if (game.status == "free") game.moveLeft();
          if (game.status == "focused") game.focus.arrowLeft();
          break;

        case 38: // up
          if (game.status == "free") game.moveUp();
          if (game.status == "focused") game.focus.arrowUp(game.prompt);
          break;

        case 39: // right
          if (game.status == "free") game.moveRight();
          if (game.status == "focused") game.focus.arrowRight();
          break;

        case 40: // down
          if (game.status == "free") game.moveDown();
          if (game.status == "focused") game.focus.arrowDown(game.prompt);
          break;




        case 13: // enter
        case 32: // space
          game.interact();
          break;




        case 27: // esc
        case 8: // backspace
          game.backspace();
          break;




        case 87: // w
          if (game.status == "free") game.faceDir(DIR.UP);
          break;

        case 65: // a
          if (game.status == "free") game.faceDir(DIR.LF);
          break;

        case 83: // s
          if (game.status == "free") game.faceDir(DIR.DW);
          break;

        case 68: // d
          if (game.status == "free") game.faceDir(DIR.RT);
          break;




        case 82: // r (reset)
          window.sessionStorage.clear();
          break;




        case 67: // c (become a cat)
          game.player.becomeCat();
          break;

        default: return; // exit this handler for other keys
      }
    };
  }
};