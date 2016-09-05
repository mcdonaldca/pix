/**
  Rama
**/
function Twumasiwaa() {
  $.extend(this, new NPC('twumasiwaa', 'characters/twumasiwaa', 'shadow_sm'));

  this.SCHEDULE = { everyday: [[0, 1]] };
  this.SCHEDULE_STATUSES = {
    1: {
      area: 'ritual-roasters',
      x: 4,
      y: 3,
      face: DIR.LF,
      dir: [DIR.LF, DIR.UP, DIR.RT, DIR.DW],
    }
  }

  this.buildNPCSchedule();
  this.currentLocation = 'ritual-roasters';
}

/**
  No interaction needed for now.
**/
Twumasiwaa.prototype.interact = function(prompt, dir) {
  var status = 'focused';

  switch (this.count) {
    case 0:
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
      this.faceLeft();
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