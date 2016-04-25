/**
  Rama
**/
function Rama() {
  $.extend(this, new NPC("rama", "characters/rama", "shadow_sm"));
}

/**
  No interaction needed for now.
**/
Rama.prototype.interact = function(prompt, dir) {
  var status = "focused";

  switch (this.count) {
    case 0:
      if (dir == "dw") this.avatar.faceUp();
      else if (dir == "lf") this.avatar.faceRight();

      if (!this.talkedTo) {
        game.prompt.displayMessage("Hi! You're the new barista, right? I'm Rama.", "rama");
        this.talkedTo = true;
      } else {
        game.prompt.displayMessage("Good morning! It's a beautiful day.", "rama");
      }
      break;

    case 1:
      game.prompt.removeMessage();
      this.avatar.faceLeft();
      this.count = -1;
      status = "free";
      break;

    default:
      break;
  }

  this.count += 1;
  return status;
}

// Add Rama object to game's NPC collection.
var rama = new Rama();
game.addNPC(rama.name, rama);