var lobby = new Area(10, 7, "lobby", true);

lobby.addNPC(6, 4, "dw", game.getNPC("holland"), ["lf", "up"]);
lobby.addInteraction(5, 4, holland, ["rt"]);

lobby.addItem(2, "counter", [6, 4]);

lobby.addExit(2, 4, ["up"], "elevator-lobby", "left");
lobby.addExit(3, 4, ["up"], "elevator-lobby", "right");
lobby.addExit(2, 0, ["dw"], "city");

lobby.addPositionData("city", null, 2, 0, "up");
lobby.addPositionData("elevator", "left", 2, 4, "dw");
lobby.addPositionData("elevator", "right", 3, 4, "dw");
lobby.addPositionData("default", null, 5, 0, "up");

game.addArea(lobby.getName(), lobby);