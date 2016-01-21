var apt2 = new Grid(36, 6, "apt-2");

apt2.addInteraction(10, 4, new Message("Colquitt's Apartment"), ["up"]);
apt2.addInteraction(16, 4, new Message("Margaret & Natalie's Apartment"), ["up"]);
apt2.addInteraction(22, 4, new Message("Adele & Liam's Apartment"), ["up"]);
apt2.addInteraction(28, 4, new Message("Anne & Diane's Apartment"), ["up"]);
apt2.addInteraction(34, 4, new Message("Simon's Apartment"), ["up"]);

apt2.addExit( 2, 3, ["up"], "elevator-apt-2", "left");
apt2.addExit( 3, 3, ["up"], "elevator-apt-2", "right");
apt2.addExit( 9, 3, ["up"], "colquitt");
apt2.addExit(15, 3, ["up"], "margaret-natalie");
apt2.addExit(21, 3, ["up"], "studio");
apt2.addExit(27, 3, ["up"], "anne-diane");
apt2.addExit(33, 3, ["up"], "simon");

var game = undefined;
if (window.sessionStorage.getItem("from") == "elevator") {
  if (window.sessionStorage.getItem("door") == "left") {
    game = new Game(2, 3, "dw", apt2);
  } else {
    game = new Game(3, 3, "dw", apt2);
  }
} else { // Studio or other
  game = new Game(21, 3, "dw", apt2);
}