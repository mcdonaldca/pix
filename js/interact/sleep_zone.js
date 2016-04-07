/**
  The SleepZone is used in a place where the player can try and sleep.
**/
function SleepZone() {
  $.extend(this, new Interactable());
}

/**
  Called when the player interacts with a SleepZone (presses space).
  @param dir The direction the user is facing (not used here).
  @return The current game status.
**/
SleepZone.prototype.interact = function(dir) {
  var status = "convo"

  switch(this.count) {
    case 0:
      this.displayMessage("It's a little early for a nap.");
      this.messages.show();
      break;

    case 1:
      this.displayMessage("");
      this.messages.hide();

      this.count = -1;
      status = "free";
      break;

    default:
      break;
  }

  this.count += 1;
  return status;
}