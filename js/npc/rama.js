/**
  Rama
**/
function Rama() {
  $.extend(this, new NPC("rama", "characters/rama", "shadow_sm"));
}

/**
  No interaction needed for now.
**/
Rama.prototype.interact = function(prompt, dir) {
  this.talkedTo = true;
  return "free";
}

// Add Rama object to game's NPC collection.
var rama = new Rama();
game.addNPC(rama.name, rama);