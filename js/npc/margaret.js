/**
  Margaret is a character in the game.
**/
function Margaret() {
  $.extend(this, new NPC('margaret', 'characters/margaret', 'shadow_sm'));

  this.SCHEDULE = { weekday: [[1, 0, 0], [2, 6, 50], [3, 8, 0], [1, 20, 50]], weekend: [[1, 0, 0]] };
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
          { act: 'exit', to: 'le-chateau-floor-1', x: 16, y: 3 },
          { act: 'path', area: 'le-chateau-floor-1', start: { x: 16, y: 3 }, end: { x: 4, y: 3 }, dur: ANIM_LENGTH_NPC },
          { act: 'exit', to: 'le-chateau-lobby', x: 3, y: 3 },
          { act: 'path', area: 'le-chateau-lobby', start: { x: 3, y: 3 }, end: { x: 3, y: 7 }, dur: ANIM_LENGTH_NPC },
          { act: 'exit', to: 'city-sw', x: 29, y: 2 },
          { act: 'path', area: 'city-sw', start: { x: 29, y: 2 }, end: { x: 24, y: 1 }, dur: ANIM_LENGTH_NPC },
          { act: 'exit', to: 'city-nw', x: 24, y: 31 },
          { act: 'path', area: 'city-nw', start: { x: 24, y: 31 }, end: { x: 24, y: 24 }, dur: ANIM_LENGTH_NPC },
          { act: 'exit', to: 'ritual-roasters', x: 4, y: 8 },
          { act: 'path', area: 'ritual-roasters', start: { x: 4, y: 8 }, end: { x: 2, y: 2 }, dur: ANIM_LENGTH_NPC },
          { act: 'face', dir: DIR.LF }
        ])
    },
    'ritual-roasters': {
      'library': 
        new Travel(this, [
          { act: 'path', area: 'ritual-roasters', start: { x: 2, y: 2 }, end: { x: 4, y: 8 }, dur: ANIM_LENGTH_NPC },
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
          { act: 'exit', to: 'le-chateau-lobby', x: 3, y: 7 },
          { act: 'path', area: 'le-chateau-lobby', start: { x: 3, y: 7 }, end: { x: 4, y: 3 }, dur: ANIM_LENGTH_NPC },
          { act: 'exit', to: 'le-chateau-floor-1', x: 3, y: 3 },
          { act: 'path', area: 'le-chateau-floor-1', start: { x: 3, y: 3 }, end: { x: 16, y: 3 }, dur: ANIM_LENGTH_NPC },
          { act: 'exit', to: 'liam-margaret', x: 12, y: 12 },
          { act: 'path', area: 'liam-margaret', start: { x: 12, y: 12 }, end: { x: 20, y: 4 }, dur: ANIM_LENGTH_NPC },
          { act: 'face', dir: DIR.DW }
        ])
    }
  }

  this.buildNPCSchedule();

  this.relationshipStatus = {
    foundRoomate: false,
    offeredPlace: false,
  }
}

/**
  Called when the player interacts with Margaret.
  @param prompt The interface to the on-screen prompter.
  @param dir    (Not used here) The direction the user is facing.
  @return The current game status.
**/
Margaret.prototype.interact = function(prompt, dir) {
  var status = 'focused';

  if (!this.talkedTo) { 
    switch(this.count) {
      case 0:
        this.saveFace = this.face;
        this.faceOppositeDir(dir);
        game.prompt.displayMessage('Hi! I\'m Maragret, what\'s your name?', this.name);
        break;

      case 1:
        game.prompt.updateMessage(game.name + '? Nice to meet you.', this.name);
        break;

      default:
        game.prompt.removeMessage();
        this.faceDir(this.saveFace);
        this.count = -1;
        this.talkedTo = true;
        status = 'free';
        break;
    }
  } else if (!this.relationshipStatus['foundRoomate'] && !this.relationshipStatus['offeredPlace']) {
    switch(this.count) {
      case 0:
        this.saveFace = this.face;
        this.faceOppositeDir(dir);
        game.prompt.displayMessage('*sigh*', this.name);
        break;

      case 1:
        game.prompt.removeMessage();
        game.prompt.displayOptions(
          'PICK ONE:', 
          ['Is everything okay?', 'What\'s wrong?', 'Stop sighing.']
        );
        break;

      case 2:
        var s = game.prompt.selected();
        game.prompt.removeOptions();
        if (s == 2) {
          this.reactWat();
          game.prompt.displayMessage('Okay.', this.name);
          this.count = 100;
        } else {
          game.prompt.displayMessage('Oh, it\'s not that big of a deal.', this.name);
        }
        break;

      case 3:
        game.prompt.updateMessage('One of my roommates just left for ' + 'New York' + ' and we haven\'t found a new one yet.', this.name);
        break;

      case 4:
        game.prompt.updateMessage('It\'s been pretty stressful.', this.name);
        break;

      case 5:
        game.prompt.removeMessage();
        game.prompt.displayOptions(
          'PICK ONE:', 
          [
            'Could I move in?', 
            'I\'m sorry to hear that.',
            'Suck it up, that\'s not that bad.'
          ]
        );
        break;

      case 6:
        var s = game.prompt.selected();
        game.prompt.removeOptions();
        if (s == 1) {
          game.prompt.displayMessage('Thanks.', this.name);
          this.count = 100;
        } else if (s == 2) {
          game.prompt.displayMessage('I guess you\'re right', this.name);
          this.count = 100;
        } else {
          game.prompt.displayMessage('Really? You want to move in?', this.name);
        }
        break;

      case 7:
        this.reactHappy();
        game.prompt.updateMessage('That\'s so great!', this.name);
        break;

      case 8:
        game.prompt.updateMessage('Swing by our place when your\'e ready!', this.name);
        this.offeredPlace = true;
        break;

      default:
        if(this.offeredPlace) this.relationshipStatus['offeredPlace'] = true;
        game.prompt.removeMessage();
        this.faceDir(this.saveFace);
        this.count = -1;
        status = 'free';
        break;
    }
  } else {
    status = 'free';
  }

  this.count += 1;
  return status;
}

// Add Margaret object to game's NPC collection.
var margaret = new Margaret();
game.addNPC(margaret.name, margaret);