/**
  The player's mom.
**/
function Mom() {
  var SCHEDULE = { everyday: [[1, 0, 0]] };
  var SCHEDULE_STATUSES = {
    1: {
      area: 'hewitt-home',
      x: 6,
      y: 2,
      face: DIR.DW,
    }
  }

  var schedule = {
    skeleton: SCHEDULE,
    statuses: SCHEDULE_STATUSES
  };

  $.extend(this, new NPC('mom', 'characters/mom', 'shadow_sm', schedule));
}

/**
  No interaction needed for now.
**/
Mom.prototype.interact = function(prompt, dir) {
  this.talkedTo = true;
  return 'free';
}