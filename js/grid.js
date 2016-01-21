function Grid(width, height, name) {
  this.width = width;
  this.height = height;
  this.name = name;

  this.max_left = this.width < 11 ? (11 - this.width) / 2 : 0;
  this.min_left = 
    this.width < 11 ? (11 - this.width) / 2 : -1 * (this.width - 11);

  this.max_bottom = this.height < 11 ? (11 - this.height) / 2 : 0;
  this.min_bottom = 
    this.height < 11 ? (11 - this.height) / 2 : -1 * (this.height - 11);

  window.sessionStorage.setItem("room", name);

  this.map = new Array(width);
  for (var i = 0; i < width; i++) {
    this.map[i] = new Array(height);
    for (var n = 0; n < height; n++) {
      this.map[i][n] = new Space();
    }
  }

  this.items = [];
}

Grid.prototype.space = function(x, y) {
  return this.validZone(x,y) ? this.map[x][y] : undefined;
}

Grid.prototype.addBlocked = function(x, y, dir) {
  dir = dir || [];
  options = { blocked: true };
  if (dir.length) {
    options["blocked_dir"] = dir;
  }

  if (this.space(x, y).isBasic()) {
    this.map[x][y] = new Space(options);
  } else {
    this.space(x, y).updateOptions(options);
  }
}

Grid.prototype.addEventZone = function(x, y, event) {
  options = { event: event };

  if (this.map[x][y].isBasic()) {
    this.map[x][y] = new Space(options);
  } else {
    this.map[x][y].updateOptions(options);
  }
}

Grid.prototype.addShowZone = function(x, y, item) {
  options = { show: true, item: item };

  if ($.inArray(item, this.items) == -1) {
    this.items.push(item);
  }

  if (this.map[x][y].isBasic()) {
    this.map[x][y] = new Space(options);
  } else {
    this.map[x][y].updateOptions(options);
  }
}

Grid.prototype.addInteraction = function(x, y, interaction, dir) {
  dir = dir || [];
  options = { interact: true, interaction: interaction };
  if (dir.length) {
    options["interact_dir"] = dir;
  }

  if (this.map[x][y].isBasic()) {
    this.map[x][y] = new Space(options);
  } else {
    this.map[x][y].updateOptions(options);
  }
}

Grid.prototype.addExit = function(x, y, dir, location, door) {
  options = { exit_adj: true, exit_dir: dir, exit_to: location }
  door = door || ""
  if (door != "") {
    options["door"] = door
  }

  if (this.map[x][y].isBasic()) {
    this.map[x][y] = new Space(options);
  } else {
    this.map[x][y].updateOptions(options);
  }
}

Grid.prototype.validZone = function(x, y) {
  return x >= 0 
    && x <= this.width -1 
    && y >= 0 
    && y <= this.height - 1;
}