/**
  Elizabeth is a SF resident.
**/
function Elizabeth() {
  var SCHEDULE = { everyday: [[1, 0, 0]] };
  var SCHEDULE_STATUSES = {
    1: {
      area: 'elizabeth-alan',
      x: 18,
      y: 11,
      face: DIR.DW,
    }
  }

  $.extend(this, new NPC('elizabeth', 'characters/elizabeth', 'shadow_sm', SCHEDULE, SCHEDULE_STATUSES));
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