/**
  The SleepZone is used in a place where the player can try and sleep.
**/
function SleepZone() {
  this.count = 0;
}

/**
  Called when the player interacts with a SleepZone (presses space).
  @param prompt The interface to the on-screen prompter.
  @param dir    (Not used here) The direction the user is facing.
  @return The current game status.
**/
SleepZone.prototype.interact = function(prompt, dir) {
  var status = "focused"

  switch(this.count) {
    case 0:
      // Check if they want to sleep.
      prompt.displayOptions(
        "Turn in for the day?",
        ["Yes", "No"]
        );
      break;

    case 1:
      // Save the selected value before removing options.
      var s = prompt.selected();
      prompt.removeOptions();
      if (s == 0) {
        game.world.areaShadowEl.css("opacity", ".8");
        game.player.reactSleep();

        // Clean up.
        setTimeout(function() {
          game.time.sleep();
          game.world.areaShadowEl.css("opacity", "0");
          setTimeout(function() {
            // Force interaction to free game play.
            game.interact(dir);
          }, 500);
        }, 4000);
      } else {
        this.count = -1;
        status = "free";
      }
      break;

    case 2:
      this.count = -1;
      status = "free";

    default:
      break;
  }

  this.count += 1;
  return status;
}

// All interactables need these functions.
SleepZone.prototype.arrowUp = function(prompt) { prompt.arrowUp(); }
SleepZone.prototype.arrowDown = function(prompt) { prompt.arrowDown(); }