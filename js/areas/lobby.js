var lobby = new Grid(10, 7, "lobby", true);

lobby.addExit(2, 4, ["up"], "elevator-lobby", "left");
lobby.addExit(3, 4, ["up"], "elevator-lobby", "right");

lobby.addShowZone(7, 4, "counter");

var holland = new Holland();
lobby.addInteraction(6, 4, holland, ["lf", "up"]);
lobby.addInteraction(5, 4, holland, ["rt"]);

if (window.sessionStorage.getItem("from") == "elevator") {
  if (window.sessionStorage.getItem("door") == "left") {
    game = new Game(2, 4, "dw", lobby);
  } else {
    game = new Game(3, 4, "dw", lobby);
  }
} else { // Outside or other
  game = new Game(5, 0, "up", lobby);
}