/**
  An NPC is an Interactable with a name and directional sprite.
**/
function NPC(name, sprite, shadow) {
  $.extend(this, new Interactable());
  name = name || "NoName";
  this.name = name; // Name of NPC.
  sprite = sprite || "characters/test-char.svg";
  this.img = sprite; // The sprite image for the character.
  this.shadow = shadow; // The type of shadow for the character (if any).
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
**/
NPC.prototype.place = function(x, y, areaHeight) {
  this.avatar.setLeft(x);
  this.avatar.setBottom(y, areaHeight);
}

/**
  Getter for NPC.el.
  @return HTMLElement that contains NPC pieces.
**/
NPC.prototype.getEl = function() {
  return this.el;
}