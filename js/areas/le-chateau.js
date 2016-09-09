/** LOBBY **/

var leChateauLobby = new Area(12, 8, 'le-chateau-lobby');

leChateauLobby.addInteraction(6, 3, game.getNPC('holland'), [DIR.RT]);

leChateauLobby.addItem(2, 'counter', [7, 3]);

leChateauLobby.addExit(3, 3, DIR.UP, 'le-chateau-elevator-lobby', 'left');
leChateauLobby.addExit(4, 3, DIR.UP, 'le-chateau-elevator-lobby', 'right');
leChateauLobby.addExit(3, 7, DIR.DW, 'city-sw');
leChateauLobby.addPositionData(6, 7, DIR.UP, 'default');

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

var leChateauElevatorLobby = new Area(6, 5, 'le-chateau-elevator-lobby', 'le-chateau-elevator');

leChateauElevatorLobby.addInteraction(1, 2, new Elevator(1), [DIR.UP]);

leChateauElevatorLobby.addExit(2, 4, DIR.DW, 'le-chateau-lobby', 'left');
leChateauElevatorLobby.addExit(3, 4, DIR.DW, 'le-chateau-lobby', 'right');
leChateauElevatorLobby.addPositionData(1, 3, DIR.UP, 'default');

game.addArea(leChateauElevatorLobby.getName(), leChateauElevatorLobby);









/** ELEVATOR (FLOOR ONE) **/

var leChateauElevatorFloor1 = new Area(6, 5, 'le-chateau-elevator-floor-1', 'le-chateau-elevator');

leChateauElevatorFloor1.addInteraction(1, 2, new Elevator(0), [DIR.UP]);

leChateauElevatorFloor1.addExit(2, 4, DIR.DW, 'le-chateau-floor-1', 'left');
leChateauElevatorFloor1.addExit(3, 4, DIR.DW, 'le-chateau-floor-1', 'right');
leChateauElevatorFloor1.addPositionData(1, 3, DIR.UP, 'default');

game.addArea(leChateauElevatorFloor1.getName(), leChateauElevatorFloor1);