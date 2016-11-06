var elizabethAlan = new ResidentialArea(
  22, 13, 
  'elizabeth-alan', 
  ['elizabeth', 'alan'],
  'city-se'
);

elizabethAlan.addItem(4, 'couch', [4,  2]);

elizabethAlan.addExit(13, 11, DIR.DW, 'city-se');
elizabethAlan.addPositionData(13, 11, DIR.UP, 'default');

game.addArea(elizabethAlan.getName(), elizabethAlan);