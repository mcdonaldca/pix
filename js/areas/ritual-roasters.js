var ritualRoasters = new LimitedArea(
  8, 9, 
  "ritual-roasters", 
  "Ritual Coffee Roasters", 
  ["Open 6:00AM - 6:00PM, closed Wednesdays.", [[6, 18], [6, 18], [6, 18], [], [6, 18], [6, 18], [6, 18]]], 
  "city-nw"
);

ritualRoasters.addItem(1, "counter-end",   [4, 1]);
ritualRoasters.addItem(1, "counter-end-2", [4, 2], 1);
ritualRoasters.addItem(2, "counter",       [3, 2], 1);
ritualRoasters.addItem(1, "counter-glass", [6, 4]);
ritualRoasters.addItem(1, "houseplant",    [6, 7]);

ritualRoasters.addInteraction(4, 3, new Message("Buying interaction coming soon"), [DIR.RT]);
ritualRoasters.addInteraction(1, 2, new Message("That's not your coffee..."), [DIR.LF]);

ritualRoasters.addExit(4, 8, DIR.DW, "city-nw");
ritualRoasters.addExit(6, 2, DIR.UP, "work");
ritualRoasters.addPositionData(4, 8, DIR.UP, "default");

game.addArea(ritualRoasters.getName(), ritualRoasters);