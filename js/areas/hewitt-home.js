function HewittHome() {
  var hewittHome = new Area(7, 7, 'hewitt-home');

  hewittHome.addItem(4, 'table', [1, 3]);
  hewittHome.addItem(1, 'newspaper', [3, 4]);
  hewittHome.getItem('newspaper').hide();

  hewittHome.addPositionData(4, 4, DIR.LF, 'default');

  return hewittHome;
}