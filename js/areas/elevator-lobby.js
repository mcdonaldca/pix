var elevatorLobby = new Area(4, 4, "elevator");

elevatorLobby.addInteraction(0, 1, new Elevator(3), ["up"]);

elevatorLobby.addExit(1, 3, ["dw"], "lobby", "left");
elevatorLobby.addExit(2, 3, ["dw"], "lobby", "right");

elevatorLobby.addPositionData("elevator", null, 0, 2, "up");
elevatorLobby.addPositionData("lobby", "left", 1, 3, "up");
elevatorLobby.addPositionData("lobby", "right", 2, 3, "up");
elevatorLobby.addPositionData("default", null, 2, 3, "up");

game.addArea(elevatorLobby.getName() + "-lobby", elevatorLobby);