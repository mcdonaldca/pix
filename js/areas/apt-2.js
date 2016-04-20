var apt2 = new Area(36, 6, "apt-2", true);

apt2.addInteraction(10, 1, new Message("Colquitt & Natalie's Apartment"), ["up"]);
apt2.addInteraction(16, 1, new Message("Margaret & Kayla's Apartment"), ["up"]);
apt2.addInteraction(22, 1, new Message("Taylor & Liam's Apartment"), ["up"]);
apt2.addInteraction(28, 1, new Message("Anne & Diane's Apartment"), ["up"]);

apt2.addExit( 2, 2, ["up"], "elevator-apt-2", "left");
apt2.addExit( 3, 2, ["up"], "elevator-apt-2", "right");
apt2.addExit( 9, 2, ["up"], "colquitt-natalie");
apt2.addExit(15, 2, ["up"], "margaret-kayla");
apt2.addExit(21, 2, ["up"], "taylor-liam");
apt2.addExit(27, 2, ["up"], "anne-diane");
apt2.addExit(33, 2, ["up"], "rundown-apt");

apt2.addPositionData("taylor-liam", null, 21, 2, "dw");
apt2.addPositionData("rundown-apt", null, 33, 2, "dw");
apt2.addPositionData("elevator", "left", 2, 2, "dw");
apt2.addPositionData("elevator", "right", 3, 2, "dw");
apt2.addPositionData("default", null, 33, 2, "dw");

game.addArea(apt2.getName(), apt2);