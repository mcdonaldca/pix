/**
  An area object that's only available if the occupant is present.
  @param width     The width of the area (in blocks).
  @param height    The height of the area (in blocks);
  @param name      The name of the area. Should also be the name of the svg.
  @param residents A list of NPCs who own the space.
  @param exitTo    Area to exit to when the area should clear.
**/
function ResidentialArea(width, height, name, residents, exitTo) {
  $.extend(this, new Area(width, height, name));
  this.class = 'ResidentialArea';

  this.residential = true;
  this.residents = residents; // The owners of the space.
  this.exitTo = exitTo;       // Area to exit to when the area closes.
}

/**
  Determine if the residents of an area are present.
  @return T/F is one of the residents is present.
**/
ResidentialArea.prototype.residentsPresent = function() {
  var someoneHome = false;
  for (var i = 0; i < this.residents.length; i++) {
    someoneHome = someoneHome || this.hasNPC(this.residents[i]);
  }
  return someoneHome;
};

/**
  Determine if the occupants of an area are not present.
  @return T/F is none of the occupants are present.
**/
ResidentialArea.prototype.residentsAbsent = function() {
  return !this.residentsPresent();
};