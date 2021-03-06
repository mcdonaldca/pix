/**
  Anne
**/
function Anne() {
  var SCHEDULE = { everyday: [[1, 0, 0], [2, 5, 30], [1, 18, 30]], wednesday: [[1, 0, 0]] };
  var SCHEDULE_STATUSES = {
    1: {
      area: 'anne-home',
      x: 7,
      y: 5,
      face: DIR.LF,
    },
    2: {
      area: 'ritual-roasters',
      x: 6,
      y: 4,
      face: DIR.DW,
    }
  };
  var SCHEDULE_TRAVEL = {
    'anne-home': {
      'ritual-roasters': new Travel(this, [
          { act: 'path', area: 'anne-home', start: { x: 7, y: 5 }, end: { x: 3, y: 7 }, dur: ANIM_LENGTH_NPC },
          { act: 'exit', to: 'city-ne', x: 10, y: 23 },
          { act: 'path', area: 'city-ne', start: { x: 10, y: 23 }, end: { x: 0, y: 26 }, dur: ANIM_LENGTH_NPC },
          { act: 'exit', to: 'city-nw', x: 31, y: 26 },
          { act: 'path', area: 'city-nw', start: { x: 31, y: 26 }, end: { x: 24, y: 24 }, dur: ANIM_LENGTH_NPC },
          { act: 'exit', to: 'ritual-roasters', x: 4, y: 8 },
          { act: 'path', area: 'ritual-roasters', start: { x: 4, y: 8 }, end: { x: 6, y: 4 }, dur: ANIM_LENGTH_NPC },
          { act: 'face', dir: DIR.DW }
        ])
    },
    'ritual-roasters': {
      'anne-home': new Travel(this, [
          { act: 'path', area: 'ritual-roasters', start: { x: 6, y: 4 }, end: { x: 4, y: 8 }, dur: ANIM_LENGTH_NPC },
          { act: 'exit', to: 'city-nw', x: 24, y: 24 },
          { act: 'path', area: 'city-nw', start: { x: 24, y: 24 }, end: { x: 31, y: 26 }, dur: ANIM_LENGTH_NPC },
          { act: 'exit', to: 'city-ne', x: 0, y: 26 },
          { act: 'path', area: 'city-ne', start: { x: 0, y: 26 }, end: { x: 10, y: 23 }, dur: ANIM_LENGTH_NPC },
          { act: 'exit', to: 'anne-home', x: 3, y: 7 },
          { act: 'path', area: 'anne-home', start: { x: 3, y: 7 }, end: { x: 7, y: 5 }, dur: ANIM_LENGTH_NPC },
          { act: 'face', dir: DIR.DW }
        ])
    }
  };

  var schedule = {
    skeleton: SCHEDULE,
    statuses: SCHEDULE_STATUSES,
    travel: SCHEDULE_TRAVEL
  };

  $.extend(this, new NPC(
    'anne', 
    'characters/anne', 
    'shadow_sm', 
    schedule
  ));
  this.talkedTo = true;
}

/**
  No interaction needed for now.
**/
Anne.prototype.interact = function(prompt, dir) {
  var status = 'focused';

  switch(this.count) {
    case 0:
      this.saveFace = this.face;
      this.faceOppositeDir(dir);
      var options = ['Great!', 'Okay', 'Terrible.'];
      if (game.player.getJob() == 'unemployed') {
        options.push('I\'d like a job.');
      }
      game.prompt.displayOptions(
        'Hi, ' + game.name + '. How are you doing?',
        options,
        'anne'
        );
      break;

    case 1:
      var s = game.prompt.selected();
      game.prompt.removeOptions();
      switch(s) {
        case 0:
          game.prompt.displayMessage('I\'m so glad to hear that!', 'anne');
          game.updateKarma('anne', 1, 'Told Anne you were doing great.');
          break;

        case 1:
          game.prompt.displayMessage('Glad to hear it.', 'anne');
          game.logHistory('Told Anne you were doing okay.');
          break;

        case 2:
          game.prompt.displayMessage('I\'m sorry to hear that. Let me know if I can help.', 'anne');
          game.updateKarma('anne', -1, 'Told Anne you were doing terrible.');
          break;

        case 3:
          game.prompt.displayMessage('Of course! Whenever you want to come into work, just walk through that door back there.', 'anne');
          game.player.employ('Ritual Roasters Barista', 12);
          game.world.getCurrentArea().space(4, 2).unblock();
          game.world.getCurrentArea().getItem('counter-end').hide();
          game.world.getCurrentArea().getItem('counter').hide();
        default:
          break;
      }
      break;

    case 2:
      this.faceDir(this.saveFace);
      game.prompt.removeMessage();
      this.count = -1;
      status = 'free';

    default:
      break;
  }

  this.count += 1;
  return status;
}