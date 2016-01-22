function Grid(width, height, name, mask) {
  this.BLOCK = 16;

  this.width = width;
  this.height = height;
  this.name = name;

  this.setPlacementLimits();
  window.sessionStorage.setItem("room", name);
  this.items = [];

  this.map = new Array(width);
  for (var i = 0; i < width; i++) {
    this.map[i] = new Array(height);
    for (var n = 0; n < height; n++) {
      this.map[i][n] = new Space();
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
    
    for (var block_x = 0; block_x < grid.width; block_x++) {
      for (var block_y = 0; block_y < grid.height; block_y++) {
        var x_left = block_x * grid.BLOCK;
        var y_top = block_y * grid.BLOCK;

        var x_mid = x_left + 8;
        var x_right = x_left + grid.BLOCK - 1;
        var y_mid = y_top + 8;
        var y_bottom = y_top + grid.BLOCK - 1;

        var lf_check = (y_mid*imageData.width + x_left) * 4;
        var up_check = (y_top*imageData.width + x_mid) * 4;
        var rt_check = (y_mid*imageData.width + x_right) * 4;
        var dw_check = (y_bottom*imageData.width + x_mid) * 4;

        var lf_blocked = imageData.data[lf_check].toString(16) == 0;
        var up_blocked = imageData.data[up_check].toString(16) == 0;
        var rt_blocked = imageData.data[rt_check].toString(16) == 0;
        var dw_blocked = imageData.data[dw_check].toString(16) == 0;

        var blocked_directions = [];
        if (lf_blocked) { blocked_directions.push("rt"); }
        if (up_blocked) { blocked_directions.push("dw"); }
        if (rt_blocked) { blocked_directions.push("lf"); }
        if (dw_blocked) { blocked_directions.push("up"); }

        if (blocked_directions.length > 0) {
          grid.space(block_x, grid.height - block_y - 1).setBlocked(blocked_directions);
        }
      }
    }
  };
  if (mask != undefined) { image.src = mask; }
}

Grid.prototype.setPlacementLimits = function() {
  this.max_left = this.width < 11 ? (11 - this.width) / 2 : 0;
  this.min_left = 
    this.width < 11 ? (11 - this.width) / 2 : -1 * (this.width - 11);

  this.max_bottom = this.height < 11 ? (11 - this.height) / 2 : 0;
  this.min_bottom = 
    this.height < 11 ? (11 - this.height) / 2 : -1 * (this.height - 11);

  console.log(this.max_bottom);
  console.log(this.min_bottom);
}

Grid.prototype.space = function(x, y) {
  return this.validZone(x,y) ? this.map[x][y] : undefined;
}

Grid.prototype.validZone = function(x, y) {
  return x >= 0 
    && x <= this.width -1 
    && y >= 0 
    && y <= this.height - 1;
}

Grid.prototype.addShowZone = function(x, y, item) {
  if ($.inArray(item, this.items) == -1) { this.items.push(item); }
  this.space(x, y).setShowZone(item);
}

Grid.prototype.addInteraction = function(x, y, interaction, dir) {
  dir = dir || [];
  this.space(x, y).setInteractionZone(interaction)
  if (dir.length > 0) {
    this.space(x, y).setInteractionDirection(dir);
  }
}

Grid.prototype.addEventZone = function(x, y, event) {
  this.space(x, y).setEvent(event);
}

Grid.prototype.addExit = function(x, y, dir, location, door) {
  door = door || ""
  this.space(x, y).setExit(dir, location);
  if (door != "") {
    this.space(x, y).setExitDoor(door);
  }
}