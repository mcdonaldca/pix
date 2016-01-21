var apt1 = new Grid(28, 19, "apt-1");

apt1.addBlocked( 0,  4);         // Wall
apt1.addBlocked( 0,  5);         // Wall
apt1.addBlocked( 1,  4);         // Wall
apt1.addBlocked( 1,  5);         // Wall
apt1.addBlocked( 2,  4);         // Elevator
apt1.addBlocked( 2,  5);         // Elevator
apt1.addBlocked( 3,  4);         // Elevator
apt1.addBlocked( 3,  5);         // Elevator
apt1.addBlocked( 4,  4);         // Wall
apt1.addBlocked( 4,  5);         // Wall
apt1.addBlocked( 5,  4);         // Wall
apt1.addBlocked( 5,  5);         // Wall
apt1.addBlocked( 6,  4);         // Wall
apt1.addBlocked( 6,  5);         // Wall
apt1.addBlocked( 7,  4);         // Wall
apt1.addBlocked( 7,  5);         // Wall
apt1.addBlocked( 8,  4);         // Wall
apt1.addBlocked( 8,  5);         // Wall
apt1.addBlocked(10,  4);         // Wall
apt1.addBlocked(10,  5);         // Wall
apt1.addBlocked(11,  4);         // Wall
apt1.addBlocked(11,  5);         // Wall
apt1.addBlocked(12,  4);         // Wall
apt1.addBlocked(12,  5);         // Wall
apt1.addBlocked(13,  4);         // Wall
apt1.addBlocked(13,  5);         // Wall
apt1.addBlocked(14,  4);         // Wall
apt1.addBlocked(14,  5);         // Wall
apt1.addBlocked(15,  4);         // Wall
apt1.addBlocked(15,  5);         // Wall
apt1.addBlocked(16,  4);         // Wall
apt1.addBlocked(16,  5);         // Wall
apt1.addBlocked(17,  4);         // Wall
apt1.addBlocked(17,  5);         // Wall
apt1.addBlocked(18,  4);         // Wall
apt1.addBlocked(18,  5);         // Wall
apt1.addBlocked(19,  4);         // Wall
apt1.addBlocked(19,  5);         // Wall
apt1.addBlocked(21,  4);         // Wall
apt1.addBlocked(21,  5);         // Wall
apt1.addBlocked(22,  4);         // Wall
apt1.addBlocked(22,  5);         // Wall
apt1.addBlocked(23,  4);         // Wall
apt1.addBlocked(23,  5);         // Wall
apt1.addBlocked(24,  4);         // Wall
apt1.addBlocked(24,  5);         // Wall
apt1.addBlocked(25,  4);         // Wall
apt1.addBlocked(25,  5);         // Wall
apt1.addBlocked(26,  4);         // Wall
apt1.addBlocked(26,  5);         // Wall
apt1.addBlocked(27,  4);         // Wall
apt1.addBlocked(27,  5);         // Wall
apt1.addBlocked( 7,  6);         // Gym Wall
apt1.addBlocked( 7,  7);         // Gym Wall
apt1.addBlocked( 7,  8);         // Gym Wall
apt1.addBlocked( 7,  9);         // Gym Wall
apt1.addBlocked( 7, 10);         // Gym Wall
apt1.addBlocked( 7, 11);         // Gym Wall
apt1.addBlocked( 7, 12);         // Gym Wall
apt1.addBlocked( 8, 13);         // Gym Back Wall
apt1.addBlocked( 9, 13);         // Gym Back Wall
apt1.addBlocked(10, 13);         // Gym Back Wall
apt1.addBlocked(11, 13);         // Gym Back Wall
apt1.addBlocked(12, 13);         // Gym Back Wall
apt1.addBlocked(13, 13);         // Gym Back Wall
apt1.addBlocked(14, 13);         // Gym Back Wall
apt1.addBlocked(15, 13);         // Gym Back Wall
apt1.addBlocked(16, 13);         // Gym Back Wall
apt1.addBlocked(17,  6);         // Gym Wall
apt1.addBlocked(17,  7);         // Gym Wall
apt1.addBlocked(17,  8);         // Gym Wall
apt1.addBlocked(17,  9);         // Gym Wall
apt1.addBlocked(17, 10);         // Gym Wall
apt1.addBlocked(17, 11);         // Gym Wall
apt1.addBlocked(17, 12);         // Gym Wall
apt1.addBlocked(18,  6);         // Pool Wall
apt1.addBlocked(18,  7);         // Pool Wall
apt1.addBlocked(18,  8);         // Pool Wall
apt1.addBlocked(18,  9);         // Pool Wall
apt1.addBlocked(18, 10);         // Pool Wall
apt1.addBlocked(18, 11);         // Pool Wall
apt1.addBlocked(18, 12);         // Pool Wall
apt1.addBlocked(18, 13);         // Pool Wall
apt1.addBlocked(18, 14);         // Pool Wall
apt1.addBlocked(18, 15);         // Pool Wall
apt1.addBlocked(18, 16);         // Pool Wall

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
apt1.addShowZone(21, 8, "water-1");
apt1.addShowZone(22, 8, "water-1");
apt1.addShowZone(23, 8, "water-1");
apt1.addShowZone(24, 8, "water-1");
apt1.addShowZone(25, 8, "water-1");

apt1.addInteraction(10, 4, new Message("Gym"), ["up"]);
apt1.addInteraction(21, 4, new Message("Pool"), ["up"]);

apt1.addExit( 2, 3, ["up"], "elevator-apt-1", "left");
apt1.addExit( 3, 3, ["up"], "elevator-apt-1", "right");

var game = undefined;
if (window.sessionStorage.getItem("door") == "left") {
  game = new Game(2, 3, "dw", apt1);
} else {
  game = new Game(3, 3, "dw", apt1);
}
