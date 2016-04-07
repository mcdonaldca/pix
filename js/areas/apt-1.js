var apt1 = new Area(28, 18, "apt-1", true);

apt1.addEventZone([8, 10], [16, 12], new Mirror());

apt1.addShowZone(2, 3, "doorframe", [8, 4], [[9, 4], [9, 5]]);
apt1.addShowZone(2, 9, "wall",      [8, 5], [[8, 6], [10, 6], [11, 6], [12, 6], [13, 6], [14, 6], [15, 6], [16, 6]]);
apt1.addShowZone(2, 3, "doorframe", [19, 4], [[20, 4], [20, 5]]);
apt1.addShowZone(2, 9, "wall",      [19, 5], [[19, 6], [21, 6], [22, 6], [23, 6], [24, 6], [25, 6], [26, 6], [27, 6]]);

apt1.addInteraction(10, 4, new Message("Gym"), ["up"]);
apt1.addInteraction(16, 7, new Message("You don't have time to run!"), ["rt"]);
apt1.addInteraction(16, 8, new Message("You don't have time to run!"), ["rt"]);
apt1.addInteraction(16, 9, new Message("You don't have time to run!"), ["rt"]);
apt1.addInteraction(21, 4, new Message("Pool"), ["up"]);

apt1.addExit(2, 3, ["up"], "elevator-apt-1", "left");
apt1.addExit(3, 3, ["up"], "elevator-apt-1", "right");

apt1.addPositionData("elevator", "left", 2, 3, "dw");
apt1.addPositionData("elevator", "right", 3, 3, "dw");
apt1.addPositionData("default", null, 3, 3, "dw");

game.addArea("apt-1", apt1);
