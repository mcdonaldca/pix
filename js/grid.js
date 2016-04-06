function Grid(width, height, name, mask) {
  this.MULT = 4;
  this.BLOCK = 16;

  this.width = width;
  this.height = height;
  this.name = name;

  this.area = $(".area");

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

        var lf_blocked = imageData.data[lf_check].toString(16) != "ff";
        var up_blocked = imageData.data[up_check].toString(16) != "ff";
        var rt_blocked = imageData.data[rt_check].toString(16) != "ff";
        var dw_blocked = imageData.data[dw_check].toString(16) != "ff";

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
  if (mask) { image.src = "img/areas/" + this.name + "_mask.png"; }
}

Grid.prototype.setPlacementLimits = function() {
  this.max_left = this.width < 11 ? (11 - this.width) / 2 : 0;
  this.min_left = 
    this.width < 11 ? (11 - this.width) / 2 : -1 * (this.width - 11);

  this.max_bottom = this.height < 11 ? (11 - this.height) / 2 : 0;
  this.min_bottom = 
    this.height < 11 ? (11 - this.height) / 2 : -1 * (this.height - 11);
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

Grid.prototype.addShowZone = function(height, width, item, start_coord, show_coords) {
  this.items.push("item-" + item);

  var div = document.createElement("div");
  $(div).addClass("item item-" + item)
        .css("height", (height * this.BLOCK * this.MULT).toString() + "px")
        .css("width", (width * this.BLOCK * this.MULT).toString() + "px")
        .css("left", (start_coord[0] * this.BLOCK * this.MULT).toString() + "px")
        .css("bottom", (start_coord[1] * this.BLOCK * this.MULT).toString() + "px")

  var img = document.createElement("img");
  var src = "img/items/" + this.name + "/" + item + ".svg";
  $(img).attr("src", src);
  $(div).append(img);
  this.area.append(div);

  for (var i = 0; i < show_coords.length; i++) {
    this.space(show_coords[i][0], show_coords[i][1]).setShowZone(item);
  }
}

Grid.prototype.addInteraction = function(x, y, interaction, dir) {
  dir = dir || [];
  this.space(x, y).setInteractionZone(interaction)
  if (dir.length > 0) {
    this.space(x, y).setInteractionDirection(dir);
  }
}

Grid.prototype.addNPC = function(x, y, interaction, dir) {
  dir = dir || [];
  
  var div = document.createElement("div");
  $(div).addClass("npc npc-" + interaction.name)
        .css("left", ((x * this.BLOCK - 3) * this.MULT).toString() + "px")
        .css("bottom", ((y * this.BLOCK - 1) * this.MULT).toString() + "px");
  var avatar = document.createElement("div");
  $(avatar).addClass("avatar").attr("id", interaction.name)
           .css("background-image", "url(img/" + interaction.image + ".svg)");
  interaction.avatar = $(avatar);

  var shadow = document.createElement("div");
  $(shadow).addClass("shadow");
  var shadow_img = document.createElement("img");
  $(shadow_img).attr("src", "img/characters/" + interaction.shadow + ".svg");

  $(shadow).append(shadow_img);
  $(div).append(avatar);
  $(div).append(shadow);
  this.area.append(div);

  this.addInteraction(x, y, interaction, dir);
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