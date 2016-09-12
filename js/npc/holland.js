/**
  Holland is the doorman for the apartment building.
**/
function Holland() {
  $.extend(this, new NPC('holland', 'characters/holland', 'shadow_lg'));
  // Available renovations.
  this.renovations = [
    { name: 'New wallpaper', item: 'wallpaper', price: 350 },
    { name: 'Fix window', item: 'window', price: 450 },
    { name: 'New carpet', item: 'carpet', price: 290 },
    { name: 'New linens', item: 'linens', price: 100 }
  ];

  this.SCHEDULE = { everyday: [[1, 0, 0]] };
  this.SCHEDULE_STATUSES = {
    1: {
      area: 'le-chateau-lobby',
      x: 7,
      y: 2,
      face: DIR.DW,
      dir: [DIR.LF, DIR.UP, DIR.RT, DIR.DW],
    }
  }

  this.buildNPCSchedule();
}

/**
  Called when the player interacts with Holland.
  @param prompt The interface to the on-screen prompter.
  @param dir    The direction the user is facing.
  @return The current game status.
**/
Holland.prototype.interact = function(prompt, dir) {
  this.talkedTo = true;
  var status = 'focused';

  switch(this.count) {
    case 0:
      // Have Holland face the appropriate direction to speak.
      if (dir == DIR.RT) {
        this.faceLeft();
      } else if (dir == DIR.LF) {
        this.faceRight();
      }
      // Greet the player.
      prompt.displayMessage('Hey there!', this.name);
      break;

    case 1:
      // Display conversation options.
      prompt.removeMessage();
      prompt.displayOptions(
        'How can I help you?',
        ['Renovations', 'Nevermind'],
        this.name
        );
      break;

    case 2:
      // Selected renovations.
      if (prompt.selected() == 0) {
        // Mark selected path for conversation tree.
        this.track = 'renovations';

        // Build renovation options.
        var renovationOptions = [];
        for (var i = 0; i < this.renovations.length; i++) {
          renovationOptions.push(this.renovations[i].name + ' ($' + this.renovations[i].price + ')');
        }

        // If there is nothing to renovate.
        if (renovationOptions.length == 0) {
          prompt.removeOptions();
          prompt.displayMessage('Looks like you don\'t have anything left to renovate!', this.name);
          // Loop back to starting options.
          this.count = 0;

        // If there are still renovations remaining.
        } else {
          renovationOptions.push('Nothing');
          // Display instead of update because of count loop.
          prompt.displayOptions(
            'What would you like to renovate?',
            renovationOptions,
            this.name
            );
        }

      // Selected nevermind.
      } else {
        prompt.removeOptions();
        prompt.displayMessage('Talk to you later!', this.name);
        this.track = 'nevermind';
      }
      break;

    case 3:
      // End of conversation.
      if (this.track == 'nevermind') {
        prompt.removeMessage();
        this.faceDown();
        this.count = -1;
        status = 'free';

      // Checking renovations.
      } else {
        // Save prompt information before clearing.
        var s = prompt.selected();
        var options = prompt.selectOptions;
        prompt.removeOptions();

        // Don't want to renovate;
        if (options[s] == 'Nothing') {
          prompt.displayMessage('No worries, just let me know.', this.name);
          this.count = 0;
        } else {
          var renov = this.renovations[s];
          if (game.player.wallet.afford(renov.price)) {
            prompt.displayMessage('All right, it should be done tomorrow!', this.name);
            var final = options.length == 2;
            game.time.scheduleEvent('tomorrow', game.areas['rundown-apt'].renovate(renov.item, final));
            game.player.wallet.spend(renov.price);
            this.renovations.splice(s, 1);
          } else {
            prompt.displayMessage('Hm... doesn\'t seem like you have the funds.', this.name)
          }
          this.count = 1;
        }
      }
      break;

    case 4:
      this.faceDown();
      this.count = -1;
      status = 'free';
      break;

    default:
      break;
  }

  this.count += 1;
  return status;
}

// Add Holland object to game's NPC collection.
var holland = new Holland();
game.addNPC(holland.name, holland);