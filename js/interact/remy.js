function Remy() {
  $.extend(this, new NPC("remy"));
  this.shadow = "shadow_sm";
  this.image = "pets/test-pet";

  this.talkedTo = false;
}

Remy.prototype.interact = function(dir) {
  this.talkedTo = true;
  var status = "convo"

  switch(this.count) {
    case 0:
      if (dir == "lf") {
        this.avatar.faceRight();
      } else if (dir == "up") {
        this.avatar.faceDown();
      } else if (dir == "rt") {
        this.avatar.faceLeft();
      } else if (dir == "dw") {
        this.avatar.faceUp();
      } 

      this.messages.show();
      this.displayMessage("Bark!");
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