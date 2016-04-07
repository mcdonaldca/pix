function Game() {
  this.MULT = 4; // (current size multiplier of 2)
  this.BLOCK = 16 * this.MULT 

  this.game = $("#game");
  this.player = $('#player');
  this.avatar = $('#avatar');
  this.area_div = $('.area');
  this.areas = {}
}

Game.prototype.start = function(startX, startY, startFace, area) {
  this.moveToArea(area);
  this.messager = new Message("");

  this.focus = undefined;
  this.event = undefined;

  this.x = startX;
  this.y = startY;
  this.face = startFace;

  this.faceDir(this.face);
  this.moveToSpace(this.x, this.y, this.face);
}

Game.prototype.addArea = function (key, area) {
  this.areas[key] = area;
}

Game.prototype.moveToArea = function(area) {
  var from = "";
  var door = "";

  var new_area = this.areas[area];
  if (this.area != undefined) {
    from = this.area.name;
    window.sessionStorage.setItem("from", this.area.name);
    console.log(this.area.name);
    door = window.sessionStorage.getItem("door");
    new_area.build(this.area.areaObjects);
  } else {
    new_area.build();
  }
  this.area = new_area;
  window.sessionStorage.setItem("area", area);

  var position_data = this.area.getPositionData(from, door);
  window.sessionStorage.removeItem("door");
  this.x = position_data.x;
  this.y = position_data.y;
  this.face = position_data.face;
  
  this.faceDir(this.face);
  this.moveToSpace(this.x, this.y, this.face);

  this.status = "loading";
  this.game.removeClass("visible");
  var that = this;
  window.setTimeout(function() {
    that.game.addClass("visible");
  }, 300);
  window.setTimeout(function() {
    that.status = "free";
  }, 800);
}

Game.prototype.faceDir = function(dir) {
  this.face = dir;
  window.sessionStorage.setItem("face", this.face);
  this.avatar.removeClass();
  switch(dir) {
    case "lf":
      this.avatar.css("background-position", "0 " + (-87 * this.MULT).toString() + "px");
      break;

    case "up":
      this.avatar.css("background-position", "0 " + (-58 * this.MULT).toString() + "px");
      break;

    case "rt":
      this.avatar.css("background-position", "0 " + (-29 * this.MULT).toString() + "px");
      break;

    case "dw":
      this.avatar.css("background-position", "0 0");
      break;

    default:
      break;
  }

  if (this.event != undefined) {
    this.event.fireFace(this.face);
  }
}

Game.prototype.moveLeft = function() {
  this.faceDir("lf");
  this.moveToSpace(this.x - 1, this.y, "lf");
}

Game.prototype.moveUp = function() {
  this.faceDir("up");
  this.moveToSpace(this.x, this.y + 1, "up");
}

Game.prototype.moveRight = function() {
  this.faceDir("rt");
  this.moveToSpace(this.x + 1, this.y, "rt");
}

Game.prototype.moveDown = function() {
  this.faceDir("dw");
  this.moveToSpace(this.x, this.y - 1, "dw");
}

Game.prototype.moveToSpace = function(to_x, to_y, from_dir) {
  if (this.area.space(this.x, this.y).hasExitAdjacent(this.face)) {
    if (space.hasExitDoor()) {
      window.sessionStorage.setItem("door", space.door())
    }
    this.exit(this.area.space(this.x, this.y).exitTo());
    return;
  }

  if (this.validZone(to_x, to_y)) {
    space = this.area.grid[to_x][to_y];

    if (!space.isBlocked(from_dir)) {
      this.x = to_x;
      this.y = to_y;
      console.log(this.x, this.y);
      window.sessionStorage.setItem("x", this.x);
      window.sessionStorage.setItem("y", this.y);

      if (space.hasEvent() && this.event == undefined) {
        this.event = space.event();
        this.event.begin(this.x, this.y, this.face);
      } else if (space.hasEvent()) {
        this.event.fireMove(this.x, this.y);
      } else if (this.event != undefined) {
        this.event.end();
        this.event = undefined;
      }

      window.sessionStorage.setItem("x", this.x);
      window.sessionStorage.setItem("y", this.y);

      this.player.css("left", this.x * this.BLOCK - (3 * this.MULT));
      this.player.css("bottom", this.y * this.BLOCK - this.MULT);
      
      if (this.x <= 4) {
        this.area_div.css("left", this.area.max_left * this.BLOCK);
      } else if (this.x >= this.area.width - 5) {
        this.area_div.css("left", this.area.min_left * this.BLOCK);
      } else {
        this.area_div.css("left", -1 * (this.x - 5) * this.BLOCK);
      }

      if (this.y <= 4) {
        this.area_div.css("bottom", this.area.max_bottom * this.BLOCK);
      } else if (this.y >= this.area.height - 5) {
        this.area_div.css("bottom", this.area.min_bottom * this.BLOCK);
      } else {
        this.area_div.css("bottom", -1 * (this.y - 5) * this.BLOCK);
      }

      this.showZone();
    }
  } 
}

Game.prototype.validZone = function(x, y) {
  return x >= 0 
    && x <= this.area.width - 1 
    && y >= 0 
    && y <= this.area.height - 3;
}

Game.prototype.showZone = function() {
  var that = this;
  window.setTimeout(function() {
    item = that.area.grid[that.x][that.y].itemToShow();
    for (i = 0; i < that.area.items.length; i++) {
      if (item != that.area.items[i]) {
        $("." + that.area.items[i]).hide();
      }
    }
  }, 350);

  current_space = this.area.grid[this.x][this.y];
  if (current_space.isShowZone()) {
    $("." + current_space.itemToShow()).show();
  }
}

Game.prototype.interact = function() {
  switch(game.status) {
    case "free":
      current_space = this.area.space(this.x, this.y);

      face_x = this.face == "lf" ? this.x - 1 : this.x;
      face_x = this.face == "rt" ? this.x + 1 : face_x;
      face_y = this.face == "up" ? this.y + 1 : this.y;
      face_y = this.face == "dw" ? this.y - 1 : face_y;

      face_space = this.area.space(face_x, face_y);
      if (current_space.isInteractZone()) {
        this.focus = current_space.interaction();
        this.status = current_space.interaction().interact(this.face) || "free";
      } else if (face_space != undefined && face_space.canInteract(this.face)) {
        this.focus = face_space.interaction();
        this.status = face_space.interaction().interact(this.face) || "free";
      }
      break;

    case "convo":
      this.status = this.focus.interact(this.face) || "free";
      if (this.status == "free") {
        this.focus = undefined;
      } else if (this.status == "exit") {
        this.exit(this.focus.exitTo());
      }
      break;

    default:
      break;
  }
}

Game.prototype.exit = function(exitTo) {
  var cantGo = [
    "colquitt-natalie", 
    "margaret-kayla", 
    "anne-diane", 
    "simon-taylor", 
    "elevator-roof"
  ];

  if ($.inArray(exitTo, cantGo) != -1) {
    if (exitTo == "colquitt-natalie" 
      || exitTo == "margaret-kayla" 
      || exitTo == "anne-diane" 
      || exitTo == "simon-taylor") { 
      this.messager.setMessage("You don't know the people that live here that well...");
    }
    if (exitTo == "elevator-roof") { this.messager.setMessage("You need a key to the roof."); }

    this.focus = this.messager;
    this.status = this.messager.interact(this.face) || "free";
  } else {
    this.moveToArea(exitTo);
  }
}