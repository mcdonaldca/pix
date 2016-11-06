/** CITY (NORTH EAST) **/

var cityNE = new Area(32, 32, 'city-ne');

cityNE.addExit(0,  25, DIR.LF, 'city-nw', 'top');
cityNE.addExit(0,  26, DIR.LF, 'city-nw', 'middle');
cityNE.addExit(0,  27, DIR.LF, 'city-nw', 'bottom');
cityNE.addExit(6,  31, DIR.DW, 'city-se', 'left');
cityNE.addExit(7,  31, DIR.DW, 'city-se', 'center');
cityNE.addExit(8,  31, DIR.DW, 'city-se', 'right');
cityNE.addExit(10, 23, DIR.UP, 'anne-home');
cityNE.addPositionData(15, 15, DIR.DW, 'default');

game.addArea(cityNE.getName(), cityNE);








/** CITY (SOUTH EAST) **/

var citySE = new Area(32, 32, 'city-se');

citySE.addExit(6,  1, DIR.UP, 'city-ne', 'left');
citySE.addExit(7,  1, DIR.UP, 'city-ne', 'center');
citySE.addExit(8,  1, DIR.UP, 'city-ne', 'right');
citySE.addExit(10, 1, DIR.UP, 'elizabeth-alan');
citySE.addExit(0,  4, DIR.LF, 'city-sw', 'top-1');
citySE.addExit(0,  5, DIR.LF, 'city-sw', 'middle-1');
citySE.addExit(0,  6, DIR.LF, 'city-sw', 'bottom-1');
citySE.addExit(0, 14, DIR.LF, 'city-sw', 'top-2');
citySE.addExit(0, 15, DIR.LF, 'city-sw', 'middle-2');
citySE.addExit(0, 16, DIR.LF, 'city-sw', 'bottom-2');
citySE.addExit(0, 22, DIR.LF, 'city-sw', 'top-3');
citySE.addExit(0, 23, DIR.LF, 'city-sw', 'bottom-3');
citySE.addPositionData(15, 15, DIR.DW, 'default');

game.addArea(citySE.getName(), citySE);








/** CITY (SOUTH WEST) **/

var citySW = new Area(32, 32, 'city-sw');

citySW.addInteraction(15, 4, game.areas['library'].hoursMessage(), [DIR.UP]);

citySW.addExit(23,  1, DIR.UP, 'city-nw', 'left');
citySW.addExit(24,  1, DIR.UP, 'city-nw', 'center');
citySW.addExit(25,  1, DIR.UP, 'city-nw', 'right');
citySW.addExit(31,  4, DIR.RT, 'city-se', 'top-1');
citySW.addExit(31,  5, DIR.RT, 'city-se', 'middle-1');
citySW.addExit(31,  6, DIR.RT, 'city-se', 'bottom-1');
citySW.addExit(31, 14, DIR.RT, 'city-se', 'top-2');
citySW.addExit(31, 15, DIR.RT, 'city-se', 'middle-2');
citySW.addExit(31, 16, DIR.RT, 'city-se', 'bottom-2');
citySW.addExit(31, 22, DIR.RT, 'city-se', 'top-3');
citySW.addExit(31, 23, DIR.RT, 'city-se', 'bottom-3');
citySW.addExit(13,  5, DIR.UP, 'library');
citySW.addExit(29,  2, DIR.UP, 'le-chateau-lobby');
citySW.addPositionData(15, 15, DIR.DW, 'default');

game.addArea(citySW.getName(), citySW);








/** CITY (NORTH WEST) **/

var cityNW = new Area(32, 32, 'city-nw');

cityNW.addInteraction(26, 24, game.areas['ritual-roasters'].hoursMessage(), [DIR.UP]);

cityNW.addExit(23, 31, DIR.DW, 'city-sw', 'left');
cityNW.addExit(24, 31, DIR.DW, 'city-sw', 'center');
cityNW.addExit(25, 31, DIR.DW, 'city-sw', 'right');
cityNW.addExit(31, 25, DIR.RT, 'city-ne', 'top');
cityNW.addExit(31, 26, DIR.RT, 'city-ne', 'middle');
cityNW.addExit(31, 27, DIR.RT, 'city-ne', 'bottom');
cityNW.addExit(24, 24, DIR.UP, 'ritual-roasters');
cityNW.addPositionData(15, 15, DIR.DW, 'default');

game.addArea(cityNW.getName(), cityNW);