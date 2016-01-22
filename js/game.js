function Game(startX, startY, startFace, grid) {
  this.MULT = 2; // (current size multiplier of 2)
  this.BLOCK = 16 * this.MULT 

  this.game = $("#game");
  this.player = $('#player');
  this.avatar = $('#avatar');
  this.area = $('.area');

  this.messager = new Message("");

  this.grid = grid;

  this.x = startX;
  this.y = startY;
  this.face = startFace;
  this.faceDir(this.face);

  this.moveTo(this.x, this.y, this.face);

  this.status = "loading";
  this.focus = undefined;
  this.event = undefined;

  var that = this;
  window.setTimeout(function() {
    that.game.css("opacity", 1);
    that.status = "free";
  }, 250);
}

Game.prototype.faceDir = function(dir) {
  this.face = dir;
  switch(dir) {
    case "lf":
      this.avatar.css("background-position", -51 * this.MULT);
      break;

    case "up":
      this.avatar.css("background-position", -34 * this.MULT);
      break;

    case "rt":
      this.avatar.css("background-position", -17 * this.MULT);
      break;

    case "dw":
      this.avatar.css("background-position", 0);
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
  this.moveTo(this.x - 1, this.y, "lf");
}

Game.prototype.moveUp = function() {
  this.faceDir("up");
  this.moveTo(this.x, this.y + 1, "up");
}

Game.prototype.moveRight = function() {
  this.faceDir("rt");
  this.moveTo(this.x + 1, this.y, "rt");
}

Game.prototype.moveDown = function() {
  this.faceDir("dw");
  this.moveTo(this.x, this.y - 1, "dw");
}

Game.prototype.moveTo = function(to_x, to_y, from_dir) {
  if (this.grid.space(this.x, this.y).hasExitAdjacent(this.face)) {
    if (space.hasExitDoor()) {
      window.sessionStorage.setItem("door", space.door())
    }
    this.exit(this.grid.space(this.x, this.y).exitTo());
    return;
  }

  if (this.validZone(to_x, to_y)) {
    space = this.grid.map[to_x][to_y];

    if (!space.isBlocked(from_dir)) {
      this.x = to_x;
      this.y = to_y;
      console.log(this.x, this.y);

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

      this.player.css("left", this.x * this.BLOCK);
      this.player.css("bottom", this.y * this.BLOCK);
      
      if (this.x <= 4) {
        this.area.css("left", this.grid.max_left * this.BLOCK);
      } else if (this.x >= this.grid.width - 5) {
        this.area.css("left", this.grid.min_left * this.BLOCK);
      } else {
        this.area.css("left", -1 * (this.x - 5) * this.BLOCK);
      }

      if (this.y <= 4) {
        this.area.css("bottom", this.grid.max_bottom * this.BLOCK);
      } else if (this.y >= this.grid.height - 5) {
        this.area.css("bottom", this.grid.min_bottom * this.BLOCK);
      } else {
        this.area.css("bottom", -1 * (this.y - 5) * this.BLOCK);
      }

      this.showZone();
    }
  } 
}

Game.prototype.validZone = function(x, y) {
  return x >= 0 
    && x <= this.grid.width - 1 
    && y >= 0 
    && y <= this.grid.height - 3;
}

Game.prototype.showZone = function() {
  var that = this
  window.setTimeout(function() {
    item = that.grid.map[that.x][that.y].itemToShow();
    for (i = 0; i < that.grid.items.length; i++) {
      if (item != that.grid.items[i]) {
        $("." + that.grid.items[i]).hide();
      }
    }
  }, 350);

  current_space = this.grid.map[this.x][this.y];
  if (current_space.isShowZone()) {
    $("." + current_space.itemToShow()).show();
  }
}

Game.prototype.interact = function() {
  switch(game.status) {
    case "free":
      current_space = this.grid.space(this.x, this.y);

      face_x = this.face == "lf" ? this.x - 1 : this.x;
      face_x = this.face == "rt" ? this.x + 1 : face_x;
      face_y = this.face == "up" ? this.y + 1 : this.y;
      face_y = this.face == "dw" ? this.y - 1 : face_y;

      face_space = this.grid.space(face_x, face_y);

      if (current_space.isInteractZone()) {
        this.focus = current_space.interaction();
        this.status = current_space.interaction().interact(this.face) || "free";
      } else if (face_space.canInteract(this.face)) {
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
    window.sessionStorage.setItem("from", this.grid.name);
    window.location = exitTo + ".html";
  }
}