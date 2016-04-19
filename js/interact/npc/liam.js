/**
  Liam is a character in the game.
**/
function Liam() {
  $.extend(this, new NPC("liam", "characters/liam", "shadow_lg"));
}

/**
  Called when the player interacts with Liam.
  @param prompt The interface to the on-screen prompter.
  @param dir    (Not used here) The direction the user is facing.
  @return The current game status.
**/
Liam.prototype.interact = function(prompt, dir) {
  this.talkedTo = true;
  var status = "convo"

  switch(this.count) {
    case 0:
      if (dir == "rt") {
        this.avatar.faceLeft();
      }

      prompt.displayMessage("Good morning, sleepyhead!", this.name);
      break;

    case 1:
      prompt.updateMessage("You better hurry to work, you're running kind of late, eh?", this.name);
      break;

    case 2:
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

// Add Liam object to game's NPC collection.
var liam = new Liam();
game.addNPC(liam.name, liam);