var liamMargaret = new ResidentialArea(
  28, 15, 
  'liam-margaret', 
  ['liam', 'margaret'],
  'le-chateau-floor-1'
);

liamMargaret.addItem(1, 'living-room-wall-short',    [ 1,  5]);
liamMargaret.addItem(6, 'living-room-wall-long',     [ 2,  6]);
liamMargaret.addItem(1, 'wall-meet',                 [ 7,  9]);
liamMargaret.addItem(6, 'kitchen-wall',              [11,  8], 20);
liamMargaret.addItem(7, 'margarets-room-wall-long',  [17,  7], 20);
liamMargaret.addItem(3, 'doorframe',                 [17,  8]);
liamMargaret.addItem(1, 'wall-meet',                 [20, 10]);
liamMargaret.addItem(2, 'margarets-room-wall-short', [23,  6]);

liamMargaret.addExit(12, 12, DIR.DW, 'le-chateau-floor-1');
liamMargaret.addPositionData(12, 12, DIR.UP, 'default');

game.addArea(liamMargaret.getName(), liamMargaret);