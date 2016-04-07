/**
  The master Game object. Manages all other objects and moving between areas.
**/
function Game() {
  this.gameEl = $("#game");                             // Game element.
  this.avatar = new Avatar($("#avatar"), $("#sprite")); // Avatar element.

  this.areas = {}         // Map of area names to their Area objects.
  this.focus = undefined; // The current focus.
  this.event = undefined; // The current event.

  //The following are initialized in Game.start
  this.messager = undefined; // The Game's messaging system.
  this.x = undefined;        // The player's current x location.
  this.y = undefined;        // The player's current y location.
  this.face = undefined;     // The player's current faced direction.

  // Start the keyboard controller for key events (see js/keys.js).
  this.keyboardController(); 
}

/**
  Called to start the game!
  @param startX    The x coordinate to start the player at.
  @param startY    The y coordinate to start the player at.
  @param startFace The direction to start the player facing.
  @param area      The area to start in.
**/
Game.prototype.start = function(startX, startY, startFace, area) {
  this.moveToArea(area);
  this.messager = new Message(""); 

  this.x = startX; 
  this.y = startY;
  this.face = startFace;

  this.faceDir(this.face);
  this.moveToSpace(this.x, this.y, this.face);
}

/**
  Adds an area to the Game.areas map.
  @param key The key (name) of the Area object.
  @param area Area object.
**/
Game.prototype.addArea = function (key, area) {
  this.areas[key] = area;
}

/**
  Set up for transitioning to a new area in the game.
  @param area The name of the area to move to.
**/
Game.prototype.moveToArea = function(area) {
  // Initialize values to empty.
  var from = "";
  var door = "";

  // New area to move to.
  var newArea = this.areas[area];
  // If it's not a new game and we're in an area.
  if (this.area != undefined) {
    from = this.area.name;
    // Save the current area we're traveling from.
    window.sessionStorage.setItem("from", this.area.name);
    door = window.sessionStorage.getItem("door");
    newArea.build(this.area.elements);
  } else {
    newArea.build();
  }
  this.area = newArea;
  window.sessionStorage.setItem("area", area);
  // Remove door data until it's set again by a specific exit door.
  window.sessionStorage.removeItem("door");

  // Find position data to enter area.
  var positionData = this.area.getPositionData(from, door);
  this.x = positionData.x;
  this.y = positionData.y;
  this.face = positionData.face;
  
  this.faceDir(this.face);
  this.moveToSpace(this.x, this.y, this.face);

  // Fade in/out animation between areas.
  this.gameEl.removeClass("visible");
  var that = this;
  window.setTimeout(function() {
    that.gameEl.addClass("visible");
  }, 300);
  // Lock game mode until new area is totally loaded.
  this.status = "loading";
  window.setTimeout(function() {
    that.status = "free";
  }, 800);
}

/**
  Called to change direction player is facing.
  Mostly kept around for neatness of firing the direction change event.
  (Since the keyboardController has access to the avatar directly)
  @param dir The direction to face.
**/
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

/**
  Moves player one space to the left.
**/
Game.prototype.moveLeft = function() {
  this.faceDir("lf");
  this.moveToSpace(this.x - 1, this.y, "lf");
}

/**
  Moves player one space up.
**/
Game.prototype.moveUp = function() {
  this.faceDir("up");
  this.moveToSpace(this.x, this.y + 1, "up");
}

/**
  Moves player one space to the right.
**/
Game.prototype.moveRight = function() {
  this.faceDir("rt");
  this.moveToSpace(this.x + 1, this.y, "rt");
}

/**
  Moves player one space down.
**/
Game.prototype.moveDown = function() {
  this.faceDir("dw");
  this.moveToSpace(this.x, this.y - 1, "dw");
}

/**
  Moves player to a new space if it's valid. Activates show zones, event zones, etc.
  @param toX     The proposed x coordinate.
  @param toY     The proposed y coordinate.
  @param fromDir Direction traveling from.
**/
Game.prototype.moveToSpace = function(toX, toY, fromDir) {
  // First check if we're trying to move into an exit.
  if (this.area.space(this.x, this.y).hasExitAdjacent(this.face)) {
    // If there is a specific door we're exiting, save it.
    if (space.hasExitDoor()) {
      window.sessionStorage.setItem("door", space.getDoor())
    }
    this.exit(this.area.space(this.x, this.y).exitTo());
    return;
  }

  // Check if we're trying to enter a valid zone.
  if (this.validZone(toX, toY)) {
    space = this.area.space(toX, toY);

    // Make sure we can travel into that space from our current direction.
    if (!space.isBlocked(fromDir)) {
      this.x = toX;
      this.y = toY;
      // Keeping around for debugging purposes.
      console.log(this.x, this.y);
      // Save our current location (for page reload).
      // Will likely be removed when saving game is possible (no need to save every step).
      window.sessionStorage.setItem("x", this.x);
      window.sessionStorage.setItem("y", this.y);

      // If we're entering an event space, trigger it!
      if (space.hasEvent() && this.event == undefined) {
        this.event = space.getEvent();
        this.event.begin(this.x, this.y, this.face);

      // If we're still in an event space, fire movement event.
      } else if (space.hasEvent()) {
        this.event.fireMove(this.x, this.y);

      // If we're not in an event space, but have an event saved, end it!
      } else if (this.event != undefined) {
        this.event.end();
        this.event = undefined;
      }

      // Set the player's new position.
      this.avatar.setLeft(this.x);
      this.avatar.setBottom(this.y);
      
      this.area.updateAreaPosition(this.x, this.y);

      this.showZone();
    }
  } 
}

/** 
  Checks if space is a valid zone of the game (accounts for walls).
  @param x The x coordinate.
  @param y The y coordinate.
**/
Game.prototype.validZone = function(x, y) {
  return x >= 0
      && x <= this.area.width - 1
      && y >= 0
      && y <= this.area.height - 3;
}

/**
  Handles all things related to show zones.
**/
Game.prototype.showZone = function() {
  // Hide all items except the current item (if it exists).
  // To be honest I can't 100% remember my logic here.
  // Should likely be refactored. Layers are hard.
  var that = this;
  window.setTimeout(function() {
    item = that.area.space(that.x, that.y).itemToShow();
    for (i = 0; i < that.area.items.length; i++) {
      if (item != that.area.items[i]) {
        $(that.area.items[i]).hide();
      }
    }
  }, 350);

  currentSpace = this.area.space(this.x, this.y);
  if (currentSpace.isShowZone()) {
    $(currentSpace.itemToShow()).show();
  }
}

/**
  Handles a player trying to interact with something
**/
Game.prototype.interact = function() {
  switch(game.status) {
    // If the game is in free mode, try and interact with something.
    case "free":
      currentSpace = this.area.space(this.x, this.y);

      // Find the x, y coordinate we're facing.
      faceX = this.face == "lf" ? this.x - 1 : this.x;
      faceX = this.face == "rt" ? this.x + 1 : faceX;
      faceY = this.face == "up" ? this.y + 1 : this.y;
      faceY = this.face == "dw" ? this.y - 1 : faceY;
      faceSpace = this.area.space(faceX, faceY);

      // If we're in an interact zone, focus on that.
      if (currentSpace.isInteractZone()) {
        this.focus = currentSpace.getInteraction();
        this.status = currentSpace.getInteraction().interact(this.face) || "free";

      // If we're facing an interactable space.
      } else if (faceSpace != undefined && faceSpace.canInteract(this.face)) {
        this.focus = faceSpace.getInteraction();
        this.status = faceSpace.getInteraction().interact(this.face) || "free";
      }
      break;

    // If game is in conversation mode, advance the conversation.
    case "convo":
      this.status = this.focus.interact(this.face) || "free";

      if (this.status == "free") {
        this.focus = undefined;
      } else if (this.status == "exit") {
        this.exit(this.focus.exitTo());
        this.focus = undefined;
      }
      break;

    default:
      break;
  }
}

/**
  Exits to another area.
  @param exitTo The name of the area to go to.
**/
Game.prototype.exit = function(exitTo) {
  // Collection of areas character can't enter.
  var cantGo = [
    "colquitt-natalie", 
    "margaret-kayla", 
    "anne-diane", 
    "simon-taylor", 
    "elevator-roof"
  ];

  // If our exit goes somewhere we can't, customize the message.
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