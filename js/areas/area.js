/**  
  The Area object manages the grid and spaces of a room/area.
  @param width        The width of the area (in blocks).
  @param height       The height of the area (in blocks);
  @param name         The name of the area. Should also be the name of the svg.
  @param areaOverride Name of area's svg (if different from name).
**/
function Area(width, height, name, areaOverride) {
  this.class = 'Area'; // For testing.
  
  this.width = width;   // Width of the area in blocks.
  this.height = height; // Height of the area in blocks.
  this.name = name;     // Name of the area.
  this.svgName = areaOverride || name; // Name of the SVG for the area.

  // The following value gets set in Area.build
  this.areaEl = undefined;
  this.build();

  // Following values are set in Area.setPlacementLimits
  this.maxX = undefined;   // Greatest translate X value (in blocks) area should go.
  this.minX = undefined;   // Smallest translate X value (in blocks) area should go.
  this.maxY = undefined;   // Greatest translate Y value (in blocks) area should go.
  this.minY = undefined;   // Smallest translate Y value (in blocks) area should go.
  this.setPlacementLimits();

  // Following values are set in Area.updateAreaPosition
  this.computedXOffset = undefined;
  this.computedYOffset = undefined;

  this.visited = false;     // If the area has been visited yet.
  this.outside = false;   // If the area is outside.
  this.limited = false;     // No hourly limit.
  this.residential = false; // No occupancy requirements.

  this.items = {};        // Item collection.
  this.NPCs = [];         // Collection of NPCs in area.
  this.positionData = {}; // Player positioning based on entrances from other areas.
  
  // Following value is set in Area.createGridAndPaths
  this.grid = undefined;
  this.createGridAndPaths();
}



/**
  Called to set the max and min values to position the area within the game window.
**/
Area.prototype.setPlacementLimits = function() {
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
};



/**
  Creates the area's space grid with blocked data.
  Builds the paths NPCs can follow in the game.
**/
Area.prototype.createGridAndPaths = function() {
  var height = this.height;
  var width = this.width;

  this.grid = new Array(width); // Collection of spaces in the area.
  // Create a new Space object for every grid coordinate.
  for (var x = 0; x < width; x++) {
    this.grid[x] = new Array(height);
    for (var y = 0; y < height; y++) {
      this.grid[x][y] = new Space(this.name, x, y);
    }
  }

  // We'll load the mask as an image and then check the image data.
  var image = new Image();
  image.crossOrigin = 'Anonymous';

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
        var xLeft = blockX * BLOCK,
            yTop = blockY * BLOCK,
            xRight = xLeft + BLOCK - 1,
            yBottom = yTop + BLOCK - 1;

        // Find middle x and y coordinates.
        // Don't want to use pixel at corner of block.
        var xQuarter = xLeft + (BLOCK / 4),
            xMid = xLeft + (BLOCK / 2),
            xThreeQuarter = xLeft + (BLOCK * 3 / 4),
            yQuarter = yTop + (BLOCK / 4),
            yMid = yTop + (BLOCK / 2),
            yThreeQuarter = yTop + (BLOCK * 3 / 4);

        // Using combinations of coordinates, find index in image data.
        var lfBlockCheck = (yMid*imageData.width + xLeft) * 4,
            upBlockCheck = (yTop*imageData.width + xMid) * 4,
            rtBlockCheck = (yMid*imageData.width + xRight) * 4,
            dwBlockCheck = (yBottom*imageData.width + xMid) * 4;

        var lfPathCheck = (yMid*imageData.width + xQuarter) * 4,
            upPathCheck = (yQuarter*imageData.width + xMid) * 4,
            rtPathCheck = (yMid*imageData.width + xThreeQuarter) * 4,
            dwPathCheck = (yThreeQuarter*imageData.width + xMid) * 4;

        // Check if R value of pixel at each location is NOT 'ff'
        // If the R value is anything else, should be non-white and indicate a mask.
        var lfBlocked = imageData.data[lfBlockCheck].toString(16) != 'ff',
            upBlocked = imageData.data[upBlockCheck].toString(16) != 'ff',
            rtBlocked = imageData.data[rtBlockCheck].toString(16) != 'ff',
            dwBlocked = imageData.data[dwBlockCheck].toString(16) != 'ff';

        var lfPath = imageData.data[lfPathCheck].toString(16) != 'ff',
            upPath = imageData.data[upPathCheck].toString(16) != 'ff',
            rtPath = imageData.data[rtPathCheck].toString(16) != 'ff',
            dwPath = imageData.data[dwPathCheck].toString(16) != 'ff';

        // Collect blocked directions.
        var blockedDirections = [];
        if (lfBlocked) blockedDirections.push(DIR.RT);
        if (upBlocked) blockedDirections.push(DIR.DW);
        if (rtBlocked) blockedDirections.push(DIR.LF);
        if (dwBlocked) blockedDirections.push(DIR.UP);

        // Collect path directions.
        var nodePaths = [];
        if (lfPath) nodePaths.push(DIR.LF);
        if (upPath) nodePaths.push(DIR.UP);
        if (rtPath) nodePaths.push(DIR.RT);
        if (dwPath) nodePaths.push(DIR.DW);

        // If there are indeed blocked directions, set them on the related Space.
        if (blockedDirections.length > 0) area.space(blockX, blockY).setBlocked(blockedDirections);
        // If there are indeed path directions, set them on the related Space.
        if (nodePaths.length > 0) area.space(blockX, blockY).setPaths(nodePaths);
      }
    }
  };
  
  // Onload will be called after image is set.
  image.src = 'img/areas/' + this.svgName + '_data.png';
};



/**
  Builds the area element which well contain all items, NPCs, etc.
**/
Area.prototype.build = function() {
  // Create the element and apply area styles to it.
  this.areaEl = $(document.createElement('div')).addClass('area');

  // Set the height and width of the area element.
  // Set the background image to the area's svg.
  this.areaEl.css('width', (this.width * BLOCK * MULT).toString() + 'px')
             .css('height', (this.height * BLOCK * MULT).toString() + 'px')
             .css('background-image', 'url(img/areas/' + this.svgName + '.svg)');
}



/**
  Called when the player moves and the area position may need to be adjusted.
  @param playerX The player's new x coordinate.
  @param playerY The player's new y coordinate.
**/
Area.prototype.updateAreaPosition = function(playerX, playerY) {
  // Game width & height should always be odd, so player is visually centered.
  var gameWidthHalf = (GAME_WIDTH - 1) / 2;
  var gameHeightHalf = (GAME_HEIGHT - 1) / 2;

  // Area background should be placed half of the screen width to the left of the player.
  var translateX = (-1 * (playerX - gameWidthHalf) * BLOCK * MULT).toString() + 'px';
  // Close to left side, fix area X position.
  if (playerX <= gameWidthHalf - 1) {
    translateX = (this.maxX * BLOCK * MULT).toString() + 'px';
  // Close to right side, fix area X position.
  } else if (playerX >= this.width - gameWidthHalf) {
    translateX = (this.minX * BLOCK * MULT).toString() + 'px';
  }

  // Area background should be placed half of the screen above the player.
  var translateY = (-1 * (playerY - gameHeightHalf) * BLOCK * MULT).toString() + 'px';
  // Close to top, fix area Y position.
  if (playerY <= gameHeightHalf) {
    translateY = (this.maxY * BLOCK * MULT).toString() + 'px';
  // Close to bottom, fix area Y position.
  } else if (playerY >= this.height - gameHeightHalf - 1) {
    translateY = (this.minY * BLOCK * MULT).toString() + 'px';
  }

  // Mostly for testings, since transform value isn't accessible for checks w/ jquery.
  this.computedXOffset = translateX;
  this.computedYOffset = translateY;
  this.areaEl.css('transform', 'translate(' + translateX + ', ' + translateY + ')');
}



/**
  Calculates the directions necessary to get form one coordinate to another in an area.
  @param startCoord Object with x and y value, starting space.
  @param endCoord Object with x and y value, ending space.
**/
Area.prototype.pathBetween = function(startCoord, endCoord) {
  var INFINITY = 1/0;

  // Make sure the provided coordinates are actually nodes.
  var startNode = this.space(startCoord.x, startCoord.y),
      endNode = this.space(endCoord.x, endCoord.y);
  if (!startNode.hasPaths() ||
      !endNode.hasPaths()) return;

  // Build list of unvisited nodes.
  var nodes = [];
  // Tracking for distances, previous nodes, and neighbors.
  var distances = {},
      previous = {},
      neighbors = {};
  // Iterate through all spaces and set distances, previous, and neighbors.
  for (var x = 0; x < this.width; x++) {
    for (var y = 0; y < this.height; y++) {
      var currentSpace = this.space(x, y);
      if (currentSpace.hasPaths()) {
        // Add to unvisited node collection.
        nodes.push(currentSpace);
        // Set initial values.
        distances[currentSpace.getId()] = INFINITY;
        previous[currentSpace.getId()] = {};
        neighbors[currentSpace.getId()] = {};

        // Find neighboring space references.
        var paths = currentSpace.getPaths();
        for (var i = 0; i < paths.length; i++) {
          var neighbor = undefined;
          switch (paths[i]) {
            case DIR.LF:
              neighbor = this.space(x - 1, y);
              break;

            case DIR.UP:
              neighbor = this.space(x, y - 1);
              break;

            case DIR.RT:
              neighbor = this.space(x + 1, y);
              break;

            case DIR.DW:
              neighbor = this.space(x, y + 1);
              break;

            default:
              break;
          }
          neighbors[currentSpace.getId()][paths[i]] = neighbor;
        }
      }
    }
  }

  // Distance from starting node is 0.
  distances[startNode.getId()] = 0;

  // While we still have nodes to visit.
  while (nodes.length > 0) {
    var minDist = INFINITY;
    var node = undefined;
    // Find the node with the smallest distance from the current node.
    for (var i = 0; i < nodes.length; i++) {
      if (distances[nodes[i].getId()] < minDist) {
        minDist = distances[nodes[i].getId()];
        node = nodes[i];
      }
    }

    // Remove node from unvisited list.
    var nodeIndex = nodes.indexOf(node);
    nodes.splice(nodeIndex, 1);

    // Iterate through available paths.
    var paths = node.getPaths()
    for (var i = 0; i < paths.length; i++) {
      var neighbor = neighbors[node.getId()][paths[i]];
      var distance = distances[node.getId()] + 1;
      // If a new minimum distance is found, overwrite existing distance.
      if (distance < distances[neighbor.getId()]) {
        distances[neighbor.getId()] = distance;
        previous[neighbor.getId()].node = node;
        previous[neighbor.getId()].dir = paths[i];
      }
    }
  }

  // Starting from the end node, trace the path back.
  var path = [];
  node = endNode;
  while (previous[node.getId()].node) {
    path.push(previous[node.getId()].dir)
    node = previous[node.getId()].node;
  }
  // Reverse path to put directions in correct order.
  path.reverse();

  return path;
};



/**
  Returns the element containing all items, NPCs, etc.
  @return Element
**/
Area.prototype.getEl = function() {
  return this.areaEl;
};



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
  var translateX = (startCoord[0] * BLOCK * MULT).toString() + 'px';
  var translateY = (startCoord[1] * BLOCK * MULT).toString() + 'px';

  /* Sample HTML
     <div class='item item-bed'></div>
  */
  var div = document.createElement('div');
  $(div).addClass('item item-' + item)
        .css('width', (width * BLOCK * MULT).toString() + 'px')
        .css('height', (BLOCK * MULT).toString() + 'px')
        .css('transform', 'translate(' + translateX + ', ' + translateY + ')')
        .css('z-index', (startCoord[1] + 1) * 10 + 5 + extra)
        .css('background-image', 'url(img/items/' + this.svgName + '/' + item + '.svg)');

  // Customizable items have extra background sizing.
  var exceptions = {
    'rundown-apt': {
      'bed': 2,
      'covers': 2
    }
  };

  if (exceptions[this.svgName] != undefined && exceptions[this.svgName][item] != undefined) {
    var ex = exceptions[this.svgName][item];
    $(div).css(
      'background-size', 
      (width * ex * BLOCK * MULT).toString() + 'px ' + (BLOCK * MULT).toString() + 'px'
      );
  }

  // Add to item collection.
  this.items[item] = $(div);

  this.append(div);
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
Area.prototype.addNPC = function(npc) {
  // Add to NPC collection.
  this.NPCs.push(npc);
  this.append(npc.getEl());
}



/**
  Removes an NPC from the area.
  @param npcName The name of the NPC to remove
**/
Area.prototype.removeNPC = function(npc) {
  var removeIndex = this.NPCs.indexOf(npc);

  if (removeIndex != -1) { 
    var npc = this.NPCs[removeIndex];
    $(npc.getEl()).remove();
    this.NPCs.splice(removeIndex, 1); 
  }
};



/**
  Determines if an NPC is within an area.
  @param name The name of the NPC.
  @return T/F if the NPC is present.
**/
Area.prototype.hasNPC = function(name) {
  for (var i = 0; i < this.NPCs.length; i++) {
    if (this.NPCs[i].name == name) {
      return true;
    }
  }
  return false;
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
    this.append(eventElements[i]);
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
  door = door || ''
  this.space(x, y).setExit(dir, location);
  if (door != '') {
    this.space(x, y).setExitDoor(door);
  }

  var oppDir = DIR.DW;
  if (dir == DIR.LF) oppDir = DIR.RT;
  else if (dir == DIR.RT) oppDir = DIR.LF;
  else if (dir == DIR.DW) oppDir = DIR.UP;

  this.addPositionData(x, y, oppDir, location, door);
}



/**
  Adds information about player positioning when entering an area.
  @param x        The x coordinate to be placed at.
  @param y        The y coordinate to be placed at.
  @param dir      The direction to be facing.
  @param location The area the player is coming from.
  @param door     The door the player is coming from (optional, can be null).
**/
Area.prototype.addPositionData = function(x, y, dir, location, door) {
  // Construct a key for the postionData map
  // Concatinates the are and door (if there is a door).
  // ex. apt-1-left, apt-1-right, studio
  var key = location;
  if (door != null && door != '') {
    key += '-' + door;
  }
  this.positionData[key] = { x: x, y: y, face: dir};
}



/**
  Find where the player should be placed give they came from a certain area/door.
  @param areaFrom The area the player is coming from.
  @param door     The door the player is coming from.
**/
Area.prototype.getPositionData = function(areaFrom, door) {
  // Construct key from information.
  var key = areaFrom;
  if (door != null && door != '') {
    key += '-' + door;
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
    return { x: 0, y: 0, face: DIR.UP};
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
  @return Boolean
**/
Area.prototype.isLimited = function() {
  return this.limited;
}



/**
  Getter for Area.residential.
  @return Boolean
**/
Area.prototype.isResidential = function() {
  return this.residential;
}

/** 
  Marks the area as an outside area.
**/
Area.prototype.setIsOutside = function() {
  this.outside = true;
};

/**
  Getter for Area.outside.
  @return Boolean
**/
Area.prototype.isOutside = function() {
  return this.outside;
}