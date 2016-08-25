/**
  An NPC is an Interactable with a name and directional sprite.
**/
function NPC(name, sprite, shadow) {
  this.count = 0;
  name = name || "NoName";
  this.name = name; // Name of NPC.
  sprite = sprite || "characters/test-char.svg";
  this.img = sprite;     // The sprite image for the character.
  this.shadow = shadow;  // The type of shadow for the character (if any).
  this.talkedTo = false; // Tracks if the character has been spoken to.

  // The following values are set in NPC.build.
  this.avatar = undefined;
  this.el = undefined;
  this.build();
}

/**
  Called to construct the HTML for the NPC.
**/
NPC.prototype.build = function() {
  /* Sample HTML
     <div class="npc npc-liam">
       <div class="avatar"></div>
       <div class="shadow"></div>
     </div>
  */
  var div = document.createElement("div");
  $(div).addClass("npc npc-" + this.name);

  var reaction = document.createElement("div");
  $(reaction).addClass("reaction");
  $(div).append(reaction);

  var sprite = document.createElement("div");
  $(sprite).addClass("sprite")
           .css("background-image", "url(img/" + this.img + ".svg)");
  $(div).append(sprite);

  // Some NPCs don't have shadows.
  if (this.shadow != undefined) {
    var shadow = document.createElement("div");
    $(shadow).addClass("shadow")
             .css("background-image", "url(img/characters/" + this.shadow + ".svg)");
    $(div).append(shadow);
  }

  this.el = div;
  this.avatar = new Avatar($(div), $(reaction), $(sprite));
}

/**
  Called to place the NPC in the area.
  @param x   The new x value.
  @param y   The new y value.
  @param dir The direction to face.
**/
NPC.prototype.place = function(x, y, dir) {
  this.avatar.setPosition(x, y);
  switch(dir) {
    case "lf":
      this.avatar.faceLeft();
      break;

    case "up":
      this.avatar.faceUp();
      break;

    case "rt":
      this.avatar.faceRight();
      break;

    case "dw":
      this.avatar.faceDown();
      break;

    default:
      break;
  }
}

/**
  Pass control to the prompt.
**/
NPC.prototype.arrowUp = function() { game.prompt.arrowUp(); }
NPC.prototype.arrowDown = function() { game.prompt.arrowDown(); }

/**
  Getter for NPC.el.
  @return HTMLElement that contains NPC pieces.
**/
NPC.prototype.getEl = function() {
  return this.el;
}