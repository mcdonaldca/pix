var hewittHome = new Area(7, 7, "hewitt-home", true);

hewittHome.addNPC(5, 4, new Mom(), ["up", "rt", "dw", "lf"]);

hewittHome.addItem(4, "table", [1, 3]);

game.addArea("hewitt-home", hewittHome);