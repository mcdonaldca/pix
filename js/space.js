/**
  The Space object holds all information about a particular space in the game.
  ex. blocked directions, whether it's a show, interaction, or event zone, etc.
**/
function Space() {
  this.data = {}; // Holds space information.

  // Variables initialized through setters.
  this.data.blocked = undefined;     // The directions the space is blocked from.
  this.data.show = undefined;        // The item if the space is a ShowZone.
  this.data.interaction = undefined; // The Interactable object for the space.
  this.data.interactDir = undefined; // The directions from which the space can interact.
  this.data.event = undefined;       // The Event object for the space.
  this.data.exit = undefined;        // Where the exit leads.
  this.data.exitDir = undefined;     // The direction to face to exit.
  this.data.door = undefined;        // The door (left or right) the player would exit through.
}

/**
  Setter for Space.data.blocked.
  @param dir The directions the space is blocked from.
**/
Space.prototype.setBlocked = function(dir) {
  this.data.blocked = dir;
}

/**
  Returns true if the space is blocked from a particular direction.
  @param dir The direction the player is attempting to move from
**/
Space.prototype.isBlocked = function(dir) {
  if (this.data.blocked != undefined) {
    return $.inArray(dir, this.data.blocked) != -1;
  }
  return false;
}

/**
  Getter for Space.data.blocked.
  @return An array of blocked directions.
**/
Space.prototype.blockedFrom = function() {
  return this.data.blocked != undefined ? this.data.blocked : [];
}





/**
  Setter for Space.data.show
  @param item The item for the ShowZone.
**/
Space.prototype.setShowZone = function(item) {
  this.data.show = item;
}

/**
  Returns true if the space is a ShowZone.
  @return Boolean
**/
Space.prototype.isShowZone = function() {
  return this.data.show != undefined;
}

/** 
  Getter for Space.data.show.
  @return The classname for the object.
**/
Space.prototype.itemToShow = function() {
  return this.isShowZone() ? this.data.show : "";
}





/**
  Setter for Space.data.interaction.
  @param interaction The Interactable object for the space.
**/
Space.prototype.setInteractionZone = function(interaction) {
  this.data.interaction = interaction;
}

/**
  Setter for Space.data.interactDir.
  @param dir The directions from which the space can interact.
**/
Space.prototype.setInteractionDirection = function(dir) {
  this.data.interactDir = dir;
}

/**
  Returns true if the space has an Interactable.
  @return Boolean
**/
Space.prototype.isInteractZone = function() {
  return this.data.interaction != undefined 
    && this.data.interactDir == undefined;
}

/**
  Returns true if the space can be interacted with from a particular direction.
  @param dir The direction the player is trying to interact from.
**/
Space.prototype.canInteract = function(dir) {
  if (this.data.interactDir != undefined) {
    return $.inArray(dir, this.data.interactDir) != -1;
  }
  return false;
}

/**
  Getter for Space.data.interaction.
  @return Interactable
**/
Space.prototype.interaction = function() {
  return this.data.interaction;
}





/**
  Setter for Space.data.event.
  @param event The Event object for the space.
**/
Space.prototype.setEvent = function(event) {
  this.data.event = event;
}

/**
  Returns true if the event has a space.
  @return Boolean
**/
Space.prototype.hasEvent = function() {
  return this.data.event != undefined;
}

/** 
  Getter for Space.data.event.
  @returns Event
**/
Space.prototype.event = function() {
  return this.data.event;
}





/**
  Setter for Space.data.exit.
  @param dir      The direction to face to exit.
  @param location Where the exit leads.
**/
Space.prototype.setExit = function(dir, location) {
  this.data.exit = location;
  this.data.exitDir = dir;
}

/**
  Setter for Space.data.door.
  @param door The door (left or right) the player would exit through.
**/
Space.prototype.setExitDoor = function(door) {
  this.data.door = door;
}

/**
  Returns true if the player is facing an exit.
  @param dir The direction the player is facing.
  @return Boolean
**/
Space.prototype.hasExitAdjacent = function(dir) {
  return this.data.exit != undefined
    && $.inArray(dir, this.data.exitDir) != -1;
}

/**
  Returns true if the exit has a specified door.
  @return Boolean
**/
Space.prototype.hasExitDoor = function() {
  return this.data.door != undefined;
}

/**
  Getter for Space.data.door.
  @return String
**/
Space.prototype.door = function() {
  return this.hasExitDoor() ? this.data.door : "";
}

/**
  Getter for Space.data.exit.
  @return String (area to exit to).
**/
Space.prototype.exitTo = function() {
  return this.data.exit != undefined ? this.data.exit : "";
}