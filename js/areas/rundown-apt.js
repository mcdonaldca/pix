/**
  Initial apartment for the player.
**/
function RundownApt() {
  $.extend(this, new Area(5, 6, "rundown-apt"));
  this.renovations = {};
}

/**
  Hides objects that are being renovated.
  @param item  The item to renovate.
  @param final Boolean, if this is the last item.
  @return Function that renovates the room. 
**/
RundownApt.prototype.renovate = function(item, final) {
  return function() {
    var area = game.areas["rundown-apt"];
    var div = area.renovations[item];
    $(div).hide();

    // Update bed items
    if (item == "linens") {
      area.items["bed"].css("background-position", (BLOCK * MULT).toString() + "px 0");
      area.items["covers"].css("background-position", (BLOCK * MULT).toString() + "px 0");
    }

    // If it's the last renovations, remove all the items.
    if (final) {
      // Iterate through renovations object.
      for (var key in area.renovations) {
        if (area.renovations.hasOwnProperty(key)) {
          var itemDiv = area.renovations[key];
          var i = area.elements.indexOf(itemDiv);
          area.elements.splice(i, 1);
        }
      }
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
  var translateX = (startCoord[0] * BLOCK * MULT).toString() + "px";
  var translateY = (startCoord[1] * BLOCK * MULT).toString() + "px";

  /* Sample HTML
     <div class="item item-bed"></div>
  */
  var div = document.createElement("div");
  $(div).addClass("item item-" + item)
        .css("width", (width * BLOCK * MULT).toString() + "px")
        .css("height", (height * BLOCK * MULT).toString() + "px")
        .css("transform", "translate(" + translateX + ", " + translateY + ")")
        .css("z-index", z)
        .css("background-image", "url(img/items/" + this.name + "/" + item + ".svg)");

  // Add to element collection.
  this.renovations[item] = div;

  // Add to element collection.
  this.elements.push(div);
}

var rundownApt = new RundownApt();

rundownApt.addItem(1, "bed", [4, 3]);
rundownApt.addItem(1, "covers", [4, 4]);

rundownApt.addRenovation(5, 2, "wallpaper", [0, 0], 0);
rundownApt.addRenovation(1, 2, "window", [3, 0], 1);
rundownApt.addRenovation(5, 4, "carpet", [0, 2], 0);
rundownApt.addRenovation(1, 3, "linens", [4, 3], 1);

rundownApt.addInteraction(0, 1, new Fridge(), ["up"]);
rundownApt.addInteraction(4, 4, new SleepZone());

rundownApt.addExit(1, 5, "dw", "le-chateau-floor-1");
rundownApt.addPositionData(2, 4, "up", "default");

game.addArea(rundownApt.getName(), rundownApt);