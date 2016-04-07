var elevatorApt2 = new Grid(4, 4, "elevator");

elevatorApt2.addInteraction(0, 2, new Elevator(1), ["up"]);

elevatorApt2.addExit(1, 0, ["dw"], "apt-2", "left");
elevatorApt2.addExit(2, 0, ["dw"], "apt-2", "right");

elevatorApt2.addPositionData("elevator", null, 0, 1, "up");
elevatorApt2.addPositionData("apt-2", "left", 1, 0, "up");
elevatorApt2.addPositionData("apt-2", "right", 2, 0, "up");
elevatorApt2.addPositionData("default", null, 2, 0, "up");

game.addArea("elevator-apt-2", elevatorApt2);