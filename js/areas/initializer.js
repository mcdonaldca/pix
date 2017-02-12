/**
  Creates and maps all areas in the game.
**/
Game.prototype.initializeAreas = function() {
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