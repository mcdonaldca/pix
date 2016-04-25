/**
  Callbacks for the screen to pass on their information to the game.
  When a screen calls these callbacks, the "this" context if the screen objects.
  So when setting the screen's callback, we pass the game object so we have access
  to it's context.
**/

/**
  Newspaper
  @param city The city the player selects.
**/
Game.prototype.newspaperCallback = function(game) {
  return function(city) {
    game.city = city;
    game.screenEndFade();
    game.startWalkthrough("opening-hewitt");
  }
}

/**
  CharacterSelect
  @param dataURL   The image for the player's sprite.
  @param hairColor The player's hair color.
  @param skinTone  The player's skin tone.
**/
Game.prototype.characterSelectCallback = function(game) {
  return function(dataURL, hairColor, skinTone) {
    game.player.setBackgroundImage(dataURL);

    // Generate a mom sprite with the same hair and skin color.
    var canvas = document.createElement("canvas");
    $("#game").append(canvas);
    // Scale has to be two for the sprite to be crisp - need to fix.
    var spriteGenerator = new SpriteGenerator(canvas, 2);
    spriteGenerator.setHairColor(hairColor);
    spriteGenerator.setSkinTone(skinTone);
    spriteGenerator.alterSprite("mom");
    var momDataURL = spriteGenerator.getDataURL();

    game.time.begin();
    game.getNPC("mom").avatar.setBackgroundImage(momDataURL);
    game.startWalkthrough("opening-hewitt");
    game.screenEndFade();
  };
}

/**
  Keyboard
  @param name The player's name.
**/
Game.prototype.keyboardCallback = function(game) {
  return function(name) {
    game.name = name;
    game.displayScreen("character-select");
    game.screenEndFade();
  }
}

/**
  Called at the end of the screen's lifecycle, applies fade effect.
**/
Game.prototype.screenEndFade = function() {
  this.gameEl.removeClass("visible");
  var game = this;
  window.setTimeout(function() {
    game.gameEl.addClass("visible");
  }, 250);
  // Lock game mode until new area is totally loaded.
  this.status = "loading";
  window.setTimeout(function() {
    game.setStatus("focused");
  }, 500);
}