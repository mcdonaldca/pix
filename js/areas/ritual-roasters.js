var ritualRoasters = new LimitedArea(
  6, 9, 
  "ritual-roasters", 
  "Ritual Coffee Roasters", 
  ["Open 6:00AM - 6:00PM, closed Wednesdays.", [[6, 18], [6, 18], [6, 18], [], [6, 18], [6, 18], [6, 18]]], 
  "city-nw"
);

ritualRoasters.addItem(1, "counter-end", [3, 1]);
ritualRoasters.addItem(1, "counter-end-2", [3, 2], 1);
ritualRoasters.addItem(2, "counter", [2, 2], 1);
ritualRoasters.addItem(1, "counter-glass", [5, 4]);
ritualRoasters.addItem(1, "houseplant", [5, 7]);

ritualRoasters.addNPC(4, 3, DIR.LF, game.getNPC('twumasiwaa'), [DIR.LF, DIR.DW]);
ritualRoasters.addInteraction(3, 3, new Message("Buying interaction coming soon"), [DIR.RT]);
ritualRoasters.addNPC(5, 4, DIR.DW, game.getNPC("anne"), [DIR.UP, DIR.DW]);

ritualRoasters.addInteraction(0, 2, new Message("That's not your coffee..."), [DIR.LF]);

ritualRoasters.addExit(3, 8, DIR.DW, "city-nw");
ritualRoasters.addExit(5, 2, DIR.UP, "work");
ritualRoasters.addPositionData(3, 8, DIR.UP, "default");

game.addArea(ritualRoasters.getName(), ritualRoasters);