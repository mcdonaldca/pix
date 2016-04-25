/**  
  An area object that's only available at certain hours.
  @param width    The width of the area (in blocks).
  @param height   The height of the area (in blocks);
  @param name     The name of the area. Should also be the name of the svg.
  @param fullName The full name (not key-shortened) of the area.
  @param hours    List of availability for the store.
  @param exitTo   Area to exit to when the area closes.
**/
function LimitedArea(width, height, name, fullName, hours, exitTo) {
  $.extend(this, new Area(width, height, name));
  this.limited = true;      // Marks the area as a limited hours.
  this.fullName = fullName; // Full name of the area.
  this.hours = hours;       // List of hours specifications.
  this.exitTo = exitTo;     // Area to exit to when the area closes.
}

/**
  Returns a message declaring the area's hours.
  @return Message object.
**/
LimitedArea.prototype.hoursMessage = function() {
  return new Message([this.fullName.toUpperCase(), "Open " + this.hours[0]]);
};

/**
  Whether or not the place is open.
  @return Boolean
**/
LimitedArea.prototype.isOpen = function(time) {
  var todaysHours = this.hours[1][time.weekday];
  if (todaysHours.length == 0) return false;

  return time.hour >= todaysHours[0] && time.hour <= todaysHours[1];
};

/**
  Whether or not the place is closed.
  @return Boolean
**/
LimitedArea.prototype.isClosed = function(time) {
  return !this.isOpen(time);
};

/**
  Returns the hour of closing for the area.
  @return The hour.
**/
LimitedArea.prototype.closing = function() {
  return this.hours[1][game.time.weekday][1];
};

/**
  Closes the area and forces the player to exit.
**/
LimitedArea.prototype.close = function() {
  var closing = new Message(this.fullName + " is now closed.");
  game.focus = closing;
  game.setStatus(closing.interact(this.prompt) || "free");
  game.exit(this.exitTo);
};