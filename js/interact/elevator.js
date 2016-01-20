function Elevator(currentSelect) {
  currentSelect = currentSelect || 0;
  $.extend(this, new NPC(""))
  this.currentSelect = currentSelect;
  this.floorOptions = [
    "Roof", 
    "Floor 2", 
    "Floor 1", 
    "Lobby"
  ];
}

Elevator.prototype.interact = function(dir) {
  var status = "convo"

  switch(this.count) {
    case 0:
      this.messages.show();
      this.nextArrow.hide();
      this.displayMessage("Which floor?");

      this.options.show();
      this.displayOptions(this.floorOptions, true);
      break;

    case 1:
      this.displayMessage("");
      this.displayOptions([""]);
      this.messages.hide();
      this.nextArrow.show();
      this.options.hide();

      this.count = -1;
      status = "exit";
      break;

    default:
      break;
  }

  this.count += 1;
  return status;
}

Elevator.prototype.exitTo = function() {
  var exit = "";
  switch(this.currentSelect) {
    case 0: exit = "elevator-roof"; break;
    case 1: exit = "elevator-apt-2"; break;
    case 2: exit = "elevator-apt-1"; break;
    case 3: exit = "elevator-lobby"; break;
    default: break;
  }
  return exit;
}