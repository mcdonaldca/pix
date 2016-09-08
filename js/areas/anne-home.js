var anneHome = new ResidentialArea(
  11, 8, 
  'anne-home', 
  ['anne'],
  'city-ne'
);

anneHome.addItem(2, 'table',  [5, 4]);
anneHome.addItem(2,   'bed',  [1, 2]);

anneHome.addExit(3, 7, DIR.DW, 'city-ne');
anneHome.addPositionData(3, 5, DIR.DW, 'default');

game.addArea(anneHome.getName(), anneHome);