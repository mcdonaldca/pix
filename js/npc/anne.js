/**
  Anne
**/
function Anne() {
  $.extend(this, new NPC("anne", "characters/anne", "shadow_sm"));
}

/**
  No interaction needed for now.
**/
Anne.prototype.interact = function(prompt, dir) {
  this.talkedTo = true;
  return "free";
}

// Add Anne object to game's NPC collection.
var anne = new Anne();
game.addNPC(anne.name, anne);