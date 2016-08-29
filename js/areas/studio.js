var studio = new Area(10, 9, "studio");

studio.addNPC(6, 6, DIR.DW, game.getNPC("liam"), [DIR.RT, DIR.UP]);
studio.addNPC(8, 4, DIR.DW, game.getNPC("vio"), [DIR.LF, DIR.UP, DIR.RT, DIR.DW]);

studio.addItem(3, "bed",        [7, 2]);
studio.addItem(2, "counter",    [2, 3]);
studio.addItem(4, "couch",      [4, 5]);
studio.addItem(2, "tv",         [5, 7]);
studio.addItem(1, "houseplant", [9, 7]);

studio.addInteraction(0, 1, new Fridge(), [DIR.UP]);
studio.addInteraction(1, 1, new Fridge(), [DIR.UP]);
var tvMessage = new Message([
    "Liam is watching \"The Office\"", 
    "It'd probabably be rude to change the channel now."
    ]);
studio.addInteraction(5, 8, tvMessage, [DIR.DW]);
studio.addInteraction(6, 8, tvMessage, [DIR.DW]);
studio.addInteraction(6, 1, new Message("It's a beautiful day outside."), [DIR.UP]);
studio.addInteraction(8, 2, new SleepZone());
studio.addInteraction(9, 2, new SleepZone());
studio.addInteraction(9, 8, new Message("Hm... you should probably water your plant more."), [DIR.RT, DIR.DW]);

studio.addExit(1, 8, DIR.DW, "le-chateau-floor-1");
studio.addPositionData(7, 4, DIR.DW, "default");

game.addArea(studio.getName(), studio);