function SleepZone() {
  $.extend(this, new Interactable());
}

SleepZone.prototype.interact = function(dir) {
  var status = "convo"

  switch(this.count) {
    case 0:
      this.messages.show();
      this.displayMessage("It's a little early for a nap.");
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