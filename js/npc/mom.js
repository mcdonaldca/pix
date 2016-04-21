/**
  The player's mom.
**/
function Mom() {
  $.extend(this, new NPC("mom", "characters/mom", "shadow_sm"));
}

/**
  No interaction needed for now.
**/
Mom.prototype.interact = function(prompt, dir) {
  this.talkedTo = true;
  return "free";
}

// Add Mom object to game's NPC collection.
var mom = new Mom();
game.addNPC(mom.name, mom);