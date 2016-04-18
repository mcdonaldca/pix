/**
  Callbacks for the walkthroughs to pass on their information to the game.
  When a walkthrough calls these functions, the "this" context is the walkthrough object.
  So when setting the walkthrough's callback, we pass the game object so we have access
  to its context.
**/

/**
  Hewitt
  @param count The number of times the callback has been called.
**/
Game.prototype.hewittCallback = function(game) {
  return function(count) {
    if (count == 1) {
      game.displayScreen("newspaper");
      game.screenEndFade();
    } else {
      game.time.setTime(0, 1, 8, 0, "AM");
      game.startWalkthrough("rundown-apt1");
    }
  }
}

/**
  Rundown Apartment (1)
**/
Game.prototype.rundownApt1Callback = function(game) {
  return function() {
    game.time.startTime();
    var apt2 = game.areas["apt-2"];
    apt2.addInteraction(34, 4, new Message(game.name + "'s Apartment"), ["up"]);
  }
}