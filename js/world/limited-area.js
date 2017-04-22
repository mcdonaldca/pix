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
  this.class = "LimitedArea";

  this.limited = true;         // Marks the area as a limited hours.
  this.fullName = fullName;    // Full name of the area.
  this.hoursText = hours[0]    // Text description of hours.
  this.hours = hours[1];       // List of hours specifications.
  this.exitTo = exitTo;        // Area to exit to when the area closes.
}



/**
  Returns a message declaring the area's hours.
  @return Message object.
**/
LimitedArea.prototype.hoursMessage = function() {
  return new Message([this.fullName.toUpperCase(), this.hoursText]);
};



/**
  Whether or not the place is open.
  @return Boolean
**/
LimitedArea.prototype.isOpen = function(weekday, hour) {
  var todaysHours = this.hours[weekday];
  if (todaysHours.length == 0) return false;

  return hour >= todaysHours[0] && hour <= todaysHours[1] - 1;
};



/**
  Whether or not the place is closed.
  @return Boolean
**/
LimitedArea.prototype.isClosed = function(weekday, hour) {
  return !this.isOpen(weekday, hour);
};



/**
  Returns the hour of closing for the area.
  @return The hour.
**/
LimitedArea.prototype.closingTime = function(weekday) {
  var todaysHours = this.hours[weekday];
  if (todaysHours.length == 0) return 0;

  return todaysHours[1];
};



/**
  Getter for Area.fullName
  @return The area's full name.
**/
LimitedArea.prototype.getFullName = function() {
  return this.fullName;
};



/**
  Getter for Area.exitTo
  @return The area to exit to when the area closes.
**/
LimitedArea.prototype.getExitTo = function() {
  return this.exitTo;
};