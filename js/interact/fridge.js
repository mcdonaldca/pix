function Fridge() {
  $.extend(this, new Interactable());
}

Fridge.prototype.interact = function(dir) {
  var status = "convo"

  switch(this.count) {
    case 0:
      this.messages.show();
      this.displayMessage("You munched some cereal.");
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