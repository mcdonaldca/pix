/**  
  An area object that's only available at certain hours.
  @param width  The width of the area (in blocks).
  @param height The height of the area (in blocks);
  @param name   The name of the area. Should also be the name of the svg.
  @param mask   Whether or not a mask file should be processed.
**/
function LimitedArea(width, height, name, fullName, hours, mask) {
  $.extend(this, new Area(width, height, name, mask));
  this.limited = true;
  this.fullName = fullName;
  this.hours = hours;
}

LimitedArea.prototype.hoursMessage = function() {
  return new Message([this.fullName.toUpperCase(), "Open " + this.hours[0]]);
};

LimitedArea.prototype.isOpen = function(time) {
  var todaysHours = this.hours[1][time.weekday];
  if (todaysHours.length == 0) return false;

  var currentHour = time.hour;
  if (time.timeOfDay == "PM" && currentHour != 12) currentHour += 12;

  return currentHour >= todaysHours[0] && currentHour <= todaysHours[1];
}

LimitedArea.prototype.isClosed = function(time) {
  return !this.isOpen(time);
};