var hewittHome = new Area(7, 7, "hewitt-home", true);

hewittHome.addNPC(5, 4, game.getNPC("mom"), ["up", "rt", "dw", "lf"]);

hewittHome.addItem(4, "table", [1, 3]);

hewittHome.addPositionData("default", null, 4, 2, "lf");

game.addArea("hewitt-home", hewittHome);