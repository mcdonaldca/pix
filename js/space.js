function Space(options) {
  this.options = options || {};
}

Space.prototype.isBasic = function() {
  return options == {};
}

Space.prototype.updateOptions = function(new_options) {
  $.extend(this.options, new_options);
}

Space.prototype.isBlocked = function(dir) {
  if (this.options.blocked != undefined) {
    if (this.options.blocked_dir != undefined) {
      return $.inArray(dir, this.options.blocked_dir) != -1;
    } else {
      return true;
    }
  }
  return false;
}

Space.prototype.blockedFrom = function() {
  return this.isBlocked() ? this.options.blocked_dir : [];
}

Space.prototype.isShowZone = function() {
  return this.options.show != undefined && this.options.show;
}

Space.prototype.itemToShow = function() {
  return this.isShowZone() ? this.options.item : "";
}

Space.prototype.isInteractZone = function() {
  return this.options.interaction != undefined 
    && this.options.interact_dir == undefined;
}

Space.prototype.canInteract = function(dir) {
  if (this.options.interaction != undefined) {
    if (this.options.interact_dir != undefined) {
      return $.inArray(dir, this.options.interact_dir) != -1;
    }
  }
  return false;
}

Space.prototype.interaction = function() {
  return this.options.interaction;
}

Space.prototype.hasExitAdjacent = function(dir) {
  if (this.options.exit_adj != undefined) {
    if ($.inArray(dir, this.options.exit_dir) != -1) {
      return true;
    }
  }
  return false;
}

Space.prototype.hasDoor = function() {
  return this.options.door != undefined;
}

Space.prototype.door = function() {
  return this.hasDoor() ? this.options.door : "";
}

Space.prototype.exitTo = function() {
  return this.options.exit_adj != undefined ? this.options.exit_to : "";
}