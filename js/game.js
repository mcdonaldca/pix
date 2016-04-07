function Game() {
  this.game = $("#game");
  this.player = $("#player");
  this.avatar = new Avatar($("#avatar"));
  this.areaEl = $(".area");
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

  var newArea = this.areas[area];
  if (this.area != undefined) {
    from = this.area.name;
    window.sessionStorage.setItem("from", this.area.name);
    door = window.sessionStorage.getItem("door");
    newArea.build(this.area.areaElements);
  } else {
    newArea.build();
  }
  this.area = newArea;
  window.sessionStorage.setItem("area", area);

  var positionData = this.area.getPositionData(from, door);
  window.sessionStorage.removeItem("door");
  this.x = positionData.x;
  this.y = positionData.y;
  this.face = positionData.face;
  
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
  switch(dir) {
    case "lf":
      this.avatar.faceLeft();
      break;

    case "up":
      this.avatar.faceUp();
      break;

    case "rt":
      this.avatar.faceRight();
      break;

    case "dw":
      this.avatar.faceDown();
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

Game.prototype.moveToSpace = function(toX, toY, fromDir) {
  if (this.area.space(this.x, this.y).hasExitAdjacent(this.face)) {
    if (space.hasExitDoor()) {
      window.sessionStorage.setItem("door", space.door())
    }
    this.exit(this.area.space(this.x, this.y).exitTo());
    return;
  }

  if (this.validZone(toX, toY)) {
    space = this.area.grid[toX][toY];

    if (!space.isBlocked(fromDir)) {
      this.x = toX;
      this.y = toY;
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

      this.player.css("left", (this.x * BLOCK - 3) * MULT);
      this.player.css("bottom", (this.y * BLOCK - 1) * MULT);
      
      if (this.x <= 4) {
        this.areaEl.css("left", this.area.maxLeft * BLOCK * MULT);
      } else if (this.x >= this.area.width - 5) {
        this.areaEl.css("left", this.area.minLeft * BLOCK * MULT);
      } else {
        this.areaEl.css("left", -1 * (this.x - 5) * BLOCK * MULT);
      }

      if (this.y <= 4) {
        this.areaEl.css("bottom", this.area.maxBottom * BLOCK * MULT);
      } else if (this.y >= this.area.height - 5) {
        this.areaEl.css("bottom", this.area.minBottom * BLOCK * MULT);
      } else {
        this.areaEl.css("bottom", -1 * (this.y - 5) * BLOCK * MULT);
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

  currentSpace = this.area.grid[this.x][this.y];
  if (currentSpace.isShowZone()) {
    $("." + currentSpace.itemToShow()).show();
  }
}

Game.prototype.interact = function() {
  switch(game.status) {
    case "free":
      currentSpace = this.area.space(this.x, this.y);

      faceX = this.face == "lf" ? this.x - 1 : this.x;
      faceX = this.face == "rt" ? this.x + 1 : faceX;
      faceY = this.face == "up" ? this.y + 1 : this.y;
      faceY = this.face == "dw" ? this.y - 1 : faceY;

      faceSpace = this.area.space(faceX, faceY);
      if (currentSpace.isInteractZone()) {
        this.focus = currentSpace.interaction();
        this.status = currentSpace.interaction().interact(this.face) || "free";
      } else if (faceSpace != undefined && faceSpace.canInteract(this.face)) {
        this.focus = faceSpace.interaction();
        this.status = faceSpace.interaction().interact(this.face) || "free";
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