function Space() {
  this.data = {};
}

Space.prototype.setBlocked = function(dir) {
  this.data.blocked = dir;
}

Space.prototype.isBlocked = function(dir) {
  if (this.data.blocked != undefined) {
    return $.inArray(dir, this.data.blocked) != -1;
  }
  return false;
}

Space.prototype.blockedFrom = function() {
  return this.data.blocked != undefined ? this.data.blocked : [];
}





Space.prototype.setShowZone = function(item) {
  this.data.show = item;
}

Space.prototype.isShowZone = function() {
  return this.data.show != undefined;
}

Space.prototype.itemToShow = function() {
  return this.isShowZone() ? "item-" + this.data.show : "";
}





Space.prototype.setInteractionZone = function(interaction) {
  this.data.interaction = interaction;
}

Space.prototype.setInteractionDirection = function(dir) {
  this.data.interactDir = dir;
}

Space.prototype.isInteractZone = function() {
  return this.data.interaction != undefined 
    && this.data.interactDir == undefined;
}

Space.prototype.canInteract = function(dir) {
  if (this.data.interactDir != undefined) {
    return $.inArray(dir, this.data.interactDir) != -1;
  }
  return false;
}

Space.prototype.interaction = function() {
  return this.data.interaction;
}





Space.prototype.setEvent = function(event) {
  this.data.event = event;
}

Space.prototype.hasEvent = function() {
  return this.data.event != undefined;
}

Space.prototype.event = function() {
  return this.data.event;
}





Space.prototype.setExit = function(dir, location) {
  this.data.exit = location;
  this.data.exit_dir = dir;
}

Space.prototype.setExitDoor = function(door) {
  this.data.door = door;
}

Space.prototype.hasExitAdjacent = function(dir) {
  return this.data.exit != undefined
    && $.inArray(dir, this.data.exit_dir) != -1;
}

Space.prototype.hasExitDoor = function() {
  return this.data.door != undefined;
}

Space.prototype.door = function() {
  return this.hasExitDoor() ? this.data.door : "";
}

Space.prototype.exitTo = function() {
  return this.data.exit != undefined ? this.data.exit : "";
}