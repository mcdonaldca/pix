var apt2 = new Area(36, 6, "apt-2");

apt2.addInteraction(10, 4, new Message("Colquitt & Natalie's Apartment"), ["up"]);
apt2.addInteraction(16, 4, new Message("Margaret & Kayla's Apartment"), ["up"]);
apt2.addInteraction(22, 4, new Message("Taylor & Liam's Apartment"), ["up"]);
apt2.addInteraction(28, 4, new Message("Anne & Diane's Apartment"), ["up"]);

apt2.addExit( 2, 3, ["up"], "elevator-apt-2", "left");
apt2.addExit( 3, 3, ["up"], "elevator-apt-2", "right");
apt2.addExit( 9, 3, ["up"], "colquitt-natalie");
apt2.addExit(15, 3, ["up"], "margaret-kayla");
apt2.addExit(21, 3, ["up"], "taylor-liam");
apt2.addExit(27, 3, ["up"], "anne-diane");
apt2.addExit(33, 3, ["up"], "rundown-apt");

apt2.addPositionData("taylor-liam", null, 21, 3, "dw");
apt2.addPositionData("rundown-apt", null, 33, 3, "dw");
apt2.addPositionData("elevator", "left", 2, 3, "dw");
apt2.addPositionData("elevator", "right", 3, 3, "dw");
apt2.addPositionData("default", null, 33, 3, "dw");

game.addArea(apt2.getName(), apt2);