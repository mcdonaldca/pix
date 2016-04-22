/**
  Work object handles work time interactions.
**/
function Work() {
  this.count = 0;
}

/**
  Called when the player interacts with a work space (walks into it).
  @param prompt The interface to the on-screen prompter.
  @param dir    (Not used here) The direction the user is facing.
  @return The current game status.
**/
Work.prototype.interact = function(prompt, dir) {
  var status = "convo"

  switch(this.count) {
    case 0:
      // Check if they want to go to work.
      prompt.displayOptions("Go to work?", ["Yes", "No"]);
      break;

    case 1:
      // Save the selected value before removing options.
      var s = prompt.selected();
      prompt.removeOptions();
      if (s == 0) {
        game.areaShadowEl.css("opacity", "1");

        // Finalize work effects.
        setTimeout(function() {
          var hours = 0;
          // If the area can close, pass the closing hour.
          if (game.area.isLimited()) hours = game.time.work(game.area.closing());
          // If the area doesn't have a closing time
          else hours = game.time.work();

          game.player.work(hours);
          game.player.faceDown();
          game.areaShadowEl.css("opacity", "0");
          setTimeout(function() {
            // Don't display all done if prompt is occupied (by closing time message).
            if (!game.prompt.isDisplaying()) game.prompt.displayMessage("All done!");
          }, 500);
        }, 3000);
      } else {
        this.count = -1;
        status = "free";
      }
      break;

    case 2:
      game.prompt.removeMessage();
      this.count = -1;
      status = "free";
      break;

    default:
      break;
  }

  this.count += 1;
  return status;
}

// All interactables need these functions.
Work.prototype.arrowUp = function(prompt) { prompt.arrowUp(); }
Work.prototype.arrowDown = function(prompt) { prompt.arrowDown(); }