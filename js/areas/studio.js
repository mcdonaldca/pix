var studio = new Area(10, 9, "studio", true);

studio.addNPC(6, 2, new Liam(), ["rt", "up"]);
studio.addNPC(8, 4, new Vio(), ["lf", "up", "rt", "dw"]);

studio.addItem(3, "bed",        [7, 6]);
studio.addItem(2, "counter",    [2, 5]);
studio.addItem(4, "couch",      [4, 3]);
studio.addItem(2, "tv",         [5, 1]);
studio.addItem(1, "houseplant", [9, 1]);

studio.addInteraction(0, 7, new Fridge(), ["up"]);
studio.addInteraction(1, 7, new Fridge(), ["up"]);
studio.addInteraction(5, 0, 
  new Message([
    "Liam is watching \"The Office\"", 
    "It'd probabably be rude to change the channel now."]),
  ["dw"]);
studio.addInteraction(6, 0, 
  new Message([
    "Liam is watching \"The Office\"", 
    "It'd probabably be rude to change the channel now."]), 
  ["dw"]);
studio.addInteraction(6, 7, new Message("It's a beautiful day outside."), ["up"]);
studio.addInteraction(8, 6, new SleepZone());
studio.addInteraction(9, 6, new SleepZone());
studio.addInteraction(9, 0, new Message("Hm... you should probably water your plant more."), ["rt", "dw"]);

studio.addExit(1, 0, ["dw"], "apt-2");

studio.addPositionData("apt-2", null, 1, 0, "up");
studio.addPositionData("default", null, 7, 4, "dw");

game.addArea("studio", studio);