/**
  The master Game object. Manages all other objects and moving between areas.
**/
function Game() {
  this.gameEl = $('#game');   // Game element.
  this.areaShadowEl = $('.area-shadow'); // Area shadow.
  this.player = new Player(); // Player.
  this.prompt = new Prompt(); // Interface with on-screen prompt.

  this.time = new Time(); // Tracks time in game.

  this.area = undefined;   // The current area.
  this.focus = undefined;  // The current focus.
  this.event = undefined;  // The current event.

  this.initializeNPCs();         // Creates and maps all NPC objects.
  this.initializeAreas();        // Creates and maps all game areas.
  this.initializeWalkthroughs(); // Creates and maps all player walkthroughs.
  this.initializeScreens();      // Creates and maps all player screens.

  // Initialized in Game.start
  this.messager = undefined; // The Game's messaging system.

  // Start the keyboard controller for key events (see js/keys.js).
  this.keyboardController(); 

  // Defaults (should be set in opening sequence).
  this.name = 'Adele';
  this.city = 'San Francisco';
}

/**
  Creates and maps all NPC objects as well as adds their travel schedules to 
  the time tracking system.
**/
Game.prototype.initializeNPCs = function() {
  this.NPCs = {}; // Map of NPC names to their objects.

  var collection = [
    new Alan(),
    new Anne(),
    new Charles(),
    new Elizabeth(),
    new Holland(),
    new Hopper(),
    new Margaret(),
    new Mary(),
    new Mom(),
    new Simon(),
    new Twumasiwaa(),
  ];

  for (var i = 0; i < collection.length; i++) {
    var npcObj = collection[i];
    this.NPCs[npcObj.name] = npcObj;
    this.time.augmentNPCSchedule(npcObj.name, npcObj.scheduleData);
  }
};

/**
  Creates and maps all areas in the game.
**/
Game.prototype.initializeAreas = function() {
  this.areas = {}; // Map of area names to their Area objects.

  var collection = [
    AnneHome(),
    CityNE(),
    CityNW({ 
      ritualRoastersHours: RitualRoasters().hoursMessage(),
    }),
    CitySE(),
    CitySW({
      libraryHours: Library({ mary: null }).hoursMessage(),
    }),
    ElizabethAlan(),
    HewittHome(),
    LeChateauLobby({ holland: this.getNPC('holland') }),
    LeChateauFloor1({ displayName: this.name }),
    LeChateauElevatorLobby(),
    LeChateauElevatorFloor1(),
    Library({ mary: this.getNPC('mary') }),
    RitualRoasters(),
    new RundownApt(),
    SimonMargaret(),
    Studio(),
  ];

  for (var i = 0; i < collection.length; i++) {
    var areaObj = collection[i];
    this.areas[areaObj.name] = areaObj;
  }
};

/**
  Creates and maps all player walkthroughs. Sets callbacks if necessary.
**/
Game.prototype.initializeWalkthroughs = function() {
  this.walkthroughs = {}; // Map of walkthroughs to their varous objects.

  var collection = [
    { walkthrough: new AnneIntro(), callback: this.anneIntroCallback() },
    { walkthrough: new NoLibraryCard() },
    { walkthrough: new OpeningHewitt(), callback: this.openingHewittCallback() },
    { walkthrough: new OpeningRundownApt(), callback: this.openingRundownAptCallback() },
  ];

  for (var i = 0; i < collection.length; i++) {
    var walkthroughObj = collection[i].walkthrough;
    var walkthroughCallback = collection[i].callback;

    walkthroughObj.setCallback(walkthroughCallback);
    this.walkthroughs[walkthroughObj.name] = walkthroughObj;
  }
};

/**
  Creates and maps all player screens. Sets callbacks if necessary.
**/
Game.prototype.initializeScreens = function() {
  this.screens = {}; // Map of screens to their varous objects.

  var collection = [
    { screen: new CharacterSelect(), callback: this.characterSelectCallback() },
    { screen: new Email() },
    { screen: new Keyboard(), callback: this.keyboardCallback() },
    { screen: new Newspaper(), callback: this.newspaperCallback() },
  ];

  for (var i = 0; i < collection.length; i++) {
    var screenObj = collection[i].screen;
    var screenCallback = collection[i].callback;

    screenObj.setCallback(screenCallback);
    this.screens[screenObj.name] = screenObj;
  }
};

/**
  Called to start the game!
  @param startX    The x coordinate to start the player at.
  @param startY    The y coordinate to start the player at.
  @param startFace The direction to start the player facing.
  @param area      The area to start in.
**/
Game.prototype.start = function(startX, startY, startFace, area) {
  this.messager = new Message('');

  /* Production: 
  this.displayScreen('keyboard');
  // Fade in/out animation between areas.
  this.gameEl.removeClass('visible');
  var game = this;
  window.setTimeout(function() {
    game.gameEl.addClass('visible');
  }, 250);
  // Lock game mode until new area is totally loaded.
  this.setStatus('loading');
  window.setTimeout(function() {
    game.setStatus('focused');
  }, 500);
  //*/

  //* For skipping playthrough (for testing).
  this.time.setTime(0, 8, 0, true);
  this.player.wallet.add(200);
  this.time.begin();
  this.time.startTime();
  this.moveToArea(area);
  this.faceDir(startFace);
  this.moveToSpace(startX, startY, startFace);
  //*/
}

/**
  Adds an screen to the Game.screens map.
  @param key The key for the screen.
  @param screen Screen's object.
**/
Game.prototype.addScreen = function (key, screen) {
  this.screens[key] = screen;
}

/**
  Getter for an NPC in the game.
  @param key The key for the npc.
  @return The NPC object.
**/
Game.prototype.getNPC = function (key) {
  return this.NPCs[key];
}

/**
  Setter for Game.status
**/
Game.prototype.setStatus = function(status) {
  this.status = status;
}

/**
  Set up for transitioning to a new area in the game.
  @param area The name of the area to move to.
**/
Game.prototype.moveToArea = function(area) {
  // Initialize values to empty.
  var from = '';
  var door = '';
  // New area to move to.
  var oldArea = this.area;
  if (typeof area == 'string') { area = this.areas[area]; }
  this.area = area;
  // If it's not a new game and we're in an area.
  if (oldArea != undefined) {
    from = oldArea.name;
    // Save the current area we're traveling from.
    window.sessionStorage.setItem('from', from);
    door = window.sessionStorage.getItem('door');

    // Set wherever we were in the previous area to unoccupied.
    oldArea.space(this.player.x, this.player.y).setUnoccupied();

    this.area.build(oldArea.elements, oldArea.NPCs);
  } else {
    this.area.build();
  }
  window.sessionStorage.setItem('area', area.name);
  // Remove door data until it's set again by a specific exit door.
  window.sessionStorage.removeItem('door');

  var positionData = this.area.getPositionData(from, door);
  this.faceDir(positionData.face);
  this.moveToSpace(
    positionData.x, 
    positionData.y, 
    positionData.face, 
    true /* arrivingInArea */
  );
  this.updateDuskLevel();

  // Fade in/out animation between areas.
  this.gameEl.removeClass('visible');
  var game = this;
  window.setTimeout(function() {
    game.gameEl.addClass('visible');
  }, 250);
  // Lock game mode until new area is totally loaded.
  this.setStatus('loading');
  window.setTimeout(function() {
    game.setStatus(game.focus == undefined ? 'free' : 'focused');
  }, 500);
}

/**
  Called to change direction player is facing.
  Mostly kept around for neatness of firing the direction change event.
  (Since the keyboardController has access to the avatar directly)
  @param dir The direction to face.
**/
Game.prototype.faceDir = function(dir) {
  this.face = dir;
  window.sessionStorage.setItem('face', this.face);
  switch(dir) {
    case DIR.LF:
      this.player.faceLeft();
      break;

    case DIR.UP:
      this.player.faceUp();
      break;

    case DIR.RT:
      this.player.faceRight();
      break;

    case DIR.DW:
      this.player.faceDown();
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
  this.faceDir(DIR.LF);
  this.moveToSpace(this.player.x - 1, this.player.y, DIR.LF);
}

/**
  Moves player one space up.
**/
Game.prototype.moveUp = function() {
  this.faceDir(DIR.UP);
  this.moveToSpace(this.player.x, this.player.y - 1, DIR.UP);
}

/**
  Moves player one space to the right.
**/
Game.prototype.moveRight = function() {
  this.faceDir(DIR.RT);
  this.moveToSpace(this.player.x + 1, this.player.y, DIR.RT);
}

/**
  Moves player one space down.
**/
Game.prototype.moveDown = function() {
  this.faceDir(DIR.DW);
  this.moveToSpace(this.player.x, this.player.y + 1, DIR.DW);
}

/** 
  Starts the walking animation for the avatar.
  @param dir The direction for walking animation.
**/
Game.prototype.startWalking = function(dir) {
  this.player.walk(dir);
  if (this.event != undefined) {
    this.event.fireWalkStart(dir);
  }
}

/**
  Stops the avatars walking animation.
**/
Game.prototype.stopWalking = function() {
  this.player.stopWalking();
  if (this.event != undefined) {
    this.event.fireWalkStop();
  }
}

/**
  Moves player to a new space if it's valid. Activates event zones, etc.
  @param toX     The proposed x coordinate.
  @param toY     The proposed y coordinate.
  @param fromDir Direction traveling from.
**/
Game.prototype.moveToSpace = function(toX, toY, fromDir, arrivingInArea) {
  // First check if we're trying to move into an exit.
  if (this.area.space(this.player.x, this.player.y) &&
      this.area.space(this.player.x, this.player.y).hasExitAdjacent(this.face)) {
    // If there is a specific door we're exiting, save it.
    if (space.hasExitDoor()) {
      window.sessionStorage.setItem('door', space.getDoor())
    }
    var exitSpace = this.area.space(this.player.x, this.player.y);
    exitSpace.setUnoccupied();
    this.exit(exitSpace.exitTo());
    return;
  }

  // Check if we're trying to enter a valid zone.
  if (this.validZone(toX, toY)) {
    space = this.area.space(toX, toY);

    // Make sure we can travel into that space from our current direction.
    if (!space.isBlocked(fromDir)) {
      // Keeping around for debugging purposes.
      console.log(toX, toY);
      // Save our current location (for page reload).
      // Will likely be removed when saving game is possible (no need to save every step).
      window.sessionStorage.setItem('x', toX);
      window.sessionStorage.setItem('y', toY);

      // If we're entering an event space, trigger it!
      if (space.hasEvent() && this.event == undefined) {
        this.event = space.getEvent();
        this.event.begin(toX, toY, this.player.face);

      // If we're still in an event space, fire movement event.
      } else if (space.hasEvent()) {
        this.event.fireMove(toX, toY);

      // If we're not in an event space, but have an event saved, end it!
      } else if (this.event != undefined) {
        this.event.end();
        this.event = undefined;
      }

      // Set the player's new position.
      if (!arrivingInArea) this.area.space(this.player.x, this.player.y).setUnoccupied();
      this.area.space(toX, toY).setOccupied();
      this.player.setPosition(toX, toY);      
      this.area.updateAreaPosition(toX, toY);
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
      && y >= 1
      && y <= this.area.height - 1;
}

/** 
  Handles a player using the backspace key.
**/
Game.prototype.backspace = function() {
  switch(this.status) {
    case 'focused':
      if (this.focus.backspace) {
        this.focus.backspace();
      }
      break;

    default:
      break;
  }
}

/**
  Handles a player trying to interact with something
**/
Game.prototype.interact = function() {
  switch(this.status) {
    // If the game is in free mode, try and interact with something.
    case 'free':
      currentSpace = this.area.space(this.player.x, this.player.y);

      // Find the x, y coordinate we're facing.
      faceX = this.face == DIR.LF ? this.player.x - 1 : this.player.x;
      faceX = this.face == DIR.RT ? this.player.x + 1 : faceX;
      faceY = this.face == DIR.UP ? this.player.y - 1 : this.player.y;
      faceY = this.face == DIR.DW ? this.player.y + 1 : faceY;
      faceSpace = this.area.space(faceX, faceY);

      // If we're in an interact zone, focus on that.
      if (currentSpace.isInteractZone()) {
        this.focus = currentSpace.getInteraction();
        this.setStatus(this.focus.interact(this.prompt, this.face) || 'free');

      // If we're facing an interactable space.
      } else if (faceSpace != undefined && faceSpace.canInteract(this.face)) {
        this.focus = faceSpace.getInteraction();
        this.setStatus(this.focus.interact(this.prompt, this.face) || 'free');
      }

      if (this.focus && this.status == 'free') {
        this.focus = undefined;
      }
      break;

    // If game is in conversation mode, advance the conversation.
    case 'focused':
      this.setStatus(this.focus.interact(this.prompt, this.face) || 'free');

      if (this.focus && this.status == 'free') {
        this.focus = undefined;
      } else if (this.status == 'exit') {
        var exit = this.focus.exitTo();
        this.focus = undefined;
        this.exit(exit);
      }
      break;

    case 'loading':
    case 'walkthrough':
    default:
      break;
  }
}

/**
  If we're in an outside space, update the dusk level of the space.
**/
Game.prototype.updateDuskLevel = function() {
  var outsideAreas = [
    'city-ne',
    'city-se',
    'city-sw',
    'city-nw'
  ];

  if (outsideAreas.indexOf(this.area.name) != -1) {
    switch(this.time.duskLevel()) {
      case 0:
        this.areaShadowEl.css('opacity', '0');
        break;

      case 1:
        this.areaShadowEl.css('opacity', '.4');
        break;

      case 2:
        this.areaShadowEl.css('opacity', '.6');
        break;

      default:
        break;
    } 
  } else {
    this.areaShadowEl.css('opacity', '0');
  }
}

/**
  Exits to another area.
  @param exitTo The name of the area to go to.
**/
Game.prototype.exit = function(exitTo) {
  var area = this.areas[exitTo];

  // If the player is entering a work place.
  if (exitTo == 'work') {
    this.focus = new Work();
    this.setStatus(this.focus.interact(this.prompt) || 'free');
    return;
  }

  // Collection of areas character can't enter.
  var cantGo = { 
    'elevator-roof': 1,
    'upgrade-apt': 1,
  };

  // If our exit goes somewhere we can't, customize the message.
  if (exitTo in cantGo) {
    if (exitTo == 'elevator-roof') { 
      this.messager.setMessage('You need a key to the roof.');
    } else if (exitTo == 'upgrade-apt') {
      this.messager.setMessage('Looks like it\'s under construction.')
    }

    this.focus = this.messager;
    this.setStatus(this.messager.interact(this.prompt) || 'free');
  } else if (area.isLimited() && area.isClosed(this.time.weekday, this.time.hour)) {
    this.messager.setMessage(area.fullName + ' is closed right now.');
    this.focus = this.messager;
    this.setStatus(this.messager.interact(this.prompt) || 'free');
  } else if (area.isResidential() && area.residentsAbsent()) {
    this.messager.setMessage('Nobody\'s home right now.');
    this.focus = this.messager;
    this.setStatus(this.messager.interact(this.prompt) || 'free');
  } else {
      // If this is our first time visiting the Ritual Roasters shop, run the Anne Intro walkthrough.
    if (exitTo == 'ritual-roasters' && !area.isVisited()) {
      area.setVisited();
      this.startWalkthrough('anne-intro');
      return;
    };

    this.moveToArea(area);
  }
}

/**
  Called to display an option screen (newspaper, inventory, etc.)
  @param screen The name of the screen to call.
**/
Game.prototype.displayScreen = function(screen) {
  var screenObj = this.screens[screen];
  if (screenObj != undefined) {
    screenObj.display(this.prompt);
    this.focus = screenObj;
    this.setStatus('focused');
  }
}

/**
  Called to start a walkthrough.
  @param walkthrough The name of the walkthrough to start.
**/
Game.prototype.startWalkthrough = function(walkthrough) {
  var walkthroughObj = this.walkthroughs[walkthrough];
  if (walkthroughObj != undefined) {
    this.setStatus('walkthrough');
    walkthroughObj.start(this);
    this.focus = walkthroughObj;
  }
};

/**
  Closes the current area and forces the player to exit.
**/
Game.prototype.closeArea = function() {
  var closing = new Message(this.area.fullName + ' is now closed.');
  this.focus = closing;
  this.setStatus(closing.interact(this.prompt) || 'free');
  this.exit(this.area.exitTo);
};

Game.prototype.updateKarma = function(key, change, logMessage) {
  game.player.karma.update(key, change, logMessage);
};

Game.prototype.logHistory = function(logMessage, today) {
  game.player.karma.log(logMessage, game.time.today());
};