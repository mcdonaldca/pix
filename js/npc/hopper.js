/** 
  Hopper is one of Elizabeth & Nick's cats.
**/
function Hopper() {
  var SCHEDULE = { everyday: [[1, 0, 0]] };
  var SCHEDULE_STATUSES = {
    1: {
      area: 'elizabeth-alan',
      x: 17,
      y: 11,
      face: DIR.DW,
    }
  }

  var schedule = {
    skeleton: SCHEDULE,
    statuses: SCHEDULE_STATUSES
  };

  $.extend(this, new NPC('hopper', 'pets/hopper', 'shadow_sm', schedule));
}

/**
  Called when the player interacts with Hopper.
  @param prompt (Not used here) The interface to the on-screen prompter.
  @param dir    The direction the user is facing.
  @return The current game status.
**/
Hopper.prototype.interact = function(prompt, dir) {
  this.talkedTo = true;

  if (dir == DIR.LF) {
    this.faceRight();
  } else if (dir == DIR.UP) {
    this.faceDown();
  } else if (dir == DIR.RT) {
    this.faceLeft();
  } else if (dir == DIR.DW) {
    this.faceUp();
  } 

  this.reactLove();
  return 'free';
}