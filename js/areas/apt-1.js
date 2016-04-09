var apt1 = new Area(28, 18, "apt-1", true);

apt1.addEventZone([8, 10], [16, 12], new Mirror());
apt1.addEventZone([21, 8], [25, 14], new Pool());

apt1.addItem(3, "doorframe", [8, 5], 20);
apt1.addItem(9, "wall",      [8, 6]);
apt1.addItem(3, "doorframe", [19, 5], 20);
apt1.addItem(9, "wall",      [19, 6]);

apt1.addInteraction(10, 4, new Message("Gym"), ["up"]);
var treadmillMessage = new Message("You don't have time to run!")
apt1.addInteraction(16, 7, treadmillMessage, ["rt"]);
apt1.addInteraction(16, 8, treadmillMessage, ["rt"]);
apt1.addInteraction(16, 9, treadmillMessage, ["rt"]);
apt1.addInteraction(21, 4, new Message("Pool"), ["up"]);

apt1.addExit(2, 3, ["up"], "elevator-apt-1", "left");
apt1.addExit(3, 3, ["up"], "elevator-apt-1", "right");

apt1.addPositionData("elevator", "left", 2, 3, "dw");
apt1.addPositionData("elevator", "right", 3, 3, "dw");
apt1.addPositionData("default", null, 3, 3, "dw");

game.addArea("apt-1", apt1);
