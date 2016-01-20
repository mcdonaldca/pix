$(document).keydown(function(e) {
  switch(e.which) {
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




    case 65: // a
      if (game.status == "free") game.faceLeft();
      break;

    case 87: // w
      if (game.status == "free") game.faceUp();
      break;

    case 68: // d
      if (game.status == "free") game.faceRight();
      break;

    case 83: // s
      if (game.status == "free") game.faceDown();
      break;




    case 82: // r (reset)
      window.sessionStorage.clear()
      break;

    default: return; // exit this handler for other keys
  }
  e.preventDefault(); // prevent the default action (scroll / move caret)
});