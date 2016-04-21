/**
  Coffee shop in the city.
**/
function RitualRoasters() {
  $.extend(this, new Area(6, 9, "ritual-roasters", true));
  this.visited = false; // If the area has been visited yet.
}

/** 
  Marks the area as visited.
**/
RitualRoasters.prototype.setVisited = function() {
  this.visited = true;
};

/** 
  Getter for RitualRoasters.visited.
  @return Boolean
**/
RitualRoasters.prototype.isVisited = function() {
  return this.visited;
};

var ritualRoasters = new RitualRoasters();

ritualRoasters.addItem(1, "counter-end", [3, 1]);
ritualRoasters.addItem(1, "counter-end-2", [3, 2], 1);
ritualRoasters.addItem(2, "counter", [2, 2], 1);
ritualRoasters.addItem(1, "counter-glass", [5, 4]);
ritualRoasters.addItem(1, "houseplant", [5, 7]);

ritualRoasters.addNPC(4, 3, "lf", rama, ["lf", "dw"]);
ritualRoasters.addInteraction(3, 3, new Message("Buying interaction coming soon"), ["rt"]);
ritualRoasters.addNPC(5, 4, "dw", game.getNPC("anne"), ["up", "dw"]);

ritualRoasters.addInteraction(0, 2, new Message("That's not your coffee..."), ["lf"]);

ritualRoasters.addExit(3, 8, ["dw"], "city-nw");

ritualRoasters.addPositionData("city-nw", null, 3, 8, "up");
ritualRoasters.addPositionData("default", null, 3, 8, "up");

game.addArea(ritualRoasters.getName(), ritualRoasters);