/** LOBBY **/

function LeChateauLobby(objs) {
  var leChateauLobby = new Area(12, 7, 'le-chateau-lobby');

  leChateauLobby.addInteraction(6, 2, objs.holland, [DIR.RT]);

  leChateauLobby.addItem(2, 'counter', [7, 2]);

  leChateauLobby.addExit(3, 2, DIR.UP, 'le-chateau-elevator-lobby', 'left');
  leChateauLobby.addExit(4, 2, DIR.UP, 'le-chateau-elevator-lobby', 'right');
  leChateauLobby.addExit(3, 6, DIR.DW, 'city-sw');
  leChateauLobby.addPositionData(6, 6, DIR.UP, 'default');

  return leChateauLobby;
}









/** FLOOR ONE **/

function LeChateauFloor1(objs) {
  var leChateauFloor1 = new Area(26, 6, 'le-chateau-floor-1');

  leChateauFloor1.addInteraction(11, 1, new Message('Unoccupied'), [DIR.UP]);
  leChateauFloor1.addInteraction(17, 1, new Message('Simon & Margaret\'s Apartment'), [DIR.UP]);
  leChateauFloor1.addInteraction(23, 1, new Message(objs.displayName + '\'s Apartment'), [DIR.UP]);

  leChateauFloor1.addExit( 3, 2, DIR.UP, 'le-chateau-elevator-floor-1', 'left');
  leChateauFloor1.addExit( 4, 2, DIR.UP, 'le-chateau-elevator-floor-1', 'right');
  leChateauFloor1.addExit(10, 2, DIR.UP, 'upgrade-apt');
  leChateauFloor1.addExit(16, 2, DIR.UP, 'simon-margaret');
  leChateauFloor1.addExit(22, 2, DIR.UP, 'rundown-apt');
  leChateauFloor1.addPositionData(22, 2, DIR.DW, 'default');

  return leChateauFloor1;
}









/** ELEVATOR (LOBBY) **/

function LeChateauElevatorLobby() {
  var leChateauElevatorLobby = new Area(6, 4, 'le-chateau-elevator-lobby', 'le-chateau-elevator');

  leChateauElevatorLobby.addInteraction(1, 1, new Elevator(1), [DIR.UP]);

  leChateauElevatorLobby.addExit(2, 3, DIR.DW, 'le-chateau-lobby', 'left');
  leChateauElevatorLobby.addExit(3, 3, DIR.DW, 'le-chateau-lobby', 'right');
  leChateauElevatorLobby.addPositionData(1, 2, DIR.UP, 'default');

  return leChateauElevatorLobby;
}









/** ELEVATOR (FLOOR ONE) **/

function LeChateauElevatorFloor1() {
  var leChateauElevatorFloor1 = new Area(6, 4, 'le-chateau-elevator-floor-1', 'le-chateau-elevator');

  leChateauElevatorFloor1.addInteraction(1, 1, new Elevator(0), [DIR.UP]);

  leChateauElevatorFloor1.addExit(2, 3, DIR.DW, 'le-chateau-floor-1', 'left');
  leChateauElevatorFloor1.addExit(3, 3, DIR.DW, 'le-chateau-floor-1', 'right');
  leChateauElevatorFloor1.addPositionData(1, 2, DIR.UP, 'default');

  return leChateauElevatorFloor1;
}