var apt1 = new Area(28, 18, "apt-1");

apt1.addEventZone([8,  7], [16, 5], new Mirror());
apt1.addEventZone([21, 9], [25, 3], new Pool());

apt1.addItem(3, "doorframe", [8,  12], 20);
apt1.addItem(9, "wall",      [8,  11]);
apt1.addItem(3, "doorframe", [19, 12], 20);
apt1.addItem(9, "wall",      [19, 11]);

apt1.addInteraction(10, 13, new Message("Gym"), ["up"]);
var treadmillMessage = new Message("You don't have time to run!")
apt1.addInteraction(16, 10, treadmillMessage, ["rt"]);
apt1.addInteraction(16,  9, treadmillMessage, ["rt"]);
apt1.addInteraction(16,  8, treadmillMessage, ["rt"]);
apt1.addInteraction(21, 13, new Message("Pool"), ["up"]);

apt1.addExit(2, 14, ["up"], "elevator-apt-1", "left");
apt1.addExit(3, 14, ["up"], "elevator-apt-1", "right");

apt1.addPositionData("elevator", "left", 2, 14, "dw");
apt1.addPositionData("elevator", "right", 3, 14, "dw");
apt1.addPositionData("default", null, 3, 14, "dw");

game.addArea(apt1.getName(), apt1);
