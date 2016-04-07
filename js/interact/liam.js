function Liam() {
  $.extend(this, new NPC("liam"));
  this.shadow = "shadow_lg";
  this.image = "characters/liam";

  this.talkedTo = false;
}

Liam.prototype.interact = function(dir) {
  this.talkedTo = true;
  var status = "convo"

  switch(this.count) {
    case 0:
      if (dir == "rt") {
        this.avatar.faceLeft();
      }

      this.messages.show();
      this.displayMessage("Good morning, sleepyhead!");
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