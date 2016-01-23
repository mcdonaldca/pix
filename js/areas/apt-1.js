var apt1 = new Grid(28, 18, "apt-1", true);

mirror = new Mirror();
apt1.addEventZone( 8, 10, mirror);
apt1.addEventZone( 8, 11, mirror);
apt1.addEventZone( 8, 12, mirror);
apt1.addEventZone( 9, 10, mirror);
apt1.addEventZone( 9, 11, mirror);
apt1.addEventZone( 9, 12, mirror);
apt1.addEventZone(10, 10, mirror);
apt1.addEventZone(10, 11, mirror);
apt1.addEventZone(10, 12, mirror);
apt1.addEventZone(11, 10, mirror);
apt1.addEventZone(11, 11, mirror);
apt1.addEventZone(11, 12, mirror);
apt1.addEventZone(12, 10, mirror);
apt1.addEventZone(12, 11, mirror);
apt1.addEventZone(12, 12, mirror);
apt1.addEventZone(13, 10, mirror);
apt1.addEventZone(13, 11, mirror);
apt1.addEventZone(13, 12, mirror);
apt1.addEventZone(14, 10, mirror);
apt1.addEventZone(14, 11, mirror);
apt1.addEventZone(14, 12, mirror);
apt1.addEventZone(15, 10, mirror);
apt1.addEventZone(15, 11, mirror);
apt1.addEventZone(15, 12, mirror);
apt1.addEventZone(16, 10, mirror);
apt1.addEventZone(16, 11, mirror);
apt1.addEventZone(16, 12, mirror);

apt1.addShowZone( 9, 4, "gym-doorframe");
apt1.addShowZone( 9, 5, "gym-doorframe");
apt1.addShowZone( 8, 6, "gym-wall");
apt1.addShowZone(10, 6, "gym-wall");
apt1.addShowZone(11, 6, "gym-wall");
apt1.addShowZone(12, 6, "gym-wall");
apt1.addShowZone(13, 6, "gym-wall");
apt1.addShowZone(14, 6, "gym-wall");
apt1.addShowZone(15, 6, "gym-wall");
apt1.addShowZone(16, 6, "gym-wall");
apt1.addShowZone(20, 4, "pool-doorframe");
apt1.addShowZone(20, 5, "pool-doorframe");
apt1.addShowZone(19, 6, "pool-wall");
apt1.addShowZone(21, 6, "pool-wall");
apt1.addShowZone(22, 6, "pool-wall");
apt1.addShowZone(23, 6, "pool-wall");
apt1.addShowZone(24, 6, "pool-wall");
apt1.addShowZone(25, 6, "pool-wall");
apt1.addShowZone(26, 6, "pool-wall");
apt1.addShowZone(27, 6, "pool-wall");

apt1.addInteraction(10, 4, new Message("Gym"), ["up"]);
apt1.addInteraction(16, 7, new Message("You don't have time to run!"), ["rt"]);
apt1.addInteraction(16, 8, new Message("You don't have time to run!"), ["rt"]);
apt1.addInteraction(21, 4, new Message("Pool"), ["up"]);

apt1.addExit( 2, 3, ["up"], "elevator-apt-1", "left");
apt1.addExit( 3, 3, ["up"], "elevator-apt-1", "right");

var game = undefined;
if (window.sessionStorage.getItem("door") == "left") {
  game = new Game(2, 3, "dw", apt1);
} else {
  game = new Game(3, 3, "dw", apt1);
}
