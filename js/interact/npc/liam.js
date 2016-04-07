/**
  Liam is a character in the game.
**/
function Liam() {
  $.extend(this, new NPC("liam", "characters/liam", "shadow_lg"));
}

/**
  Called when the player interacts with Liam.
  @param dir The direction the user is facing.
  @return The current game status.
**/
Liam.prototype.interact = function(dir) {
  this.talkedTo = true;
  var status = "convo"

  switch(this.count) {
    case 0:
      if (dir == "rt") {
        this.avatar.faceLeft();
      }

      this.displayMessage("Good morning, sleepyhead!");
      this.messages.show();
      break;

    case 1:
      this.displayMessage("You better hurry to work, you're running kind of late, eh?");
      break;

    case 2:
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