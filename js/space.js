/**
  The Space object holds all information about a particular space in the game.
  ex. blocked directions, whether it's an interaction, or event zone, etc.
  @param area The area the space is in.
  @param x    The space's x value.
  @param y    The space's y value.
**/
function Space(area, x, y) {
  this.class = "space";

  // Space's unique identifier. 
  this.id = area + '-' + x.toString() + '-' + y.toString();
  
  // Variables initialized through setters.
  this.blocked = undefined;     // The directions the space is blocked from.
  this.occupied = undefined;    // The NPC the space is occupied by.
  this.interaction = undefined; // The Interactable object for the space.
  this.interactDir = undefined; // The directions from which the space can interact.
  this.event = undefined;       // The Event object for the space.
  this.exit = undefined;        // Where the exit leads.
  this.exitDir = undefined;     // The direction to face to exit.
  this.door = undefined;        // The door (left or right) the player would exit through.
  this.paths = undefined;       // Directions an NPC can travel from the current space.
}

/**
  Setter for Space.blocked.
  @param dir The directions the space is blocked from.
  @returns   The space object, for chaining calls.
**/
Space.prototype.setBlocked = function(dir) {
  this.blocked = dir;
  return this;
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
  Marks a space as unblocked.
  @returns The space object, for chaining calls.
**/
Space.prototype.unblock = function() {
  this.blocked = undefined;
  return this;
}




/**
  Setter for Space.occupied.
  @param npc The NPC occupying the space.
  @returns   The space object, for chaining calls.
**/
Space.prototype.setOccupied = function(npc) {
  this.occupied = npc;
  return this;
}

/**
  Setter for Space.occupied.
  @returns The space object, for chaining calls.
**/
Space.prototype.setUnoccupied = function() {
  this.occupied = undefined;
  return this;
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
  @returns           The space object, for chaining calls.
**/
Space.prototype.setInteractionZone = function(interaction) {
  this.interaction = interaction;
  return this;
}

/**
  Setter for Space.interactDir.
  @param dir The directions from which the space can interact.
  @returns   The space object, for chaining calls.
**/
Space.prototype.setInteractionDirection = function(dir) {
  this.interactDir = dir;
  return this;
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
  var validInteractDir = this.interactDir != undefined && this.interactDir.indexOf(dir) != -1;
  return validInteractDir || this.isOccupied();
}

/**
  Getter for Space.interaction.
  @return Interactable
**/
Space.prototype.getInteraction = function() {
  return this.getOccupant() || this.interaction;
}

/** 
  Sets a space as no longer an interaction zone.
  @returns The space object, for chaining calls.
**/
Space.prototype.clearInteractionZone = function() {
  this.interaction = undefined;
  this.interactDir = undefined;
  return this;
}





/**
  Setter for Space.event.
  @param event The Event object for the space.
  @returns     The space object, for chaining calls.
**/
Space.prototype.setEvent = function(event) {
  this.event = event;
  return this;
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
  @returns        The space object, for chaining calls.
**/
Space.prototype.setExit = function(dir, location) {
  this.exit = location;
  this.exitDir = dir;
  return this;
}

/**
  Setter for Space.door.
  @param door The door (left or right) the player would exit through.
  @returns    The space object, for chaining calls.
**/
Space.prototype.setExitDoor = function(door) {
  this.door = door;
  return this;
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





/** PATH + NODE RELATED METHODS **/

/**
  Getter for space's unique ID.
  @returns Space.id
**/
Space.prototype.getId = function() {
  return this.id;
}

/**
  Setter for the path directions a space can go.
  @param paths The list of directions.
  @returns     The space object, for chaining calls.
**/
Space.prototype.setPaths = function(paths) {
  this.paths = paths;
  return this;
}

/**
  Setter for the path directions a space can go.
  @returns The list of directions.
**/
Space.prototype.getPaths = function() {
  return this.paths;
}

/**
  If a space has determined paths.
  @returns T/F if there are paths for this space.
**/
Space.prototype.hasPaths = function() {
  return this.paths && this.paths.length > 0;
}