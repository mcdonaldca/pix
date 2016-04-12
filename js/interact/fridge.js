/**
  Fridge object used in the studio.
**/
function Fridge() {
  this.count = 0;
}

/**
  Called when the player interacts with the Fridge (presses space).
  @param prompt The interface to the on-screen prompter.
  @param dir    (Not used here) The direction the user is facing.
  @return The current game status.
**/
Fridge.prototype.interact = function(prompt, dir) {
  var status = "convo"

  switch(this.count) {
    case 0:
      prompt.displayMessage("You munched some cereal.");
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