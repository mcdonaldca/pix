/**
  Creates and maps all NPC objects as well as adds their travel schedules to 
  the time tracking system.
**/
Game.prototype.initializeNPCs = function() {
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