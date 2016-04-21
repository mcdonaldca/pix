/**  
  The Area object manages the grid and spaces of a room/area.
  @param width  The width of the area (in blocks).
  @param height The height of the area (in blocks);
  @param name   The name of the area. Should also be the name of the svg.
  @param mask   Whether or not a mask file should be processed.
**/
function Area(width, height, name, mask) {
  this.width = width;   // Width of the area in blocks.
  this.height = height; // Height of the area in blocks.
  this.name = name;     // Name of the area.

  this.areaEl = $(".area"); // The area element to manipulate.

  // Following values are set in Area.setPlacementLimits
  this.maxX = undefined;   // Greatest translate X value (in blocks) area should go.
  this.minX = undefined;   // Smallest translate X value (in blocks) area should go.
  this.maxY = undefined;   // Greatest translate Y value (in blocks) area should go.
  this.minY = undefined;   // Smallest translate Y value (in blocks) area should go.
  this.setPlacementLimits();

  this.visited = false;   // If the area has been visited yet.
  this.limited = false;   // No hourly limit.

  this.items = {};        // Item collection.
  this.NPCs = [];         // Collection of NPCs in area.
  this.elements = [];     // HTML elements added to area.
  this.positionData = {}; // Player positioning based on entrances from other areas.

  this.grid = new Array(width); // Collection of spaces in the area.
  // Create a new Space object for every grid coordinate.
  for (var i = 0; i < width; i++) {
    this.grid[i] = new Array(height);
    for (var n = 0; n < height; n++) {
      this.grid[i][n] = new Space();
    }
  }

  // Only do mask processing if necessary.
  if (mask) {
    // We'll load the mask as an image and then check the image data.
    var image = new Image();
    image.crossOrigin = "Anonymous";

    // Process image data when mask image loads.
    var area = this;
    image.onload = function() {
      var canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;

      var context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);

      var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      
      // Iterating through BLOCKS, not individual pixels.
      for (var blockX = 0; blockX < area.width; blockX++) {
        for (var blockY = 0; blockY < area.height; blockY++) {
          // Find the (inclusive) bounds of the block.
          var xLeft = blockX * BLOCK;
          var yTop = blockY * BLOCK;
          var xRight = xLeft + BLOCK - 1;
          var yBottom = yTop + BLOCK - 1;
 
          // Find middle x and y coordinates.
          // Don't want to use pixel at corner of block.
          var xMid = xLeft + 8;
          var yMid = yTop + 8;

          // Using combinations of coordinates, find index in image data.
          var lfCheck = (yMid*imageData.width + xLeft) * 4;
          var upCheck = (yTop*imageData.width + xMid) * 4;
          var rtCheck = (yMid*imageData.width + xRight) * 4;
          var dwCheck = (yBottom*imageData.width + xMid) * 4;

          // Check if R value of pixel at each location is NOT "ff"
          // If the R value is anything else, should be non-white and indicate a mask.
          var lfBlocked = imageData.data[lfCheck].toString(16) != "ff";
          var upBlocked = imageData.data[upCheck].toString(16) != "ff";
          var rtBlocked = imageData.data[rtCheck].toString(16) != "ff";
          var dwBlocked = imageData.data[dwCheck].toString(16) != "ff";

          // Collect blocked directions.
          var blockedDirections = [];
          if (lfBlocked) { blockedDirections.push("rt"); }
          if (upBlocked) { blockedDirections.push("dw"); }
          if (rtBlocked) { blockedDirections.push("lf"); }
          if (dwBlocked) { blockedDirections.push("up"); }

          // If there are indeed blocked directions, set them on the related Space.
          if (blockedDirections.length > 0) {
            area.space(blockX, blockY).setBlocked(blockedDirections);
          }
        }
      }
    };
    
    // Onload will be called after image is set.
    image.src = "img/areas/" + this.name + "_mask.png";
  }
}

/**
  Called when we've entered an area and the HTML should be built out.
  @param removeEls The elements set by the previous area that should be removed.
**/
Area.prototype.build = function(removeEls, removeNPCs) {
  // Save that we've entered a new room.
  window.sessionStorage.setItem("room", name);

  // Remove previous area's elements.
  removeEls = removeEls || [];
  for (var i = 0; i < removeEls.length; i++) {
    $(removeEls[i]).remove();
  }

  // Remove previous area's NPCs.
  removeNPCs = removeNPCs || {};
  for (var i = 0; i < removeNPCs.length; i++) {
    $(removeNPCs[i].obj.getEl()).remove();
  }

  // Set the height and width of the area element.
  // Set the background image to the area's svg.
  this.areaEl.css("width", (this.width * BLOCK * MULT).toString() + "px")
             .css("height", (this.height * BLOCK * MULT).toString() + "px")
             .css("background-image", "url(img/areas/" + this.name + ".svg)");

  // Add all the elements created upon intialization of the area.
  for (var i = 0; i < this.elements.length; i++) {
    this.append(this.elements[i]);
  }

  // Add and place all NPCs.
  for (var i = 0; i < this.NPCs.length; i++) {
    var npc = this.NPCs[i];
    npc.obj.place(npc.x, npc.y, npc.dir);
    npc.obj.avatar.show();
    this.append(npc.obj.getEl());
  }
}

/**
  Called to set the max and min values to position the area within the game window.
**/
Area.prototype.setPlacementLimits = function() {
  var GAME_WIDTH = 11;
  var GAME_HEIGHT = 11;

  // If the area isn't as wide or as tall as the game window, the max and min
  // should be the same (and centered within the game window). If the area is
  // wider or taller than the game window, the greatest offset should be 0 and 
  // the smallest offset should be all of the area hidden but the width or height
  // of the game window.

  if (this.width < GAME_WIDTH) {
    this.maxX = (GAME_WIDTH - this.width) / 2;
    this.minX = this.maxX;
  } else {
    this.maxX = 0;
    this.minX = -1 * (this.width - GAME_WIDTH);
  }

  if (this.height < GAME_HEIGHT) {
    this.maxY = (GAME_HEIGHT - this.height) / 2;
    this.minY = this.maxY;
  } else {
    this.maxY = 0;
    this.minY = -1 * (this.height - GAME_HEIGHT);
  }
}

/**
  Called when the player moves and the area position may need to be adjusted.
  @param playerX The player's new x coordinate.
  @param playerY The player's new y coordinate.
**/
Area.prototype.updateAreaPosition = function(playerX, playerY) {
  var translateX = (-1 * (playerX - 5) * BLOCK * MULT).toString() + "px";
  if (playerX <= 4) {
    translateX = (this.maxX * BLOCK * MULT).toString() + "px";
  } else if (playerX >= this.width - 5) {
    translateX = (this.minX * BLOCK * MULT).toString() + "px";
  }

  var translateY = (-1 * (playerY - 5) * BLOCK * MULT).toString() + "px";
  if (playerY <= 5) {
    translateY = (this.maxY * BLOCK * MULT).toString() + "px";
  } else if (playerY >= this.height - 6) {
    translateY = (this.minY * BLOCK * MULT).toString() + "px";
  }

  this.areaEl.css("transform", "translate(" + translateX + ", " + translateY + ")");
}

/**
  Adds information about player positioning when entering an area.
  @param areaFrom The area the player is coming from.
  @param door     The door the player is coming from (optional, can be null).
  @param x        The x coordinate to be placed at.
  @param y        The y coordinate to be placed at.
  @param face     The direction to be facing.
**/
Area.prototype.addPositionData = function(areaFrom, door, x, y, face) {
  // Construct a key for the postionData map
  // Concatinates the are and door (if there is a door).
  // ex. apt-1-left, apt-1-right, studio
  var key = areaFrom;
  if (door != null && door != "") {
    key += "-" + door;
  }
  this.positionData[key] = { x: x, y: y, face: face};
}

/**
  Find where the player should be placed give they came from a certain area/door.
  @param areaFrom The area the player is coming from.
  @param door     The door the player is coming from.
**/
Area.prototype.getPositionData = function(areaFrom, door) {
  // Construct key from information.
  var key = areaFrom;
  if (door != null && door != "") {
    key += "-" + door;
  }

  // If we have that particular key.
  if (key in this.positionData) {
    return this.positionData[key];

  // Don't have the key, but have a default location.
  } else if (this.positionData.default != undefined) {
    return this.positionData.default;

  // Don't have the key or a default
  // Shouldn't arrive at this unless something was incorrectly set up.
  } else {
    return { x: 0, y: 0, face: "up"};
  }
}

/**
  Returns a space from the Area's grid.
  @param x The x block coordinate.
  @param y The y block coordinate.
  @return Space object or undefined if not a valid x, y coordinate pair.
**/
Area.prototype.space = function(x, y) {
  return this.validZone(x,y) ? this.grid[x][y] : undefined;
}

/** 
  Checks if the x, y coordinate is within the Area's grid.
  @param x The x block coordinate.
  @param y The y block coordinate.
  @return Boolean
**/
Area.prototype.validZone = function(x, y) {
  return x >= 0 &&
         x <= this.width - 1 &&
         y >= 0 &&
         y <= this.height - 1;
}

/**
  Adds new items to an area.
  @param width      Width of the item.
  @param item       The name of the item.
  @param startCoord Starting coordinate to place item at.
  @param extra      Any extra z-index padding (allows for fine-tuning).
**/
Area.prototype.addItem = function(width, item, startCoord, extra) {
  // Extra z-index padding.
  extra = extra || 0;
  var translateX = (startCoord[0] * BLOCK * MULT).toString() + "px";
  var translateY = (startCoord[1] * BLOCK * MULT).toString() + "px";

  /* Sample HTML
     <div class="item item-bed"></div>
  */
  var div = document.createElement("div");
  $(div).addClass("item item-" + item)
        .css("width", (width * BLOCK * MULT).toString() + "px")
        .css("height", (BLOCK * MULT).toString() + "px")
        .css("transform", "translate(" + translateX + ", " + translateY + ")")
        .css("z-index", (startCoord[1] + 1) * 10 + 5 + extra)
        .css("background-image", "url(img/items/" + this.name + "/" + item + ".svg)");

  // Customizable items have extra background sizing.
  var exceptions = {
    "rundown-apt": {
      "bed": 2,
      "covers": 2
    }
  };

  if (exceptions[this.name] != undefined && exceptions[this.name][item] != undefined) {
    var ex = exceptions[this.name][item];
    $(div).css(
      "background-size", 
      (width * ex * BLOCK * MULT).toString() + "px " + (BLOCK * MULT).toString() + "px"
      );
  }

  // Add to element collection.
  this.elements.push(div);
  // Add to item collection.
  this.items[item] = $(div);
}

/**
  Adds an interaction to a Space.
  @param x           The x coordinate to add interaction at.
  @param y           The y coordinate to add interaction at.
  @param interaction Interactable object.
  @param dir         Directions from which interaction are valid (optional).
**/
Area.prototype.addInteraction = function(x, y, interaction, dir) {
  dir = dir || [];
  this.space(x, y).setInteractionZone(interaction)
  if (dir.length > 0) {
    this.space(x, y).setInteractionDirection(dir);
  }
}

/**
  Creates the NPC element, then calles Space.addInteraction.
  @param x           The x coordinate to add interaction at.
  @param y           The y coordinate to add interaction at.
  @param dir         The direction for the NPC to start facing.
  @param npc         NPC object.
  @param interactDir (Optional) Directions from which interaction are valid.
**/
Area.prototype.addNPC = function(x, y, dir, npc, interactDir) {
  // Add to NPC collection.
  this.NPCs.push({ obj: npc, x: x, y: y, dir: dir });
  // Call addInteraction with parameters.
  this.addInteraction(x, y, npc, interactDir);
}

/**
  Adds new event zones to an area.
  @param startCoord Array of x, y coordinate (top left).
  @param endCoord   Array of x, y coordinate (bottom right).
  @param event      The event for the Spaces.
**/
Area.prototype.addEventZone = function(startCoord, endCoord, event) {
  // Go from top left to bottom right coordinates (inclusive).
  for (var x = startCoord[0]; x < endCoord[0] + 1; x++) {
    for (var y = startCoord[1]; y > endCoord[1] - 1; y--) {
      this.space(x, y).setEvent(event);
    }
  }
  
  // Add any elements the event needs created.
  eventElements = event.getElements();
  for (var i = 0; i < eventElements.length; i++) {
    this.elements.push(eventElements[i]);
  }
}

/**
  Adds an exit to an area.
  @param x        The x coordinate of the exit-adjacent Space.
  @param y        The y coordinate of the exit-adjacent Space.
  @param dir      The direction of the exit from the Space.
  @param location The area to exit to.
  @param door     The door exiting from (optional).
**/
Area.prototype.addExit = function(x, y, dir, location, door) {
  door = door || ""
  this.space(x, y).setExit(dir, location);
  if (door != "") {
    this.space(x, y).setExitDoor(door);
  }
}

/**
  Gets an item that belongs to the area.
  @param key The key for the item map.
  @return The HTML element for the item.
**/
Area.prototype.getItem = function(key) {
  return this.items[key];
}

/**
  Getter for Area.name
  @return The area name.
**/
Area.prototype.getName = function() {
  return this.name;
}

/**
  Appends an HTML element to the area element.
  @param el The element to append.
**/
Area.prototype.append = function(el) {
  this.areaEl.append(el);
}

/** 
  Marks the area as visited.
**/
Area.prototype.setVisited = function() {
  this.visited = true;
};

/** 
  Getter for Area.visited.
  @return Boolean
**/
Area.prototype.isVisited = function() {
  return this.visited;
};

/**
  Getter for Area.limited.
  @param Boolean
**/
Area.prototype.isLimited = function() {
  return this.limited;
}