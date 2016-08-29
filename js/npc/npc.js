/**
  An NPC is an Interactable with a name and directional sprite.
  @param name   The name of the NPC.
  @param sprite The url for the sprite image.
  @param shadow The url for the shadow, if any.
**/
function NPC(name, sprite, shadow) {
  // Use name provided or random string instead.
  this.name = name || Math.random().toString(36).substring(7);
  $.extend(this, new Avatar(false, this.name, sprite, shadow));
  this.class = "NPC";

  this.count = 0;
  this.talkedTo = false; // Tracks if the character has been spoken to.

  // Set in NPC.updateLocation
  this.currentLocation = undefined;
}

/**
  Pass control to the prompt.
**/
NPC.prototype.arrowUp = function() { game.prompt.arrowUp(); }
NPC.prototype.arrowDown = function() { game.prompt.arrowDown(); }

/**
  Updates the saved location of the NPC
  @param location The new location.
**/
NPC.prototype.updateLocation = function(location) {
  this.currentLocation = location;
};