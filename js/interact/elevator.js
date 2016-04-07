/**
  The Elevator object is used in the apartment building.
  Manages select options and exit routes.
  @param currentSelect Option, the starting floor.
**/
function Elevator(currentSelect) {
  $.extend(this, new Interactable())

  currentSelect = currentSelect || 0;
  this.originalSelect = currentSelect;
  this.currentSelect = currentSelect;
  this.floorOptions = [
    "Roof", 
    "Floor 2", 
    "Floor 1", 
    "Lobby"
  ];
}

/**
  Called when the player interacts with the Elevator (presses space).
  @param dir The direction the user is facing (not used here).
  @return The current game status.
**/
Elevator.prototype.interact = function(dir) {
  var status = "convo"

  switch(this.count) {
    case 0:
      // Reset the current selection to our original selection upon beginning.
      this.currentSelect = this.originalSelect;
      // Display the message.
      this.displayMessage("Which floor?");
      this.messages.show();
      // Since we're displaying a select arrow, hide the "next" arrow.
      this.nextArrow.hide();
      // Display the floor options and mark the original selection.
      this.displayOptions(this.floorOptions, true);
      this.options.show();
      break;

    case 1:
      // Clear display.
      this.displayMessage("");
      this.messages.hide();
      this.displayOptions([""]);
      this.options.hide();
      // Re-show next arrow for next time an interactable uses the display.
      this.nextArrow.show(); 

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
  Getter for the exiting location.
  @return The name of the next area.
**/
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