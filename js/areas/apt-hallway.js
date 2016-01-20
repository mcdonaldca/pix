var apt_hallway = new Grid(36, 6, "apt-hallway");

apt_hallway.addInteraction(9, 4, new Message("You don't know Colquitt that well..."), ["up"]);
apt_hallway.addInteraction(10, 4, new Message("Colquitt's Apartment"), ["up"]);
apt_hallway.addInteraction(15, 4, new Message("You don't know the people that live here that well..."), ["up"]);
apt_hallway.addInteraction(16, 4, new Message("Margaret & Natalie's Apartment"), ["up"]);
apt_hallway.addInteraction(22, 4, new Message("Adele & Liam's Apartment"), ["up"]);
apt_hallway.addInteraction(27, 4, new Message("You don't know the people that live here that well..."), ["up"]);
apt_hallway.addInteraction(28, 4, new Message("Anne & Dianne's Apartment"), ["up"]);
apt_hallway.addInteraction(33, 4, new Message("You don't know Simon that well..."), ["up"]);
apt_hallway.addInteraction(34, 4, new Message("Simon's Apartment"), ["up"]);

apt_hallway.addExit(21, 3, ["up"], "index.html");
apt_hallway.addExit(2, 3, ["up"], "elevator.html", "left");
apt_hallway.addExit(3, 3, ["up"], "elevator.html", "right");

var game = undefined;
if (window.sessionStorage.getItem("from") == "studio") {
  game = new Game(21, 3, "dw", apt_hallway);
} else if (window.sessionStorage.getItem("from") == "elevator") {
  if (window.sessionStorage.getItem("door") == "left") {
    game = new Game(2, 3, "dw", apt_hallway);
  } else {
    game = new Game(3, 3, "dw", apt_hallway);
  }
}