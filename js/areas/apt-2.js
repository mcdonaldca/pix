var apt2 = new Area(24, 6, "apt-2");

apt2.addInteraction(10, 1, new Message("Unoccupied"), ["up"]);
apt2.addInteraction(16, 1, new Message("Margaret & Liam's Apartment"), ["up"]);
apt2.addInteraction(22, 1, new Message(game.name + "'s Apartment"), ["up"]);

apt2.addExit( 2, 2, ["up"], "elevator-apt-2", "left");
apt2.addExit( 3, 2, ["up"], "elevator-apt-2", "right");
apt2.addExit( 9, 2, ["up"], "upgrade-apt");
apt2.addExit(15, 2, ["up"], "margaret-liam");
apt2.addExit(21, 2, ["up"], "rundown-apt");

apt2.addPositionData("upgrade-apt", null, 9, 2, "dw");
apt2.addPositionData("margaret-liam", null, 15, 2, "dw");
apt2.addPositionData("rundown-apt", null, 21, 2, "dw");
apt2.addPositionData("elevator", "left", 2, 2, "dw");
apt2.addPositionData("elevator", "right", 3, 2, "dw");
apt2.addPositionData("default", null, 21, 2, "dw");

game.addArea(apt2.getName(), apt2);