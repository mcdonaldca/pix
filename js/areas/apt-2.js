var apt_hallway = new Grid(36, 6, "apt-hallway");

apt_hallway.addInteraction(10, 4, new Message("Colquitt's Apartment"), ["up"]);
apt_hallway.addInteraction(16, 4, new Message("Margaret & Natalie's Apartment"), ["up"]);
apt_hallway.addInteraction(22, 4, new Message("Adele & Liam's Apartment"), ["up"]);
apt_hallway.addInteraction(28, 4, new Message("Anne & Diane's Apartment"), ["up"]);
apt_hallway.addInteraction(34, 4, new Message("Simon's Apartment"), ["up"]);

apt_hallway.addExit( 2, 3, ["up"], "elevator-apt-2", "left");
apt_hallway.addExit( 3, 3, ["up"], "elevator-apt-2", "right");
apt_hallway.addExit( 9, 3, ["up"], "colquitt");
apt_hallway.addExit(15, 3, ["up"], "margaret-natalie");
apt_hallway.addExit(21, 3, ["up"], "studio");
apt_hallway.addExit(27, 3, ["up"], "anne-diane");
apt_hallway.addExit(33, 3, ["up"], "simon");

var game = undefined;
if (window.sessionStorage.getItem("from") == "elevator") {
  if (window.sessionStorage.getItem("door") == "left") {
    game = new Game(2, 3, "dw", apt_hallway);
  } else {
    game = new Game(3, 3, "dw", apt_hallway);
  }
} else { // Studio or other
  game = new Game(21, 3, "dw", apt_hallway);
}