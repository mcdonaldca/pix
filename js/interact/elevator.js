function Elevator() {
  $.extend(this, new NPC(""))
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
      this.currentOption = 1;
      this.displayOptions(this.floorOptions);
      break;

    case 1:
      console.log(this.floorOptions[this.currentOption]);
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
  switch(this.currentOption) {
    case 0: exit = "roof"; break;
    case 1: exit = "floor-1"; break;
    case 2: exit = "apt-hallway"; break;
    case 3: exit = "lobby"; break;
    default: break;
  }
  return exit;
}