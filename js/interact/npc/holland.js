/**
  Holland is the doorman for the apartment building.
**/
function Holland() {
  $.extend(this, new NPC("holland", "characters/holland", "shadow_lg"));
}

/**
  Called when the player interacts with Holland.
  @param prompt The interface to the on-screen prompter.
  @param dir    (Not used here) The direction the user is facing.
  @return The current game status.
**/
Holland.prototype.interact = function(prompt, dir) {
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

      prompt.displayMessage("Seems like you're running late today, Adele!", this.name);
      break;

    case 1:
      prompt.removeMessage();
      
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

// Add Holland object to game's NPC collection.
var holland = new Holland();
game.addNPC(holland.name, holland);