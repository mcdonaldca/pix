/**
  Margaret is a character in the game.
**/
function Margaret() {
  $.extend(this, new NPC('margaret', 'characters/margaret', 'shadow_sm'));

  this.SCHEDULE = { weekday: [[0, 1], [7, 2], [8, 3], [21, 1]], weekend: [[0, 1]] };
  this.SCHEDULE_STATUSES = {
    1: {
        area: 'liam-margaret',
        x: 20,
        y: 4,
        face: DIR.DW,
        dir: [DIR.UP, DIR.RT, DIR.DW, DIR.LF],
      },
    2: {
      area: 'ritual-roasters',
      x: 1,
      y: 2,
      face: DIR.LF,
      dir: [DIR.UP, DIR.LF],
    },
    3: {
      area: 'library',
      x: 8,
      y: 6,
      face: DIR.LF,
      dir: [DIR.UP, DIR.DW, DIR.LF],
    },
  };
  this.SCHEDULE_TRAVEL = {
    'liam-margaret': {
      'ritual-roasters': 
        new Travel(this, [{ act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.LF, dist: 2, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.DW, dist: 7, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.LF, dist: 6, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.DW, dist: 1, dur: ANIM_LENGTH_NPC },
                    { act: 'exit', sub: 'npc', type: 'margaret', to: 'le-chateau-floor-1', x: 15, y: 2 },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.DW, dist: 1, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.LF, dist: 12, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.UP, dist: 1, dur: ANIM_LENGTH_NPC },
                    { act: 'exit', sub: 'npc', type: 'margaret', to: 'le-chateau-lobby', x: 2, y: 2 },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.DW, dist: 4, dur: ANIM_LENGTH_NPC },
                    { act: 'exit', sub: 'npc', type: 'margaret', to: 'city-sw', x: 29, y: 2 },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.DW, dist: 3, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.LF, dist: 5, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.UP, dist: 5, dur: ANIM_LENGTH_NPC },
                    { act: 'exit', sub: 'npc', type: 'margaret', to: 'city-nw', x: 24, y: 31 },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.UP, dist: 7, dur: ANIM_LENGTH_NPC },
                    { act: 'exit', sub: 'npc', type: 'margaret', to: 'ritual-roasters', x: 3, y: 8 },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.UP, dist: 3, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.LF, dist: 1, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.UP, dist: 1, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.LF, dist: 1, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.UP, dist: 2, dur: ANIM_LENGTH_NPC },
                    { act: 'face', sub: 'npc', type: 'margaret', dir: DIR.LF },
                    { act: 'end' }])
    },
    'ritual-roasters': {
      'library': 
        new Travel(this, [{ act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.DW, dist: 2, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.RT, dist: 1, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.DW, dist: 1, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.RT, dist: 1, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.DW, dist: 3, dur: ANIM_LENGTH_NPC },
                    { act: 'exit', sub: 'npc', type: 'margaret', to: 'city-nw', x: 24, y: 24 },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.DW, dist: 7, dur: ANIM_LENGTH_NPC },
                    { act: 'exit', sub: 'npc', type: 'margaret', to: 'city-sw', x: 24, y: 1 },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.DW, dist: 10, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.LF, dist: 11, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.UP, dist: 6, dur: ANIM_LENGTH_NPC },
                    { act: 'exit', sub: 'npc', type: 'margaret', to: 'library', x: 10, y: 15 },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.UP, dist: 3, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.LF, dist: 1, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.UP, dist: 5, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.LF, dist: 1, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.UP, dist: 1, dur: ANIM_LENGTH_NPC },
                    { act: 'face', sub: 'npc', type: 'margaret', dir: DIR.LF },
                    { act: 'end' }])
    },
    'library': {
      'liam-margaret': 
        new Travel(this, [{ act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.DW, dist: 1, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.RT, dist: 1, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.DW, dist: 5, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.RT, dist: 1, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.DW, dist: 3, dur: ANIM_LENGTH_NPC },
                    { act: 'exit', sub: 'npc', type: 'margaret', to: 'city-sw', x: 13, y: 5 },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.DW, dist: 6, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.RT, dist: 11, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.UP, dist: 6, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.RT, dist: 5, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.UP, dist: 3, dur: ANIM_LENGTH_NPC },
                    { act: 'exit', sub: 'npc', type: 'margaret', to: 'le-chateau-lobby', x: 2, y: 6 },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.UP, dist: 4, dur: ANIM_LENGTH_NPC },
                    { act: 'exit', sub: 'npc', type: 'margaret', to: 'le-chateau-floor-1', x: 3, y: 2 },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.DW, dist: 1, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.RT, dist: 12, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.UP, dist: 1, dur: ANIM_LENGTH_NPC },
                    { act: 'exit', sub: 'npc', type: 'margaret', to: 'liam-margaret', x: 12, y: 12 },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.UP, dist: 1, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.RT, dist: 6, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.UP, dist: 7, dur: ANIM_LENGTH_NPC },
                    { act: 'walk', sub: 'npc', type: 'margaret', dir: DIR.RT, dist: 2, dur: ANIM_LENGTH_NPC },
                    { act: 'face', sub: 'npc', type: 'margaret', dir: DIR.DW },
                    { act: 'end' }])
    }
  }

  this.buildNPCSchedule();
  this.currentLocation = 'liam-margaret';
}

/**
  Called when the player interacts with Margaret.
  @param prompt The interface to the on-screen prompter.
  @param dir    (Not used here) The direction the user is facing.
  @return The current game status.
**/
Margaret.prototype.interact = function(prompt, dir) {
  
}

// Add Margaret object to game's NPC collection.
var margaret = new Margaret();
game.addNPC(margaret.name, margaret);