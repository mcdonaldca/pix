/**
  Initial apartment for the player.
**/
function RundownApt() {
  $.extend(this, new Area(7, 7, 'rundown-apt'));

  // Collection of rundown items to hide as renovations are paid for.
  this.renovations = {}; 

  this.addItem(1, 'bed',    [5, 4]);
  this.addItem(1, 'covers', [5, 5]);

  this.addRenovation(5, 3, 'wallpaper', [1, 0], 0);
  this.addRenovation(1, 2, 'window',    [4, 0], 1);
  this.addRenovation(5, 5, 'carpet',    [1, 2], 0);
  this.addRenovation(1, 3, 'linens',    [5, 4], 1);

  this.addInteraction(1, 2, new Fridge(), [DIR.UP]);
  this.addInteraction(5, 5, new SleepZone());

  this.addExit(2, 6, DIR.DW, 'le-chateau-floor-1');
  this.addPositionData(3, 5, DIR.UP, 'default');
}

/**
  Hides objects that are being renovated.
  @param item  The item to renovate.
  @param final Boolean, if this is the last item.
  @return Function that renovates the room. 
**/
RundownApt.prototype.renovate = function(item, final) {
  return function() {
    var area = game.areas['rundown-apt'];
    var div = area.renovations[item];
    $(div).remove();

    // Update bed items
    if (item == 'linens') {
      area.items['bed'].css('background-position', (BLOCK * MULT).toString() + 'px 0');
      area.items['covers'].css('background-position', (BLOCK * MULT).toString() + 'px 0');
    }
  }
}

/**
  Adds a renovation item.
  @param width      Width of the item.
  @param height     Height of the item.
  @param item       The name of the item.
  @param startCoord Starting coordinate to place item at.
  @param z          Z-index of the object.
**/
RundownApt.prototype.addRenovation = function(width, height, item, startCoord, z) {
  var translateX = (startCoord[0] * BLOCK * MULT).toString() + 'px';
  var translateY = (startCoord[1] * BLOCK * MULT).toString() + 'px';

  /* Sample HTML
     <div class='item item-bed'></div>
  */
  var div = document.createElement('div');
  $(div).addClass('item item-' + item)
        .css('width', (width * BLOCK * MULT).toString() + 'px')
        .css('height', (height * BLOCK * MULT).toString() + 'px')
        .css('transform', 'translate(' + translateX + ', ' + translateY + ')')
        .css('z-index', z)
        .css('background-image', 'url(img/items/' + this.name + '/' + item + '.svg)');

  // Add to element collection.
  this.renovations[item] = div;
  this.append(div);
}