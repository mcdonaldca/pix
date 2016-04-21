var lobby = new Area(10, 7, "lobby");

lobby.addNPC(6, 2, "dw", game.getNPC("holland"), ["lf", "up"]);
lobby.addInteraction(5, 2, holland, ["rt"]);

lobby.addItem(2, "counter", [6, 2]);

lobby.addExit(2, 2, ["up"], "elevator-lobby", "left");
lobby.addExit(3, 2, ["up"], "elevator-lobby", "right");
lobby.addExit(2, 6, ["dw"], "city-sw");

lobby.addPositionData("city-sw", null, 2, 6, "up");
lobby.addPositionData("elevator", "left", 2, 2, "dw");
lobby.addPositionData("elevator", "right", 3, 2, "dw");
lobby.addPositionData("default", null, 5, 6, "up");

game.addArea(lobby.getName(), lobby);