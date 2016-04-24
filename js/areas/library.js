var library = new LimitedArea(
  13, 16, 
  "library", 
  "San Francisco Library", 
  ["8:00AM - 9:00PM Weekdays, 9:00AM - 8:00PM Weekends", [[9, 20], [8, 21], [8, 21], [8, 21], [8, 21], [8, 21], [9, 20]]], 
  "city-sw"
  );

library.addItem(2, "bookshelf", [ 1,  5]);
library.addItem(2, "bookshelf", [ 1,  8]);
library.addItem(2, "bookshelf", [ 1, 11]);
library.addItem(3,    "desk-1", [ 5,  5]);
library.addItem(3,    "desk-2", [ 5,  7]);
library.addItem(1,    "desk-3", [ 5, 10]);
library.addItem(5,   "counter", [ 8, 12]);
library.addItem(2, "bookshelf", [10,  5]);
library.addItem(2, "bookshelf", [10,  8]);

library.addExit(10, 15, ["dw"], "city-sw");

library.addPositionData("city-sw", null, 10, 15, "up");
library.addPositionData("default", null, 3, 8, "up");

game.addArea(library.getName(), library);