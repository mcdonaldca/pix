var studio = new Area(10, 9, "studio", true);

studio.addNPC(6, 6, "dw", game.getNPC("liam"), ["rt", "up"]);
studio.addNPC(8, 4, "dw", game.getNPC("vio"), ["lf", "up", "rt", "dw"]);

studio.addItem(3, "bed",        [7, 2]);
studio.addItem(2, "counter",    [2, 3]);
studio.addItem(4, "couch",      [4, 5]);
studio.addItem(2, "tv",         [5, 7]);
studio.addItem(1, "houseplant", [9, 7]);

studio.addInteraction(0, 1, new Fridge(), ["up"]);
studio.addInteraction(1, 1, new Fridge(), ["up"]);
var tvMessage = new Message([
    "Liam is watching \"The Office\"", 
    "It'd probabably be rude to change the channel now."
    ]);
studio.addInteraction(5, 8, tvMessage, ["dw"]);
studio.addInteraction(6, 8, tvMessage, ["dw"]);
studio.addInteraction(6, 1, new Message("It's a beautiful day outside."), ["up"]);
studio.addInteraction(8, 2, new SleepZone());
studio.addInteraction(9, 2, new SleepZone());
studio.addInteraction(9, 8, new Message("Hm... you should probably water your plant more."), ["rt", "dw"]);

studio.addExit(1, 8, ["dw"], "apt-2");

studio.addPositionData("apt-2", null, 1, 8, "up");
studio.addPositionData("default", null, 7, 4, "dw");

game.addArea(studio.getName(), studio);