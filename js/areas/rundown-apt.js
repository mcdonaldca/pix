var rundownApt = new Area(5, 6, "rundown-apt", true);

rundownApt.addItem(1, "bed", [4, 2]);
rundownApt.addItem(1, "covers", [4, 1]);

rundownApt.addInteraction(0, 4, new Fridge(), ["up"]);

rundownApt.addPositionData("default", null, 2, 1, "up");

game.addArea("rundown-apt", rundownApt);