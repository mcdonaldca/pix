var library = new LimitedArea(
  13, 16, 
  "library", 
  "San Francisco Library", 
  ["8:00AM - 9:00PM Weekdays, 9:00AM - 8:00PM Weekends", [[9, 20], [8, 21], [8, 21], [8, 21], [8, 21], [8, 21], [9, 20]]], 
  "city-sw"
  );

library.addEventZone([10, 12], [10, 12], new RequireCard());

var computer = new Computer();
library.addNPC(7, 14, "rt", game.getNPC("mary"), ["dw", "rt", "up"]);
library.addInteraction(5,  6, computer, "rt");
library.addInteraction(5,  8, computer, "rt");
library.addInteraction(7,  8, computer, "lf");
library.addInteraction(7,  9, computer, "lf");
library.addInteraction(8, 14, game.getNPC("mary"), "lf");

library.addItem(2, "bookshelf", [ 1,  5]);
library.addItem(2, "bookshelf", [ 1,  8]);
library.addItem(2, "bookshelf", [ 1, 11]);
library.addItem(3,    "desk-1", [ 5,  5]);
library.addItem(3,    "desk-2", [ 5,  7]);
library.addItem(1,    "desk-3", [ 5, 10]);
library.addItem(5,   "counter", [ 8, 12]);
library.addItem(2, "bookshelf", [10,  5]);
library.addItem(2, "bookshelf", [10,  8]);

library.addExit(10, 15, "dw", "city-sw");
library.addPositionData(10, 15, "up", "default");

game.addArea(library.getName(), library);