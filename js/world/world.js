/**
  The master World object. Manages all areas and travel within the map.
**/
function World() {
  this.class = 'World';
  this.areas = {};
  this.currentArea = undefined;

  this.areaShadowEl = $('.area-shadow'); // Area shadow.
}



/**
  Adds an area to the world's collection.
  @param {Area} area The area to add.
**/
World.prototype.addArea = function(area) {
  this.areas[area.getName()] = area;
};



/**
  Returns an area from the area collection.
  @param area {string} The name of the area to return.
  @return {Area} The area object.
**/
World.prototype.getArea = function(area) {
  return this.areas[area];
};



/**
  Sets the current area.
  @param {Area} currentArea The new current area.
**/
World.prototype.setCurrentArea = function(currentArea) {
  this.currentArea = currentArea;
};



/**
  Getter for World.currentArea
  @return {Area} The current area.
**/
World.prototype.getCurrentArea = function() {
  return this.currentArea;
};



/**
  If we're in an outside space, update the dusk level of the space.
  @param {number} duskLevel The level of dusk to set.
**/
World.prototype.updateDuskLevel = function(duskLevel) {
  if (this.currentArea.isOutside()) {
    switch(duskLevel) {
      case 0:
        this.areaShadowEl.css('opacity', '0');
        break;

      case 1:
        this.areaShadowEl.css('opacity', '.4');
        break;

      case 2:
        this.areaShadowEl.css('opacity', '.6');
        break;

      default:
        break;
    } 
  } else {
    this.areaShadowEl.css('opacity', '0');
  }
};