/** LOBBY **/

var leChateauLobby = new Area(10, 7, 'le-chateau-lobby');

leChateauLobby.addInteraction(5, 2, game.getNPC('holland'), [DIR.RT]);

leChateauLobby.addItem(2, 'counter', [6, 2]);

leChateauLobby.addExit(2, 2, DIR.UP, 'le-chateau-elevator-lobby', 'left');
leChateauLobby.addExit(3, 2, DIR.UP, 'le-chateau-elevator-lobby', 'right');
leChateauLobby.addExit(2, 6, DIR.DW, 'city-sw');
leChateauLobby.addPositionData(5, 6, DIR.UP, 'default');

game.addArea(leChateauLobby.getName(), leChateauLobby);









/** FLOOR ONE **/

var leChateauFloor1 = new Area(26, 7, 'le-chateau-floor-1');

leChateauFloor1.addInteraction(11, 2, new Message('Unoccupied'), [DIR.UP]);
leChateauFloor1.addInteraction(17, 2, new Message('Margaret & Liam\'s Apartment'), [DIR.UP]);
leChateauFloor1.addInteraction(23, 2, new Message(game.name + '\'s Apartment'), [DIR.UP]);

leChateauFloor1.addExit( 3, 3, DIR.UP, 'le-chateau-elevator-floor-1', 'left');
leChateauFloor1.addExit( 4, 3, DIR.UP, 'le-chateau-elevator-floor-1', 'right');
leChateauFloor1.addExit(10, 3, DIR.UP, 'upgrade-apt');
leChateauFloor1.addExit(16, 3, DIR.UP, 'liam-margaret');
leChateauFloor1.addExit(22, 3, DIR.UP, 'rundown-apt');
leChateauFloor1.addPositionData(22, 3, DIR.DW, 'default');

game.addArea(leChateauFloor1.getName(), leChateauFloor1);









/** ELEVATOR (LOBBY) **/

var leChateauElevatorLobby = new Area(4, 4, 'le-chateau-elevator-lobby', 'elevator');

leChateauElevatorLobby.addInteraction(0, 1, new Elevator(1), [DIR.UP]);

leChateauElevatorLobby.addExit(1, 3, DIR.DW, 'le-chateau-lobby', 'left');
leChateauElevatorLobby.addExit(2, 3, DIR.DW, 'le-chateau-lobby', 'right');
leChateauElevatorLobby.addPositionData(0, 2, DIR.UP, 'default');

game.addArea(leChateauElevatorLobby.getName(), leChateauElevatorLobby);









/** ELEVATOR (FLOOR ONE) **/

var leChateauElevatorFloor1 = new Area(4, 4, 'le-chateau-elevator-floor-1', 'elevator');

leChateauElevatorFloor1.addInteraction(0, 1, new Elevator(0), [DIR.UP]);

leChateauElevatorFloor1.addExit(1, 3, DIR.DW, 'le-chateau-floor-1', 'left');
leChateauElevatorFloor1.addExit(2, 3, DIR.DW, 'le-chateau-floor-1', 'right');
leChateauElevatorFloor1.addPositionData(0, 2, DIR.UP, 'default');

game.addArea(leChateauElevatorFloor1.getName(), leChateauElevatorFloor1);