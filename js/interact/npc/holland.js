/**
  Holland is the doorman for the apartment building.
**/
function Holland() {
  $.extend(this, new NPC("holland", "characters/holland-counter"));
}

/**
  Called when the player interacts with Holland.
  @param dir The direction the user is facing.
  @return The current game status.
**/
Holland.prototype.interact = function(dir) {
  this.talkedTo = true;
  var status = "convo"

  switch(this.count) {
    case 0:
      // Have Holland face the appropriate direction to speak.
      if (dir == "rt") {
        this.avatar.faceLeft();
      } else if (dir == "lf") {
        this.avatar.faceRight();
      }

      this.displayMessage("Seems like you're running late today, Adele!");
      this.messages.show();
      break;

    case 1:
      this.displayMessage("");
      this.messages.hide();

      this.avatar.faceDown();
      this.count = -1;
      status = "free";
      break;

    default:
      break;
  }

  this.count += 1;
  return status;
}