var ritualRoasters = new Area(6, 9, "ritual-roasters", true);

ritualRoasters.addItem(1, "houseplant", [5, 7]);

ritualRoasters.addInteraction(0, 2, new Message("That's not your coffee..."), ["lf"]);

ritualRoasters.addExit(3, 8, ["dw"], "city-nw");

ritualRoasters.addPositionData("city-nw", null, 3, 8, "up");
ritualRoasters.addPositionData("default", null, 3, 8, "up");

game.addArea(ritualRoasters.getName(), ritualRoasters);