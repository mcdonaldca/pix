/**
  Creates and maps all areas in the game and builds the World object.
**/
Game.prototype.initializeWorld = function() {
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
    this.world.addArea(collection[i]);
  }
};