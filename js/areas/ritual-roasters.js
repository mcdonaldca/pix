var ritualRoasters = new LimitedArea(
  6, 9, 
  "ritual-roasters", 
  "Ritual Coffee Roasters", 
  ["6:00AM - 6:00PM, closed Wednesdays.", [[6, 18], [6, 18], [6, 18], [], [6, 18], [6, 18], [6, 18]]], 
  "city-nw"
);

ritualRoasters.addItem(1, "counter-end", [3, 1]);
ritualRoasters.addItem(1, "counter-end-2", [3, 2], 1);
ritualRoasters.addItem(2, "counter", [2, 2], 1);
ritualRoasters.addItem(1, "counter-glass", [5, 4]);
ritualRoasters.addItem(1, "houseplant", [5, 7]);

ritualRoasters.addNPC(4, 3, "lf", rama, ["lf", "dw"]);
ritualRoasters.addInteraction(3, 3, new Message("Buying interaction coming soon"), ["rt"]);
ritualRoasters.addNPC(5, 4, "dw", game.getNPC("anne"), ["up", "dw"]);

ritualRoasters.addInteraction(0, 2, new Message("That's not your coffee..."), ["lf"]);

ritualRoasters.addExit(3, 8, "dw", "city-nw");
ritualRoasters.addExit(5, 2, "up", "work");
ritualRoasters.addPositionData(3, 8, "up", "default");

game.addArea(ritualRoasters.getName(), ritualRoasters);