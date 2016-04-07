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
}