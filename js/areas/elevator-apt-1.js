var elevatorApt1 = new Area(4, 4, "elevator");

elevatorApt1.addInteraction(0, 2, new Elevator(2), ["up"]);

elevatorApt1.addExit(1, 0, ["dw"], "apt-1", "left");
elevatorApt1.addExit(2, 0, ["dw"], "apt-1", "right");

elevatorApt1.addPositionData("elevator", null, 0, 1, "up");
elevatorApt1.addPositionData("apt-1", "left", 1, 0, "up");
elevatorApt1.addPositionData("apt-1", "right", 2, 0, "up");
elevatorApt1.addPositionData("default", null, 2, 0, "up");

game.addArea(elevatorApt1.getName(), elevatorApt1);