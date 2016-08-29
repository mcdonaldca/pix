var hewittHome = new Area(7, 7, "hewitt-home");

hewittHome.addNPC(5, 2, DIR.DW, game.getNPC("mom"), [DIR.UP, DIR.RT, DIR.DW, DIR.LF]);

hewittHome.addItem(4, "table", [1, 3]);
hewittHome.addItem(1, "newspaper", [3, 4]);
hewittHome.getItem("newspaper").hide();

hewittHome.addPositionData(4, 4, DIR.LF, "default");

game.addArea(hewittHome.getName(), hewittHome);