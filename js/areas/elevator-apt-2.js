var elevatorApt2 = new Area(4, 4, "elevator", true);

elevatorApt2.addInteraction(0, 1, new Elevator(1), ["up"]);

elevatorApt2.addExit(1, 3, ["dw"], "apt-2", "left");
elevatorApt2.addExit(2, 3, ["dw"], "apt-2", "right");

elevatorApt2.addPositionData("elevator", null, 0, 2, "up");
elevatorApt2.addPositionData("apt-2", "left", 1, 3, "up");
elevatorApt2.addPositionData("apt-2", "right", 2, 3, "up");
elevatorApt2.addPositionData("default", null, 2, 3, "up");

game.addArea(elevatorApt2.getName() + "-apt-2", elevatorApt2);