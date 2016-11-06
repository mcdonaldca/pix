/**
  Elizabeth is a SF resident.
**/
function Elizabeth() {
  $.extend(this, new NPC('elizabeth', 'characters/elizabeth', 'shadow_sm'));

  this.SCHEDULE = { everyday: [[1, 0, 0]] };
  this.SCHEDULE_STATUSES = {
    1: {
      area: 'elizabeth-alan',
      x: 18,
      y: 11,
      face: DIR.DW,
    }
  }
  this.buildNPCSchedule();
}

/**
  Called when the player interacts with Elizabeth.
  @param prompt The interface to the on-screen prompter.
  @param dir    The direction the user is facing.
  @return The current game status.
**/
Elizabeth.prototype.interact = function(prompt, dir) {
  this.talkedTo = true;
  return 'free';
}

// Add Elizabeth object to game's NPC collection.
var elizabeth = new Elizabeth();
game.addNPC(elizabeth.name, elizabeth);