/**
  The Elevator object is used in the apartment building.
  Manages select options and exit routes.
  @param floor (Optional) The starting floor.
**/
function Elevator(floor) {
  floor = floor || 0;
  this.floor = floor;
  this.exit = floor;
  this.count = 0;
  this.floorOptions = [
    "Roof", 
    "Floor 2", 
    "Floor 1", 
    "Lobby"
  ];
}

/**
  Called when the player interacts with the Elevator (presses space).
  @param prompt The interface to the on-screen prompter.
  @param dir    (Not used here) The direction the user is facing.
  @return The current game status.
**/
Elevator.prototype.interact = function(prompt, dir) {
  var status = "convo"

  switch(this.count) {
    case 0:
      prompt.displayOptions(
        "Which floor?",
        this.floorOptions,
        "",
        this.floor,
        true
        );
      break;

    case 1:
      this.exit = prompt.selected();
      prompt.removeOptions();

      this.count = -1; // Will increment to 0 (to reset) at end of function.
      status = "exit"; // Tells the game we're exiting to a different location.
      break;

    default:
      break;
  }

  this.count += 1;
  return status;
}

/**
  Called when player presses up arrow.
  @param prompt The interface to the on-screen prompter.
**/
Elevator.prototype.arrowUp = function(prompt) {
  prompt.arrowUp();
}

/**
  Called when player presses down arrow.
  @param prompt The interface to the on-screen prompter.
**/
Elevator.prototype.arrowDown = function(prompt) {
  prompt.arrowDown();
}

/**
  Getter for the exiting location.
  @return The name of the next area.
**/
Elevator.prototype.exitTo = function() {
  var exit = "";
  switch(this.exit) {
    case 0: exit = "elevator-roof"; break;
    case 1: exit = "elevator-apt-2"; break;
    case 2: exit = "elevator-apt-1"; break;
    case 3: exit = "elevator-lobby"; break;
    default: break;
  }
  return exit;
}