function Area(width, height, name, mask) {
  this.width = width;
  this.height = height;
  this.name = name;

  this.area = $(".area");

  this.setPlacementLimits();
  window.sessionStorage.setItem("room", name);
  this.items = [];
  this.areaObjects = [];
  this.positionData = {};

  this.grid = new Array(width);
  for (var i = 0; i < width; i++) {
    this.grid[i] = new Array(height);
    for (var n = 0; n < height; n++) {
      this.grid[i][n] = new Space();
    }
  }

  var image = new Image();
  image.crossOrigin = "Anonymous";
  var grid = this;

  image.onload = function() {
    var canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;

    var context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);

    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    
    for (var blockX = 0; blockX < grid.width; blockX++) {
      for (var blockY = 0; blockY < grid.height; blockY++) {
        var xLeft = blockX * BLOCK;
        var yTop = blockY * BLOCK;

        var xMid = xLeft + 8;
        var xRight = xLeft + BLOCK - 1;
        var yMid = yTop + 8;
        var yBottom = yTop + BLOCK - 1;

        var lfCheck = (yMid*imageData.width + xLeft) * 4;
        var upCheck = (yTop*imageData.width + xMid) * 4;
        var rtCheck = (yMid*imageData.width + xRight) * 4;
        var dwCheck = (yBottom*imageData.width + xMid) * 4;

        var lfBlocked = imageData.data[lfCheck].toString(16) != "ff";
        var upBlocked = imageData.data[upCheck].toString(16) != "ff";
        var rtBlocked = imageData.data[rtCheck].toString(16) != "ff";
        var dwBlocked = imageData.data[dwCheck].toString(16) != "ff";

        var blockedDirections = [];
        if (lfBlocked) { blockedDirections.push("rt"); }
        if (upBlocked) { blockedDirections.push("dw"); }
        if (rtBlocked) { blockedDirections.push("lf"); }
        if (dwBlocked) { blockedDirections.push("up"); }

        if (blockedDirections.length > 0) {
          grid.space(blockX, grid.height - blockY - 1).setBlocked(blockedDirections);
        }
      }
    }
  };
  if (mask) { image.src = "img/areas/" + this.name + "_mask.png"; }
}

Area.prototype.build = function(removeDivs) {
  $(".area-img").attr("src", "img/areas/" + this.name + ".svg");

  removeDivs = removeDivs || [];
  for (var i = 0; i < removeDivs.length; i++) {
    $(removeDivs[i]).remove();
  }

  var leftOffset = 11 - this.width > 0 ? (11 - this.width) / 2 : 0;
  var bottomOffset = 11 - this.height > 0 ? (11 - this.height) / 2 : 0;

  this.area.css("width", (this.width * BLOCK * MULT).toString() + "px")
           .css("height", (this.height * BLOCK * MULT).toString() + "px")
           .css("left", (leftOffset * BLOCK * MULT).toString() + "px")
           .css("bottom", (bottomOffset * BLOCK * MULT).toString() + "px");

  for (var i = 0; i < this.areaObjects.length; i++) {
    this.area.append(this.areaObjects[i]);
  }
}

Area.prototype.setPlacementLimits = function() {
  this.maxLeft = this.width < 11 ? (11 - this.width) / 2 : 0;
  this.minLeft = 
    this.width < 11 ? (11 - this.width) / 2 : -1 * (this.width - 11);

  this.maxBottom = this.height < 11 ? (11 - this.height) / 2 : 0;
  this.minBottom = 
    this.height < 11 ? (11 - this.height) / 2 : -1 * (this.height - 11);
}

Area.prototype.addPositionData = function(areaFrom, door, x, y, face) {
  var key = areaFrom;
  if (door != null && door != "") {
    key += "-" + door;
  }
  this.positionData[key] = { x: x, y: y, face: face};
}

Area.prototype.getPositionData = function(areaFrom, door) {
  var key = areaFrom;
  if (door != null && door != "") {
    key += "-" + door;
  }

  if (key in this.positionData) {
    return this.positionData[key];
  } else if (this.positionData.default != undefined) {
    return this.positionData.default;
  } else {
    return { x: 0, y: 0, face: "up"};
  }
}

Area.prototype.space = function(x, y) {
  return this.validZone(x,y) ? this.grid[x][y] : undefined;
}

Area.prototype.validZone = function(x, y) {
  return x >= 0 
    && x <= this.width -1 
    && y >= 0 
    && y <= this.height - 1;
}

Area.prototype.addShowZone = function(height, width, item, startCoord, showCoords) {
  this.items.push("item-" + item);

  var div = document.createElement("div");
  $(div).addClass("item item-" + item)
        .css("height", (height * BLOCK * MULT).toString() + "px")
        .css("width", (width * BLOCK * MULT).toString() + "px")
        .css("left", (startCoord[0] * BLOCK * MULT).toString() + "px")
        .css("bottom", (startCoord[1] * BLOCK * MULT).toString() + "px")

  var img = document.createElement("img");
  var src = "img/items/" + this.name + "/" + item + ".svg";
  $(img).attr("src", src);
  $(div).append(img);

  this.areaObjects.push(div);

  for (var i = 0; i < showCoords.length; i++) {
    this.space(showCoords[i][0], showCoords[i][1]).setShowZone(item);
  }
}

Area.prototype.addInteraction = function(x, y, interaction, dir) {
  dir = dir || [];
  this.space(x, y).setInteractionZone(interaction)
  if (dir.length > 0) {
    this.space(x, y).setInteractionDirection(dir);
  }
}

Area.prototype.addNPC = function(x, y, interaction, dir) {
  dir = dir || [];
  
  var div = document.createElement("div");
  $(div).addClass("npc npc-" + interaction.name)
        .css("left", ((x * BLOCK - 3) * MULT).toString() + "px")
        .css("bottom", ((y * BLOCK - 1) * MULT).toString() + "px");
  var avatar = document.createElement("div");
  $(avatar).addClass("avatar")
           .css("background-image", "url(img/" + interaction.image + ".svg)");
  interaction.avatar = $(avatar);
  $(div).append(avatar);

  if (interaction.shadow != undefined) {
    var shadow = document.createElement("div");
    $(shadow).addClass("shadow");
    var shadowImg = document.createElement("img");
    $(shadowImg).attr("src", "img/characters/" + interaction.shadow + ".svg");

    $(shadow).append(shadowImg);
    $(div).append(shadow);
  }

  this.areaObjects.push(div);

  this.addInteraction(x, y, interaction, dir);
}

Area.prototype.addEventZone = function(startCoord, endCoord, event) {
  for (var x = startCoord[0]; x < endCoord[0] + 1; x++) {
    for (var y = startCoord[1]; y < endCoord[1] + 1; y++) {
      this.space(x, y).setEvent(event);
    }
  }

  eventAreaObjects = event.getAreaObjects();
  for (var i = 0; i < eventAreaObjects.length; i++) {
    this.areaObjects.push(eventAreaObjects[i]);
  }
}

Area.prototype.addExit = function(x, y, dir, location, door) {
  door = door || ""
  this.space(x, y).setExit(dir, location);
  if (door != "") {
    this.space(x, y).setExitDoor(door);
  }
}