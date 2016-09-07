/**
  Rama
**/
function Twumasiwaa() {
  $.extend(this, new NPC('twumasiwaa', 'characters/twumasiwaa', 'shadow_sm'));

  this.SCHEDULE = { everyday: [[1, 0, 0], [2, 5, 50], [1, 18, 10]], wednesday: [[1, 0, 0]] };
  this.SCHEDULE_STATUSES = {
    1: {
      area: 'city-nw',
      x: 15,
      y: 24,
      face: DIR.DW,
      dir: [DIR.LF, DIR.UP, DIR.RT, DIR.DW],
    },
    2: {
      area: 'ritual-roasters',
      x: 4,
      y: 3,
      face: DIR.LF,
      dir: [DIR.LF, DIR.UP, DIR.RT, DIR.DW],
    },
  };
  this.SCHEDULE_TRAVEL = {
    'city-nw': {
      'ritual-roasters': new Travel(this, [
          { act: 'path', area: 'city-nw', start: { x: 15, y: 24 }, end: { x: 24, y: 24 }, dur: ANIM_LENGTH_NPC },
          { act: 'exit', to: 'ritual-roasters', x: 3, y: 8 },
          { act: 'path', area: 'ritual-roasters', start: { x: 3, y: 8 }, end: { x: 4, y: 3 }, dur: ANIM_LENGTH_NPC },
          { act: 'face', dir: DIR.LF }
        ])
    },
    'ritual-roasters': {
      'city-nw': new Travel(this, [
          { act: 'path', area: 'ritual-roasters', start: { x: 4, y: 3 }, end: { x: 3, y: 8 }, dur: ANIM_LENGTH_NPC },
          { act: 'exit', to: 'city-nw', x: 24, y: 24 },
          { act: 'path', area: 'city-nw', start: { x: 24, y: 24 }, end: { x: 15, y: 24 }, dur: ANIM_LENGTH_NPC },
          { act: 'face', dir: DIR.DW }
        ])
    }
  };

  this.buildNPCSchedule();
}

/**
  No interaction needed for now.
**/
Twumasiwaa.prototype.interact = function(prompt, dir) {
  var status = 'focused';

  switch (this.count) {
    case 0:
      this.saveFace = this.face;
      if (dir == DIR.DW) this.faceUp();
      else if (dir == DIR.LF) this.faceRight();

      if (!this.talkedTo) {
        game.prompt.displayMessage('Hi! You\'re the new barista, right? I\'m Twumasiwaa.', this.name);
        this.talkedTo = true;
      } else {
        game.prompt.displayMessage('Good ' + game.time.timeOfDay() + '! It\'s a beautiful day.', this.name);
      }
      break;

    case 1:
      game.prompt.removeMessage();
      this.faceDir(this.saveFace);
      this.count = -1;
      status = 'free';
      break;

    default:
      break;
  }

  this.count += 1;
  return status;
}

// Add Twumasiwaa object to game's NPC collection.
var twumasiwaa = new Twumasiwaa();
game.addNPC(twumasiwaa.name, twumasiwaa);