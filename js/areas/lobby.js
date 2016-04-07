var lobby = new Area(10, 7, "lobby", true);

var holland = new Holland();
lobby.addNPC(6, 4, holland, ["lf", "up"]);
lobby.addInteraction(5, 4, holland, ["rt"]);

lobby.addShowZone(2, 1, "counter", [7, 3], [[7, 4]]);

lobby.addExit(2, 4, ["up"], "elevator-lobby", "left");
lobby.addExit(3, 4, ["up"], "elevator-lobby", "right");

lobby.addPositionData("elevator", "left", 2, 4, "dw");
lobby.addPositionData("elevator", "right", 3, 4, "dw");
lobby.addPositionData("default", null, 5, 0, "up");

game.addArea("lobby", lobby);