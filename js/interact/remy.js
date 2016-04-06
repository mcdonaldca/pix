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
        this.avatar.css("background-position", "0 " + (-29 * this.MULT).toString() + "px");
      } else if (dir == "up") {
        this.avatar.css("background-position", "0 0");
      } else if (dir == "rt") {
        this.avatar.css("background-position", "0 " + (-87 * this.MULT).toString() + "px");
      } else if (dir == "dw") {
        this.avatar.css("background-position", "0 " + (-58 * this.MULT).toString() + "px");
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