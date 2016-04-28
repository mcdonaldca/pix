/** CITY (NORTH EAST) **/

var cityNE = new Area(32, 32, "city-ne");

cityNE.addExit(0, 25, "lf", "city-nw", "top");
cityNE.addExit(0, 26, "lf", "city-nw", "middle");
cityNE.addExit(0, 27, "lf", "city-nw", "bottom");
cityNE.addExit(6, 31, "dw", "city-se", "left");
cityNE.addExit(7, 31, "dw", "city-se", "center");
cityNE.addExit(8, 31, "dw", "city-se", "right");
cityNE.addPositionData(15, 15, "dw", "default");

game.addArea(cityNE.getName(), cityNE);








/** CITY (SOUTH EAST) **/

var citySE = new Area(32, 32, "city-se");

citySE.addExit(6,  1, "up", "city-ne", "left");
citySE.addExit(7,  1, "up", "city-ne", "center");
citySE.addExit(8,  1, "up", "city-ne", "right");
citySE.addExit(0,  4, "lf", "city-sw", "top-1");
citySE.addExit(0,  5, "lf", "city-sw", "middle-1");
citySE.addExit(0,  6, "lf", "city-sw", "bottom-1");
citySE.addExit(0, 14, "lf", "city-sw", "top-2");
citySE.addExit(0, 15, "lf", "city-sw", "middle-2");
citySE.addExit(0, 16, "lf", "city-sw", "bottom-2");
citySE.addExit(0, 22, "lf", "city-sw", "top-3");
citySE.addExit(0, 23, "lf", "city-sw", "bottom-3");
citySE.addPositionData(15, 15, "dw", "default");

game.addArea(citySE.getName(), citySE);








/** CITY (SOUTH WEST) **/

var citySW = new Area(32, 32, "city-sw");

citySW.addInteraction(15, 4, game.areas["library"].hoursMessage(), ["up"]);

citySW.addExit(23,  1, "up", "city-nw", "left");
citySW.addExit(24,  1, "up", "city-nw", "center");
citySW.addExit(25,  1, "up", "city-nw", "right");
citySW.addExit(31,  4, "rt", "city-se", "top-1");
citySW.addExit(31,  5, "rt", "city-se", "middle-1");
citySW.addExit(31,  6, "rt", "city-se", "bottom-1");
citySW.addExit(31, 14, "rt", "city-se", "top-2");
citySW.addExit(31, 15, "rt", "city-se", "middle-2");
citySW.addExit(31, 16, "rt", "city-se", "bottom-2");
citySW.addExit(31, 22, "rt", "city-se", "top-3");
citySW.addExit(31, 23, "rt", "city-se", "bottom-3");
citySW.addExit(13,  5, "up", "library");
citySW.addExit(29,  2, "up", "le-chateau-lobby");
citySW.addPositionData(15, 15, "dw", "default");

game.addArea(citySW.getName(), citySW);








/** CITY (NORTH WEST) **/

var cityNW = new Area(32, 32, "city-nw");

cityNW.addInteraction(26, 24, game.areas["ritual-roasters"].hoursMessage(), ["up"]);

cityNW.addExit(23, 31, "dw", "city-sw", "left");
cityNW.addExit(24, 31, "dw", "city-sw", "center");
cityNW.addExit(25, 31, "dw", "city-sw", "right");
cityNW.addExit(31, 25, "rt", "city-ne", "top");
cityNW.addExit(31, 26, "rt", "city-ne", "middle");
cityNW.addExit(31, 27, "rt", "city-ne", "bottom");
cityNW.addExit(24, 24, "up", "ritual-roasters");
cityNW.addPositionData(15, 15, "dw", "default");

game.addArea(cityNW.getName(), cityNW);