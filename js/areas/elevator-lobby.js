var elevator = new Grid(4, 4, "elevator");

elevator.addInteraction(0, 2, new Elevator(3), ["up"]);

// elevator.addExit(1, 0, ["dw"], "lobby", "left");
// elevator.addExit(2, 0, ["dw"], "lobby", "right");

var game = undefined;
if (window.sessionStorage.getItem("from") == "elevator") {
  game = new Game(0, 1, "up", elevator);
} else if (window.sessionStorage.getItem("door") == "left") {
  game = new Game(1, 0, "up", elevator);
} else {
  game = new Game(2, 0, "up", elevator);
}