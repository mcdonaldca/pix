/**
  Alan is a SF resident.
**/
function Alan() {
  var SCHEDULE = { everyday: [[1, 0, 0]] };
  var SCHEDULE_STATUSES = {
    1: {
      area: 'elizabeth-alan',
      x: 6,
      y: 3,
      face: DIR.DW,
    }
  }

  $.extend(this, new NPC('alan', 'characters/alan', 'shadow_lg', SCHEDULE, SCHEDULE_STATUSES));
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