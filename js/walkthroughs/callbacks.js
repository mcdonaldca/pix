/**
  Callbacks for the walkthroughs to pass on their information to the game.
  When a walkthrough calls these functions, the "this" context is the walkthrough object.
  So when setting the walkthrough's callback, we pass the game object so we have access
  to its context.
**/

/**
  Opening - Hewitt
  @param count The number of times the callback has been called.
**/
Game.prototype.openingHewittCallback = function(game) {
  return function(count) {
    if (count == 1) {
      game.displayScreen("newspaper");
      game.screenEndFade();
    } else {
      game.time.setTime(0, 1, 8, 0, "AM");
      game.player.wallet.add(200);
      game.startWalkthrough("opening-rundown-apt");
    }
  }
}

/**
  Opening - Rundown Apartment
**/
Game.prototype.openingRundownAptCallback = function(game) {
  return function() {
    game.time.startTime();
    var apt2 = game.areas["apt-2"];
    apt2.addInteraction(34, 4, new Message(game.name + "'s Apartment"), ["up"]);
  }
}

/**
  Anne Intro
  @param acceptedJob If the player accepted the job at the shop.
**/
Game.prototype.anneIntroCallback = function(game) {
  return function(acceptedJob) {
    if (acceptedJob) {
      game.area.space(3, 2).setBlocked([]);
    }
  }
}