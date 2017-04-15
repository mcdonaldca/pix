/**
  Simon is a character in the game.
**/
function Simon() {
  var SCHEDULE = { everyday: [[1, 0, 0]] };
  var SCHEDULE_STATUSES = {
    1: {
      area: 'simon-margaret',
      x: 24,
      y: 12,
      face: DIR.DW,
    }
  }

  var schedule = {
    skeleton: SCHEDULE,
    statuses: SCHEDULE_STATUSES
  };

  $.extend(this, new NPC('simon', 'characters/simon', 'shadow_lg', schedule));
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