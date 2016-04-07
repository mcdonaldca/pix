/**
  Fridge object used in the studio.
**/
function Fridge() {
  $.extend(this, new Interactable());
}

/**
  Called when the player interacts with the Fridge (presses space).
  @param dir The direction the user is facing (not used here).
  @return The current game status.
**/
Fridge.prototype.interact = function(dir) {
  var status = "convo"

  switch(this.count) {
    case 0:
      this.displayMessage("You munched some cereal.");
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