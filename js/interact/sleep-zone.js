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
  var status = "convo"

  switch(this.count) {
    case 0:
      prompt.displayMessage("It's a little early for a nap.");
      break;

    case 1:
      prompt.removeMessage();

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
SleepZone.prototype.arrowUp = function(prompt) {}
SleepZone.prototype.arrowDown = function(prompt) {}