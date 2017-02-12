function SimonMargaret() {
  var simonMargaret = new ResidentialArea(
    28, 15, 
    'simon-margaret', 
    ['simon', 'margaret'],
    'le-chateau-floor-1'
  );

  simonMargaret.addItem(1, 'living-room-wall-short',    [ 1,  5]);
  simonMargaret.addItem(6, 'living-room-wall-long',     [ 2,  6]);
  simonMargaret.addItem(1, 'wall-meet',                 [ 7,  9]);
  simonMargaret.addItem(6, 'kitchen-wall',              [11,  8], 20);
  simonMargaret.addItem(3, 'doorframe',                 [13,  9]);
  simonMargaret.addItem(7, 'margarets-room-wall-long',  [17,  7], 20);
  simonMargaret.addItem(3, 'doorframe',                 [17,  8]);
  simonMargaret.addItem(1, 'wall-meet',                 [20, 10]);
  simonMargaret.addItem(2, 'margarets-room-wall-short', [23,  6]);

  simonMargaret.addExit(12, 12, DIR.DW, 'le-chateau-floor-1');
  simonMargaret.addPositionData(12, 12, DIR.UP, 'default');

  return simonMargaret;
}