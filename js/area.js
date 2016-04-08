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
  this.maxLeft = undefined;   // Greatest left position (in blocks) area should go.
  this.minLeft = undefined;   // Smallest left position (in blocks) area should go.
  this.maxBottom = undefined; // Greatest bottom position (in blocks) area should go.
  this.minBottom = undefined; // Smallest bottom position (in blocks) area should go.
  this.setPlacementLimits();

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
      
      // NOTE: Image data is processed with 0, 0 being the top left coordinate.
      //       Our grid is stores with 0, 0 being the bottom left.
      //       Y-coord is manipulated at the end, when saving the data
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
            area.space(blockX, area.height - blockY - 1).setBlocked(blockedDirections);
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
Area.prototype.build = function(removeEls) {
  // Save that we've entered a new room.
  window.sessionStorage.setItem("room", name);
  // Set the background image to the area's svg.
  $(".area-img").attr("src", "img/areas/" + this.name + ".svg");

  // Remove previous area's elements.
  removeEls = removeEls || [];
  for (var i = 0; i < removeEls.length; i++) {
    $(removeEls[i]).remove();
  }

  // Set the height and width of the area element.
  this.areaEl.css("width", (this.width * BLOCK * MULT).toString() + "px")
             .css("height", (this.height * BLOCK * MULT).toString() + "px");

  // Add all the elements created upon intialization of the area.
  for (var i = 0; i < this.elements.length; i++) {
    this.areaEl.append(this.elements[i]);
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
    this.maxLeft = (GAME_WIDTH - this.width) / 2;
    this.minLeft = this.maxLeft;
  } else {
    this.maxLeft = 0;
    this.minLeft = -1 * (this.width - GAME_WIDTH);
  }

  if (this.height < GAME_HEIGHT) {
    this.maxBottom = (GAME_HEIGHT - this.height) / 2;
    this.minBottom = this.maxLeft;
  } else {
    this.maxBottom = 0;
    this.minBottom = -1 * (this.height - GAME_HEIGHT);
  }
}

/**
  Called when the player moves and the area position may need to be adjusted.
  @param playerX The player's new x coordinate.
  @param playerY The player's new y coordinate.
**/
Area.prototype.updateAreaPosition = function(playerX, playerY) {
  if (playerX <= 4) {
    this.areaEl.css("left", this.maxLeft * BLOCK * MULT);
  } else if (playerX >= this.width - 5) {
    this.areaEl.css("left", this.minLeft * BLOCK * MULT);
  } else {
    this.areaEl.css("left", -1 * (playerX - 5) * BLOCK * MULT);
  }

  if (playerY <= 4) {
    this.areaEl.css("bottom", this.maxBottom * BLOCK * MULT);
  } else if (playerY >= this.height - 5) {
    this.areaEl.css("bottom", this.minBottom * BLOCK * MULT);
  } else {
    this.areaEl.css("bottom", -1 * (playerY - 5) * BLOCK * MULT);
  }
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
  /* Sample HTML
     <div class="item item-bed"></div>
  */
  var div = document.createElement("div");
  $(div).addClass("item item-" + item)
        .css("width", (width * BLOCK * MULT).toString() + "px")
        .css("height", (BLOCK * MULT).toString() + "px")
        .css("left", (startCoord[0] * BLOCK * MULT).toString() + "px")
        .css("bottom", (startCoord[1] * BLOCK * MULT).toString() + "px")
        .css("z-index", (this.height - startCoord[1]) * 10 + 5 + extra)
        .css("background-image", "url(img/items/" + this.name + "/" + item + ".svg)");

  // Add to element collection.
  this.elements.push(div);
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
  @param x   The x coordinate to add interaction at.
  @param y   The y coordinate to add interaction at.
  @param npc NPC object.
  @param dir Directions from which interaction are valid (optional).
**/
Area.prototype.addNPC = function(x, y, npc, dir) {
  /* Sample HTML
     <div class="npc npc-liam">
       <div class="avatar"></div>
       <div class="shadow"></div>
     </div>
  */
  var div = document.createElement("div");
  $(div).addClass("npc npc-" + npc.name);
  var sprite = document.createElement("div");
  $(sprite).addClass("sprite")
           .css("background-image", "url(img/" + npc.img + ".svg)");
  $(div).append(sprite);

  // Some NPCs don't have shadows.
  if (npc.shadow != undefined) {
    var shadow = document.createElement("div");
    $(shadow).addClass("shadow")
             .css("background-image", "url(img/characters/" + npc.shadow + ".svg)");
    $(div).append(shadow);
  }

  npc.avatar = new Avatar($(div), $(sprite));
  npc.avatar.setLeft(x);
  npc.avatar.setBottom(y, this.height);

  // Add to NPC collection.
  this.NPCs.push(npc);
  this.space(x, y).setOccupied(npc);

  // Add to element collection.
  this.elements.push(div);

  // Call addInteraction with parameters.
  this.addInteraction(x, y, npc, dir);
}

/**
  Adds new event zones to an area.
  @param startCoord Array of x, y coordinate (bottom left).
  @param endCoord   Array of x, y coordinate (top right).
  @param event      The event for the Spaces.
**/
Area.prototype.addEventZone = function(startCoord, endCoord, event) {
  // Go from bottom left to top right coordinates (inclusive).
  for (var x = startCoord[0]; x < endCoord[0] + 1; x++) {
    for (var y = startCoord[1]; y < endCoord[1] + 1; y++) {
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