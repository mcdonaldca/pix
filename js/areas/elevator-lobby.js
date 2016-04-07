var elevatorLobby = new Grid(4, 4, "elevator");

elevatorLobby.addInteraction(0, 2, new Elevator(3), ["up"]);

elevatorLobby.addExit(1, 0, ["dw"], "lobby", "left");
elevatorLobby.addExit(2, 0, ["dw"], "lobby", "right");

elevatorLobby.addPositionData("elevator", null, 0, 1, "up");
elevatorLobby.addPositionData("lobby", "left", 1, 0, "up");
elevatorLobby.addPositionData("lobby", "right", 2, 0, "up");
elevatorLobby.addPositionData("default", null, 2, 0, "up");

game.addArea("elevator-lobby", elevatorLobby);