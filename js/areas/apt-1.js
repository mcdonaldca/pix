function Apt1() {
  var apt1 = new Area(28, 18, 'apt-1');

  apt1.addEventZone([8,  7], [16, 5], new Mirror());
  apt1.addEventZone([21, 9], [25, 3], new Pool());

  apt1.addItem(3, 'doorframe', [8,  12], 20);
  apt1.addItem(9, 'wall',      [8,  11]);
  apt1.addItem(3, 'doorframe', [19, 12], 20);
  apt1.addItem(9, 'wall',      [19, 11]);

  apt1.addInteraction(10, 13, new Message('Gym'), [DIR.UP]);
  var treadmillMessage = new Message('You don\'t have time to run!')
  apt1.addInteraction(16, 10, treadmillMessage, [DIR.RT]);
  apt1.addInteraction(16,  9, treadmillMessage, [DIR.RT]);
  apt1.addInteraction(16,  8, treadmillMessage, [DIR.RT]);
  apt1.addInteraction(21, 13, new Message('Pool'), [DIR.UP]);

  apt1.addExit(2, 14, DIR.UP, 'elevator-apt-1', 'left');
  apt1.addExit(3, 14, DIR.UP, 'elevator-apt-1', 'right');
  apt1.addPositionData(3, 14, DIR.DW, 'default');

  return apt1;
}