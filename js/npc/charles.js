/** 
  Charles is one of Elizabeth & Nick's cats.
**/
function Charles() {
  $.extend(this, new NPC("charles", "pets/charles", "shadow_sm"));

  this.SCHEDULE = { everyday: [[1, 0, 0]] };
  this.SCHEDULE_STATUSES = {
    1: {
      area: 'elizabeth-alan',
      x: 5,
      y: 3,
      face: DIR.DW,
    }
  }
  this.buildNPCSchedule();
}

/**
  Called when the player interacts with Charles.
  @param prompt (Not used here) The interface to the on-screen prompter.
  @param dir    The direction the user is facing.
  @return The current game status.
**/
Charles.prototype.interact = function(prompt, dir) {
  this.talkedTo = true;

  this.faceOppositeDir(dir);
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
  return "free";
}

// Add Charles object to game's NPC collection.
var charles = new Charles();
game.addNPC(charles.name, charles);