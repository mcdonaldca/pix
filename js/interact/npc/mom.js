/**
  The player's mom.
**/
function Mom() {
  $.extend(this, new NPC("mom", "characters/mom", "shadow_lg"));
}

/**
  No interaction needed for now.
**/
Mom.prototype.interact = function(prompt, dir) {
  this.talkedTo = true;
  return "free";
}