/**
  SF Librarian.
**/
function Mary() {
  var SCHEDULE = { everyday: [[1, 0, 0]] };
  var SCHEDULE_STATUSES = {
    1: {
      area: 'library',
      x: 7,
      y: 14,
      face: DIR.RT,
      dir: [DIR.LF, DIR.UP, DIR.RT, DIR.DW],
    }
  }

  var schedule = {
    skeleton: SCHEDULE,
    statuses: SCHEDULE_STATUSES
  };

  $.extend(this, new NPC('mary', 'characters/mary', 'shadow_sm', schedule));
}

/**
  Called when the player interacts with Mary.
**/
Mary.prototype.interact = function(prompt, dir) {
  var status = 'focused';

  switch (this.count) {
    case 0:
      if (dir == DIR.UP) this.faceDown();
      else if (dir == DIR.RT) this.faceLeft();
      else if (dir == DIR.DW) this.faceUp();

      // If the player has a library card.
      if (game.player.hasLibraryCard()) {
        this.track = 'has card';
        game.prompt.displayMessage('Hi there, welcome to the library.', this.name);
      // If the player hasn't talked to Mary before.
      } else if (!this.talkedTo) {
        this.talkedTo = true;
        this.track = 'first talk';
        this.trackCount = 0;
        game.prompt.displayMessage('Hello, I haven\'t seen you here before. You must be new to the city.', this.name);
      // Player has card + have spoken before.
      } else {
        this.track = '';
        game.prompt.displayMessage('Hi there, welcome.', this.name);
      }
      break;

    case 1:
      if (this.track == 'has card') {
        game.prompt.removeMessage();
        this.faceRight();
        status = 'free';
        this.count = -1;
      } else {
        if (this.trackCount == 0 && this.track == 'first talk') {
          game.prompt.displayMessage('I\'m the librarian here, my name is Mary.', this.name);
          this.count = 0; // Reset back to same count.
        } else {
          game.prompt.removeMessage();
          game.prompt.displayOptions(
            'Would you like to sign up for a library card?',
            ['Yes', 'No'],
            this.name
            );
          this.trackCount = -1;
        }
        this.trackCount += 1;
      }
      break;

    case 2:
      var s = game.prompt.selected();
      game.prompt.removeOptions();
      if (s == 0) {
        this.track = 'yes';
        game.prompt.displayMessage('Alright, one moment.', this.name);
      } else {
        this.track = 'no';
        game.prompt.displayMessage('Alright, just come back if you change your mind.', this.name);
      }
      break;

    case 3:
      if (this.track == 'yes') {
        game.prompt.removeMessage();
        status = 'loading';
        game.getNPC('mary').reactWat();
        var mary = this;
        setTimeout(function() {
          game.prompt.displayMessage('You\'re all set! Come in whenever you like.', mary.name);
          game.player.getLibraryCard();
          game.setStatus('focused');
        }, 2000);
      } else {
        game.prompt.removeMessage();
        this.faceRight();
        status = 'free';
        this.count = -1;
      }
      break;

    case 4:
      game.prompt.removeMessage();
      this.faceRight();
      status = 'free';
      this.count = -1;
      break;

    default:
      break;
  }

  this.count += 1;
  return status;
};