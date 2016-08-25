var liamMargaret = new ResedentialArea(
  28, 15, 
  "liam-margaret", 
  ["liam", "margaret"],
  "le-chateau-floor-1"
);

liamMargaret.addNPC(20, 4, "dw", game.getNPC("margaret"), ["up", "rt", "dw", "lf"]);

liamMargaret.addItem(1, "living-room-wall-short",    [ 1,  5]);
liamMargaret.addItem(6, "living-room-wall-long",     [ 2,  6]);
liamMargaret.addItem(1, "wall-meet",                 [ 7,  9]);
liamMargaret.addItem(6, "kitchen-wall",              [11,  8], 20);
liamMargaret.addItem(7, "margarets-room-wall-long",  [17,  7], 20);
liamMargaret.addItem(1, "wall-meet",                 [20, 10]);
liamMargaret.addItem(2, "margarets-room-wall-short", [23,  6]);

liamMargaret.addExit(12, 12, "dw", "le-chateau-floor-1");
liamMargaret.addPositionData(12, 12, "up", "default");

game.addArea(liamMargaret.getName(), liamMargaret);