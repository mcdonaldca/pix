var hewittHome = new Area(7, 7, "hewitt-home", true);

var mom = game.getNPC("mom");
hewittHome.addNPC(5, 4, mom, ["up", "rt", "dw", "lf"]);
mom.avatar.hide();

hewittHome.addItem(4, "table", [1, 3]);
hewittHome.addItem(1, "newspaper", [3, 2]);
hewittHome.getItem("newspaper").hide();

hewittHome.addPositionData("default", null, 4, 2, "lf");

game.addArea("hewitt-home", hewittHome);