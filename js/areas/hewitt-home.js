function HewittHome() {
  var hewittHome = new Area(9, 7, 'hewitt-home');

  hewittHome.addItem(4, 'table', [2, 3]);
  hewittHome.addItem(1, 'newspaper', [4, 4]);
  hewittHome.getItem('newspaper').hide();

  hewittHome.addPositionData(5, 4, DIR.LF, 'default');

  return hewittHome;
}