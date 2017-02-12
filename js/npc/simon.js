/**
  Simon is a character in the game.
**/
function Simon() {
  $.extend(this, new NPC('simon', 'characters/simon', 'shadow_lg'));

  this.SCHEDULE = { everyday: [[1, 0, 0]] };
  this.SCHEDULE_STATUSES = {
    1: {
      area: 'simon-margaret',
      x: 24,
      y: 12,
      face: DIR.DW,
    }
  }
  this.buildNPCSchedule();
}

/**
  Called when the player interacts with Simon.
  @param prompt The interface to the on-screen prompter.
  @param dir    The direction the user is facing.
  @return The current game status.
**/
Simon.prototype.interact = function(prompt, dir) {
  this.talkedTo = true;
  return 'free';
}

// Add Simon object to game's NPC collection.
var simon = new Simon();
game.addNPC(simon.name, simon);