function Elevator() {
  $.extend(this, new NPC(""))
}

Elevator.prototype.interact = function(dir) {
  var status = "convo"

  switch(this.count) {
    case 0:
      this.messages.show();
      this.nextArrow.hide();
      this.displayMessage("Which floor?");

      this.options.show();
      this.currentOption = 1;
      this.displayOptions([
        "Roof",
        "Floor 2",
        "Floor 1",
        "Lobby"
      ]);
      break;

    case 1:
      this.displayMessage("");
      this.displayOptions([""]);
      this.messages.hide();
      this.nextArrow.show();
      this.options.hide();

      this.count = -1;
      status = "free";
      break;

    default:
      break;
  }

  this.count += 1;
  return status;
}