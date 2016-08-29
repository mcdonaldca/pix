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
}

/**
  Builds the elements to display an avatar in the game.
**/
Avatar.prototype.build = function() {
  if (this.isPlayer) {
    this.avatarEl = $('#avatar');
    this.reactionEl = $('#reaction');
    this.spriteEl = $('#sprite');
  } else {
    /* Sample HTML
       <div class="npc npc-liam">
         <div class="avatar"></div>
         <div class="shadow"></div>
       </div>
    */
    var div = document.createElement('div');
    $(div).addClass('npc npc-' + this.name);

    var reaction = document.createElement('div');
    $(reaction).addClass('reaction');
    $(div).append(reaction);

    var sprite = document.createElement('div');
    $(sprite).addClass('sprite')
             .css('background-image', 'url(img/' + this.img + '.svg)');
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
  }
};

/**
  Shows the entire avatar.
**/
Avatar.prototype.show = function() {
  this.avatarEl.show();
}

/**
  Hides the entire avatar.
**/
Avatar.prototype.hide = function() {
  this.avatarEl.hide();
}

/**
  Called to have the avatar perform a reaction.
  @param reaction The reaction to display.
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
}

/** 
  Methods to call `react`
**/
Avatar.prototype.reactHappy = function() { this.react('happy'); }
Avatar.prototype.reactLove = function() { this.react('love'); }
Avatar.prototype.reactSleep = function() { this.react('sleep'); }
Avatar.prototype.reactSurprise = function() { this.react('surprise'); }
Avatar.prototype.reactWat = function() { this.react('wat'); }

/**
  Calls setPosition with new x value.
  @param x The left offset in blocks.
**/
Avatar.prototype.setLeft = function(x) {
  this.setPosition(x, this.y);
}

/**
  Calls setPosition with new y value.
  @param y The bottom offset in blocks.
**/
Avatar.prototype.setBottom = function(y) {
  this.setPosition(this.x, y);
}

/**
  Sets the transform value + z-index for the avatar.
  @param x The left offset in blocks.
  @param y The bottom offset in blocks.
**/
Avatar.prototype.setPosition = function(x, y) {
  this.x = x;
  this.y = y;

  var translateX = ((x * BLOCK - this.X_OFFSET) * MULT).toString() + 'px';
  var translateY = ((y * BLOCK - this.Y_OFFSET) * MULT).toString() + 'px';

  this.avatarEl.css('transform', 'translate(' + translateX + ', ' + translateY + ')');

  var zVal = (y + 1) * 10;
  if (this.isPlayer) zVal++;

  this.avatarEl.css('z-index', zVal);
  this.reactionEl.css('z-index', zVal + 1);
};

/**
  Adjusts sprite to display facing a specific direction.
  @param dir The direction to face.
**/
Avatar.prototype.faceDir = function(dir) {
  this.face = dir;

  var bgPos = 0;
  switch(dir) {
    case DIR.LF:
    case 'lf':
      bgPos = -3;
      break;

    case DIR.UP:
    case 'up':
      bgPos = -2;
      break;

    case DIR.RT:
    case 'rt':
      bgPos = -1;
      break;

    // Default `bgPos` is down.
    case DIR.DW:
    case 'dw':
    default:
      break;
  }

  this.spriteEl.css('background-position', '0 ' + (bgPos * this.SPRITE_HEIGHT * MULT).toString() + 'px');
};

/**
  Methods to call `face`.
**/
Avatar.prototype.faceLeft = function() { this.faceDir(DIR.LF); }
Avatar.prototype.faceUp = function() { this.faceDir(DIR.UP); }
Avatar.prototype.faceRight = function() { this.faceDir(DIR.RT); }
Avatar.prototype.faceDown = function() { this.faceDir(DIR.DW); }

/**
  Called to begining sprite's walking animation.
  @param dir The direction to walk in.
**/
Avatar.prototype.walk = function(dir) {
  switch(dir) {
    case 'lf':
      this.spriteEl.addClass('walk-left');
      break;

    case 'up':
      this.spriteEl.addClass('walk-up');
      break;
      
    case 'rt':
      this.spriteEl.addClass('walk-right');
      break;
      
    case 'dw':
      this.spriteEl.addClass('walk-down');
      break;

    default:
      break;
  }
}

/**
  Called to stop walking animation.
**/
Avatar.prototype.stopWalking = function() {
  this.spriteEl.removeClass();
  this.spriteEl.addClass('sprite');
}

/**
  Sets the background image for the avatar's sprite.
  @param url The url (or dataURL) for the avatar.
**/
Avatar.prototype.setBackgroundImage = function(url) {
  this.spriteEl.css('background-image', 'url(' + url + ')');
}

/** 
  Returns the parent element of the avatar to add and remove from the game.
**/
Avatar.prototype.getEl = function() {
  return this.avatarEl;
}