/**
  Callbacks for the walkthroughs to pass on their information to the game.
  When a walkthrough calls these functions, the 'this' context is the walkthrough object.
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
      game.displayScreen('newspaper');
      game.screenEndFade();
    } else {
      game.time.setTime(0, 13, 0);
      game.player.wallet.add(200);
      game.startWalkthrough('opening-rundown-apt');
    }
  }
}

/**
  Opening - Rundown Apartment
**/
Game.prototype.openingRundownAptCallback = function(game) {
  return function() {
    game.time.startTime();
    var leChateauFloor1 = game.areas['le-chateau-floor-1'];
    leChateauFloor1.addInteraction(23, 2, new Message(game.name + '\'s Apartment'), [DIR.UP]);
    game.getNPC('holland').show()
                          .updateScheduleStatus(1, /* skipTravel */ true, /* forcePlace */ true);
  }
}

/**
  Anne Intro
  @param acceptedJob If the player accepted the job at the shop.
**/
Game.prototype.anneIntroCallback = function(game) {
  return function(acceptedJob) {
    if (acceptedJob) {
      game.area.space(4, 2).unblock();
      game.player.employ('Ritual Roasters Barista', 12);
    }
  }
}