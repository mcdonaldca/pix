/**
  The player's mom.
**/
function Mom() {
  $.extend(this, new NPC("mom", "characters/mom", "shadow_sm"));

  this.SCHEDULE = { everyday: [[1, 0, 0]] };
  this.SCHEDULE_STATUSES = {
    1: {
      area: 'hewitt-home',
      x: 5,
      y: 2,
      face: DIR.DW,
    }
  }
  this.buildNPCSchedule();
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