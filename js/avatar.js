/**
  The Avatar object handles display changes for any sprite.
  @param isPlayer Boolean, if avatar is the player's avatar.
  @param name     (Optional) The name of the NPC.
  @param sprite   (Optional) The url for the sprite image.
  @param shadow   (Optional) The url for the shadow, if any.
**/
function Avatar(isPlayer, name, sprite, shadow) {
  this.class = 'Avatar';

  this.isPlayer = isPlayer || false;
  this.name = name || 'no-name'; // Name of NPC.
  this.img = sprite || 'characters/test-char';  // The sprite image for the character.
  this.shadow = shadow;  // The type of shadow for the character (if any).

  // The following values are set in Avatar.build
  this.avatarEl = undefined;
  this.reactionEl = undefined;
  this.spriteEl = undefined;
  this.build();

  // Sprite constant values.
  this.SPRITE_WIDTH = 23;
  this.SPRITE_HEIGHT = 29;
  this.X_OFFSET = 3;
  this.Y_OFFSET = 12;

  this.REACTION_DURATIONS = {
    'happy': 1000,
    'love': 1000,
    'sleep': 4000,
    'surprise': 1000,
    'wat': 2000,
  }

  this.x = 0;
  this.y = 0;
  this.face = DIR.DW;
};



/**
  Builds the elements to display an avatar in the game.
**/
Avatar.prototype.build = function() {
  /* Sample HTML
     <div class="npc npc-margaret">
       <div class="avatar"></div>
       <div class="shadow"></div>
     </div>
  */
  var div = document.createElement('div');
  if (this.isPlayer) {
    $(div).attr('id', 'avatar');
  } else {
    $(div).addClass('npc npc-' + this.name);
  }

  var reaction = document.createElement('div');
  $(reaction).addClass('reaction');
  if (this.isPlayer) $(reaction).attr('id', 'reaction');
  $(div).append(reaction);

  var sprite = document.createElement('div');
  $(sprite).addClass('sprite')
           .css('background-image', 'url(img/' + this.img + '.svg)');
  if (this.isPlayer) $(sprite).attr('id', 'sprite');
  $(div).append(sprite);

  // Some Avatars don't have shadows.
  if (this.shadow != undefined) {
    var shadow = document.createElement('div');
    $(shadow).addClass('shadow')
             .css('background-image', 'url(img/characters/' + this.shadow + '.svg)');
    $(div).append(shadow);
  }

  this.avatarEl = $(div);
  this.reactionEl = $(reaction);
  this.spriteEl = $(sprite);
};



/**
  Shows the entire avatar.
  @returns The avatar object, for chaining calls.
**/
Avatar.prototype.show = function() {
  this.avatarEl.show();
  return this;
};



/**
  Hides the entire avatar.
  @returns The avatar object, for chaining calls.
**/
Avatar.prototype.hide = function() {
  this.avatarEl.hide();
  return this;
};



/**
  Called to have the avatar perform a reaction.
  @param reaction The reaction to display.
  @returns        The avatar object, for chaining calls.
**/
Avatar.prototype.react = function(reaction) {
  if (this.REACTION_DURATIONS[reaction]) {
    var reactionClass = 'react-' + reaction;
    var reactionDuration = this.REACTION_DURATIONS[reaction];

    this.reactionEl.addClass(reactionClass);
    var avatar = this;
    setTimeout(function() {
      avatar.reactionEl.removeClass(reactionClass);
    }, reactionDuration);
  }
  return this;
};



/** 
  Methods to call `react`
  @returns The avatar object, for chaining calls.
**/
Avatar.prototype.reactHappy = function() { return this.react('happy'); }
Avatar.prototype.reactLove = function() { return this.react('love'); }
Avatar.prototype.reactSleep = function() { return this.react('sleep'); }
Avatar.prototype.reactSurprise = function() { return this.react('surprise'); }
Avatar.prototype.reactWat = function() { return this.react('wat'); }



/**
  Calls setPosition with new x value.
  @param x The left offset in blocks.
  @returns The avatar object, for chaining calls.
**/
Avatar.prototype.setLeft = function(x) {
  return this.setPosition(x, this.y);
};



/**
  Calls setPosition with new y value.
  @param y The bottom offset in blocks.
  @returns The avatar object, for chaining calls.
**/
Avatar.prototype.setBottom = function(y) {
  return this.setPosition(this.x, y);
};



/**
  Method that routes calls to set position.
  @param dir The direction the avatar is moving (one block).
  @returns   The avatar object, for chaining calls.
**/
Avatar.prototype.moveDir = function(dir) {
  var newX = this.x;
  var newY = this.y;

  switch(dir) {
    case DIR.LF:
      newX -= 1;
      break;

    case DIR.UP:
      newY -= 1;
      break;

    case DIR.RT:
      newX += 1;
      break;

    case DIR.DW:
      newY += 1;
      break;

    default:
      break;
  }

  return this.setPosition(newX, newY);
};



/**
  Sets the transform value + z-index for the avatar.
  @param x              The left offset in blocks.
  @param y              The bottom offset in blocks.
  @param arrivingInArea If the avatar is arriving in the area.
  @param prevLocation   The avatar's previous area.
  @returns              The avatar object, for chaining calls.
**/
Avatar.prototype.setPosition = function(x, y, arrivingInArea, prevLocation) {
  if (this.currentLocation) {
    // If we're arriving in a new area, we need to unblock our previous location.
    // Also need to check if prevLocation is present (when game initializes).
    var unoccupyArea = arrivingInArea && prevLocation ? prevLocation : this.currentLocation;
    game.world.getArea(unoccupyArea).space(this.x, this.y).setUnoccupied();
    game.world.getArea(this.currentLocation).space(x, y).setOccupied(this);
  }
  this.x = x;
  this.y = y;

  var translateX = ((x * BLOCK - this.X_OFFSET) * MULT).toString() + 'px';
  var translateY = ((y * BLOCK - this.Y_OFFSET) * MULT).toString() + 'px';

  this.avatarEl.css('transform', 'translate(' + translateX + ', ' + translateY + ')');

  var zVal = (y + 1) * 10;
  if (this.isPlayer) zVal++;

  this.avatarEl.css('z-index', zVal);
  this.reactionEl.css('z-index', zVal + 1);

  return this;
};



/**
  Methods to call `face`.
  @returns The avatar object, for chaining calls.
**/
Avatar.prototype.faceLeft = function() { return this.faceDir(DIR.LF); };
Avatar.prototype.faceUp = function() { return this.faceDir(DIR.UP); };
Avatar.prototype.faceRight = function() { return this.faceDir(DIR.RT); };
Avatar.prototype.faceDown = function() { return this.faceDir(DIR.DW); };



/**
  Adjusts sprite to display facing a specific direction.
  @param dir The direction to face.
  @returns   The avatar object, for chaining calls.
**/
Avatar.prototype.faceDir = function(dir) {
  this.face = dir;

  var bgPos = 0;
  switch(dir) {
    case DIR.LF:
      bgPos = -3;
      break;

    case DIR.UP:
      bgPos = -2;
      break;

    case DIR.RT:
      bgPos = -1;
      break;

    // Default `bgPos` is down.
    case DIR.DW:
    default:
      break;
  }

  this.spriteEl.css('background-position', '0 ' + (bgPos * this.SPRITE_HEIGHT * MULT).toString() + 'px');

  return this;
};



/**
  Called to face an opposite direction.
  @param dir The original direction.
*/
Avatar.prototype.faceOppositeDir = function(dir) {
  var oppDir = DIR.UP;

  switch(dir) {
    case DIR.LF:
      oppDir = DIR.RT;
      break;

    case DIR.UP:
      oppDir = DIR.DW;
      break;

    case DIR.RT:
      oppDir = DIR.LF;
      break;

    // Default dir is opposite of down.
    case DIR.DW:
    default:
      break;
  }

  this.faceDir(oppDir);
};



/**
  Called to begining sprite's walking animation.
  @param dir The direction to walk in.
  @returns   The avatar object, for chaining calls.
**/
Avatar.prototype.walk = function(dir) {
  switch(dir) {
    case DIR.LF:
      this.spriteEl.addClass('walk-left');
      break;

    case DIR.UP:
      this.spriteEl.addClass('walk-up');
      break;
      
    case DIR.RT:
      this.spriteEl.addClass('walk-right');
      break;
      
    case DIR.DW:
      this.spriteEl.addClass('walk-down');
      break;

    default:
      break;
  }

  return this;
};



/**
  Called to stop walking animation.
  @returns The avatar object, for chaining calls.
**/
Avatar.prototype.stopWalking = function() {
  this.spriteEl.removeClass();
  this.spriteEl.addClass('sprite');
  return this;
};



/**
  Sets the background image for the avatar's sprite.
  @param url The url (or dataURL) for the avatar.
  @returns   The avatar object, for chaining calls.
**/
Avatar.prototype.setBackgroundImage = function(url) {
  this.spriteEl.css('background-image', 'url(' + url + ')');
  return this;
};



/** 
  Getter for Avatar.avatarEL
  @returns The parent element of the avatar to add and remove from the game.
**/
Avatar.prototype.getEl = function() {
  return this.avatarEl;
};