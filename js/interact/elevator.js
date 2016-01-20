function Elevator() {
  $.extend(this, new NPC(""))
}

Elevator.prototype.interact = function(dir) {
  var status = "convo"

  switch(this.count) {
    case 0:
      this.messages.show();
      this.next_arrow.hide();
      this.display_message("Which floor?");
      break;

    case 1:
      this.display_message("");
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