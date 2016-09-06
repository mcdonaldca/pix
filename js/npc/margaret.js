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
        new Travel(this, [
          { act: 'path', area: 'liam-margaret', start: { x: 20, y: 4 }, end: { x: 12, y: 12 }, dur: ANIM_LENGTH_NPC },
          { act: 'exit', to: 'le-chateau-floor-1', x: 15, y: 2 },
          { act: 'path', area: 'le-chateau-floor-1', start: { x: 15, y: 2 }, end: { x: 3, y: 2 }, dur: ANIM_LENGTH_NPC },
          { act: 'exit', to: 'le-chateau-lobby', x: 2, y: 2 },
          { act: 'path', area: 'le-chateau-lobby', start: { x: 2, y: 2 }, end: { x: 2, y: 6 }, dur: ANIM_LENGTH_NPC },
          { act: 'exit', to: 'city-sw', x: 29, y: 2 },
          { act: 'path', area: 'city-sw', start: { x: 29, y: 2 }, end: { x: 24, y: 1 }, dur: ANIM_LENGTH_NPC },
          { act: 'exit', to: 'city-nw', x: 24, y: 31 },
          { act: 'path', area: 'city-nw', start: { x: 24, y: 31 }, end: { x: 24, y: 24 }, dur: ANIM_LENGTH_NPC },
          { act: 'exit', to: 'ritual-roasters', x: 3, y: 8 },
          { act: 'path', area: 'ritual-roasters', start: { x: 3, y: 8 }, end: { x: 1, y: 2 }, dur: ANIM_LENGTH_NPC },
          { act: 'face', dir: DIR.LF }
        ])
    },
    'ritual-roasters': {
      'library': 
        new Travel(this, [
          { act: 'path', area: 'ritual-roasters', start: { x: 1, y: 2 }, end: { x: 3, y: 8 }, dur: ANIM_LENGTH_NPC },
          { act: 'exit', to: 'city-nw', x: 24, y: 24 },
          { act: 'path', area: 'city-nw', start: { x: 24, y: 24 }, end: { x: 24, y: 31 }, dur: ANIM_LENGTH_NPC },
          { act: 'exit', to: 'city-sw', x: 24, y: 1 },
          { act: 'path', area: 'city-sw', start: { x: 24, y: 1 }, end: { x: 13, y: 5 }, dur: ANIM_LENGTH_NPC },
          { act: 'exit', to: 'library', x: 10, y: 15 },
          { act: 'path', area: 'library', start: { x: 10, y: 15 }, end: { x: 8, y: 6 }, dur: ANIM_LENGTH_NPC },
          { act: 'face', dir: DIR.LF }
        ])
    },
    'library': {
      'liam-margaret': 
        new Travel(this, [
          { act: 'path', area: 'library', start: { x: 8, y: 6 }, end: { x: 10, y: 15 }, dur: ANIM_LENGTH_NPC },
          { act: 'exit', to: 'city-sw', x: 13, y: 5 },
          { act: 'path', area: 'city-sw', start: { x: 13, y: 5 }, end: { x: 29, y: 2 }, dur: ANIM_LENGTH_NPC },
          { act: 'exit', sub: 'npc', type: 'margaret', to: 'le-chateau-lobby', x: 2, y: 6 },
          { act: 'path', area: 'le-chateau-lobby', start: { x: 2, y: 6 }, end: { x: 3, y: 2 }, dur: ANIM_LENGTH_NPC },
          { act: 'exit', sub: 'npc', type: 'margaret', to: 'le-chateau-floor-1', x: 2, y: 2 },
          { act: 'path', area: 'le-chateau-floor-1', start: { x: 2, y: 2 }, end: { x: 15, y: 2 }, dur: ANIM_LENGTH_NPC },
          { act: 'exit', sub: 'npc', type: 'margaret', to: 'liam-margaret', x: 12, y: 12 },
          { act: 'path', area: 'liam-margaret', start: { x: 12, y: 12 }, end: { x: 20, y: 4 }, dur: ANIM_LENGTH_NPC },
          { act: 'face', sub: 'npc', type: 'margaret', dir: DIR.DW }
        ])
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