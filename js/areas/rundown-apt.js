var rundownApt = new Area(5, 6, "rundown-apt", true);

rundownApt.addItem(1, "bed", [4, 2]);
rundownApt.addItem(1, "covers", [4, 1]);

rundownApt.addInteraction(0, 4, new Fridge(), ["up"]);

rundownApt.addPositionData("apt-2", null, 1, 0, "up");
rundownApt.addPositionData("default", null, 2, 1, "up");

rundownApt.addExit(1, 0, ["dw"], "apt-2");

game.addArea("rundown-apt", rundownApt);