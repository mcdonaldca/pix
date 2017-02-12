/**
  The player's mom.
**/
function Mom() {
  var SCHEDULE = { everyday: [[1, 0, 0]] };
  var SCHEDULE_STATUSES = {
    1: {
      area: 'hewitt-home',
      x: 5,
      y: 2,
      face: DIR.DW,
    }
  }

  $.extend(this, new NPC('mom', 'characters/mom', 'shadow_sm', SCHEDULE, SCHEDULE_STATUSES));
}

/**
  No interaction needed for now.
**/
Mom.prototype.interact = function(prompt, dir) {
  this.talkedTo = true;
  return 'free';
}