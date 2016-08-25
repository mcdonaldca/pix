/**
  An area object that's only available if the occupant is present.
  @param width     The width of the area (in blocks).
  @param height    The height of the area (in blocks);
  @param name      The name of the area. Should also be the name of the svg.
  @param occupants A list of NPCs who own the space.
  @param exitTo    Area to exit to when the area should clear.
**/
function ResedentialArea(width, height, name, occupants, exitTo) {
  $.extend(this, new Area(width, height, name));
  this.residential = true;

  this.occupants = occupants; // The owners of the space.
  this.exitTo = exitTo;       // Area to exit to when the area closes.
}

/**
  Determine if the occupants of an area are present.
  @return T/F is one of the occupants is present.
**/
ResedentialArea.prototype.isOccupied = function() {
  var occupied = false;
  for (var i = 0; i < this.occupants.length; i++) {
    occupied = occupied || this.hasNPC(this.occupants[i]);
  }
  return occupied;
};

/**
  Determine if the occupants of an area are not present.
  @return T/F is none of the occupants are present.
**/
ResedentialArea.prototype.isUnoccupied = function() {
  return !this.isOccupied();
};