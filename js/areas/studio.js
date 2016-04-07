var studio = new Area(10, 9, "studio", true);

studio.addNPC(6, 2, new Liam(), ["rt", "up"]);
studio.addNPC(8, 4, new Remy(), ["lf", "up", "rt", "dw"]);

studio.addShowZone(3, 3, "bed",        [7, 5], [[8, 6], [9, 6]]);
studio.addShowZone(2, 2, "counter",    [2, 4], [[2, 5], [3, 5]]);
studio.addShowZone(3, 4, "couch",      [4, 1], [[4, 3], [5, 3], [6, 3], [7, 3]]);
studio.addShowZone(2, 2, "tv",         [5, 0], [[5, 1], [6, 1]]);
studio.addShowZone(2, 1, "houseplant", [9, 0], [[9, 1]]);

studio.addInteraction(0, 7, new Fridge(), ["up"]);
studio.addInteraction(1, 7, new Fridge(), ["up"]);
studio.addInteraction(5, 0, new Message("Looks like Liam is watching \"The Office\""), ["dw"]);
studio.addInteraction(6, 0, new Message("Looks like Liam is watching \"The Office\""), ["dw"]);
studio.addInteraction(6, 7, new Message("It's a beautiful day outside."), ["up"]);
studio.addInteraction(8, 6, new SleepZone());
studio.addInteraction(9, 6, new SleepZone());
studio.addInteraction(9, 0, new Message("Hm... you should probably water your plant more."), ["rt", "dw"]);

studio.addExit(1, 0, ["dw"], "apt-2");

studio.addPositionData("apt-2", null, 1, 0, "up");
studio.addPositionData("default", null, 7, 4, "dw");

game.addArea("studio", studio);