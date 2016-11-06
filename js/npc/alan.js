/**
  Alan is a SF resident.
**/
function Alan() {
  $.extend(this, new NPC('alan', 'characters/alan', 'shadow_lg'));

  this.SCHEDULE = { everyday: [[1, 0, 0]] };
  this.SCHEDULE_STATUSES = {
    1: {
      area: 'elizabeth-alan',
      x: 6,
      y: 3,
      face: DIR.DW,
    }
  }
  this.buildNPCSchedule();
}

/**
  Called when the player interacts with Alan.
  @param prompt The interface to the on-screen prompter.
  @param dir    The direction the user is facing.
  @return The current game status.
**/
Alan.prototype.interact = function(prompt, dir) {
  this.talkedTo = true;
  return 'free';
}

// Add Alan object to game's NPC collection.
var alan = new Alan();
game.addNPC(alan.name, alan);