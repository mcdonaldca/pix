var elevatorApt1 = new Area(4, 4, "elevator", true);

elevatorApt1.addInteraction(0, 1, new Elevator(2), ["up"]);

elevatorApt1.addExit(1, 3, ["dw"], "apt-1", "left");
elevatorApt1.addExit(2, 3, ["dw"], "apt-1", "right");

elevatorApt1.addPositionData("elevator", null, 0, 2, "up");
elevatorApt1.addPositionData("apt-1", "left", 1, 3, "up");
elevatorApt1.addPositionData("apt-1", "right", 2, 3, "up");
elevatorApt1.addPositionData("default", null, 2, 3, "up");

game.addArea(elevatorApt1.getName() + "-apt-1", elevatorApt1);