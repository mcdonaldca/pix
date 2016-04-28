/**
  The Space object holds all information about a particular space in the game.
  ex. blocked directions, whether it's an interaction, or event zone, etc.
**/
function Space() {
  // Variables initialized through setters.
  this.blocked = undefined;     // The directions the space is blocked from.
  this.occupied = undefined;    // The NPC the space is occupied by.
  this.interaction = undefined; // The Interactable object for the space.
  this.interactDir = undefined; // The directions from which the space can interact.
  this.event = undefined;       // The Event object for the space.
  this.exit = undefined;        // Where the exit leads.
  this.exitDir = undefined;     // The direction to face to exit.
  this.door = undefined;        // The door (left or right) the player would exit through.
}

/**
  Setter for Space.blocked.
  @param dir The directions the space is blocked from.
**/
Space.prototype.setBlocked = function(dir) {
  this.blocked = dir;
}

/**
  Returns true if the space is blocked from a particular direction.
  @param dir The direction the player is attempting to move from.
  @return Boolean
**/
Space.prototype.isBlocked = function(dir) {
  var isBlockedDir = false;
  if (this.blocked != undefined) {
    isBlockedDir = this.blocked.indexOf(dir) != -1;
  }
  return isBlockedDir || this.isOccupied();
}

/**
  Getter for Space.blocked.
  @return An array of blocked directions.
**/
Space.prototype.blockedFrom = function() {
  return this.blocked != undefined ? this.blocked : [];
}





/**
  Setter for Space.occupied.
  @param npc The NPC occupying the space.
**/
Space.prototype.setOccupied = function(npc) {
  this.occupied = npc;
}

/**
  Setter for Space.occupied.
**/
Space.prototype.setUnoccupied = function() {
  this.occupied = undefined;
}

/**
  Returns true if the space is occupied by an NPC.
  @return Boolean.
**/
Space.prototype.isOccupied = function() {
  return this.occupied != undefined;
}

/**
  Getter for Space.occupied.
  @return NPC object (undefined if not occupied).
**/
Space.prototype.getOccupant = function() {
  return this.occupied;
}





/**
  Setter for Space.interaction.
  @param interaction The Interactable object for the space.
**/
Space.prototype.setInteractionZone = function(interaction) {
  this.interaction = interaction;
}

/**
  Setter for Space.interactDir.
  @param dir The directions from which the space can interact.
**/
Space.prototype.setInteractionDirection = function(dir) {
  this.interactDir = dir;
}

/**
  Returns true if the space has an Interactable.
  @return Boolean
**/
Space.prototype.isInteractZone = function() {
  return this.interaction != undefined 
    && this.interactDir == undefined;
}

/**
  Returns true if the space can be interacted with from a particular direction.
  @param dir The direction the player is trying to interact from.
**/
Space.prototype.canInteract = function(dir) {
  if (this.interactDir != undefined) {
    return this.interactDir.indexOf(dir) != -1;
  }
  return false;
}

/**
  Getter for Space.interaction.
  @return Interactable
**/
Space.prototype.getInteraction = function() {
  return this.interaction;
}





/**
  Setter for Space.event.
  @param event The Event object for the space.
**/
Space.prototype.setEvent = function(event) {
  this.event = event;
}

/**
  Returns true if the event has a space.
  @return Boolean
**/
Space.prototype.hasEvent = function() {
  return this.event != undefined;
}

/** 
  Getter for Space.event.
  @returns Event
**/
Space.prototype.getEvent = function() {
  return this.event;
}





/**
  Setter for Space.exit.
  @param dir      The direction to face to exit.
  @param location Where the exit leads.
**/
Space.prototype.setExit = function(dir, location) {
  this.exit = location;
  this.exitDir = dir;
}

/**
  Setter for Space.door.
  @param door The door (left or right) the player would exit through.
**/
Space.prototype.setExitDoor = function(door) {
  this.door = door;
}

/**
  Returns true if the player is facing an exit.
  @param dir The direction the player is facing.
  @return Boolean
**/
Space.prototype.hasExitAdjacent = function(dir) {
  return this.exit != undefined && this.exitDir == dir;
}

/**
  Returns true if the exit has a specified door.
  @return Boolean
**/
Space.prototype.hasExitDoor = function() {
  return this.door != undefined;
}

/**
  Getter for Space.door.
  @return String
**/
Space.prototype.getDoor = function() {
  return this.hasExitDoor() ? this.door : "";
}

/**
  Getter for Space.exit.
  @return String (area to exit to).
**/
Space.prototype.exitTo = function() {
  return this.exit != undefined ? this.exit : "";
}