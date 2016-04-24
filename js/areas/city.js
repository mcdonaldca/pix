var cityNE = new Area(32, 32, "city-ne");

cityNE.addExit(0, 25, ["lf"], "city-nw", "top");
cityNE.addExit(0, 26, ["lf"], "city-nw", "middle");
cityNE.addExit(0, 27, ["lf"], "city-nw", "bottom");
cityNE.addExit(6, 31, ["dw"], "city-se", "left");
cityNE.addExit(7, 31, ["dw"], "city-se", "center");
cityNE.addExit(8, 31, ["dw"], "city-se", "right");

cityNE.addPositionData("city-nw", "top", 0, 25, "rt");
cityNE.addPositionData("city-nw", "middle", 0, 26, "rt");
cityNE.addPositionData("city-nw", "bottom", 0, 27, "rt");
cityNE.addPositionData("city-se", "left", 6, 31, "up");
cityNE.addPositionData("city-se", "center", 7, 31, "up");
cityNE.addPositionData("city-se", "right", 8, 31, "up");
cityNE.addPositionData("default", null, 15, 15, "dw");

game.addArea(cityNE.getName(), cityNE);

var citySE = new Area(32, 32, "city-se");

citySE.addExit(6, 1, ["up"], "city-ne", "left");
citySE.addExit(7, 1, ["up"], "city-ne", "center");
citySE.addExit(8, 1, ["up"], "city-ne", "right");
citySE.addExit(0, 4, ["lf"], "city-sw", "top-1");
citySE.addExit(0, 5, ["lf"], "city-sw", "middle-1");
citySE.addExit(0, 6, ["lf"], "city-sw", "bottom-1");
citySE.addExit(0, 14, ["lf"], "city-sw", "top-2");
citySE.addExit(0, 15, ["lf"], "city-sw", "middle-2");
citySE.addExit(0, 16, ["lf"], "city-sw", "bottom-2");
citySE.addExit(0, 22, ["lf"], "city-sw", "top-3");
citySE.addExit(0, 23, ["lf"], "city-sw", "bottom-3");

citySE.addPositionData("city-ne", "left", 6, 1, "dw");
citySE.addPositionData("city-ne", "center", 7, 1, "dw");
citySE.addPositionData("city-ne", "right", 8, 1, "dw");
citySE.addPositionData("city-sw", "top-1", 0, 4, "rt");
citySE.addPositionData("city-sw", "middle-1", 0, 5, "rt");
citySE.addPositionData("city-sw", "bottom-1", 0, 6, "rt");
citySE.addPositionData("city-sw", "top-2", 0, 14, "rt");
citySE.addPositionData("city-sw", "middle-2", 0, 15, "rt");
citySE.addPositionData("city-sw", "bottom-2", 0, 16, "rt");
citySE.addPositionData("city-sw", "top-3", 0, 22, "rt");
citySE.addPositionData("city-sw", "bottom-3", 0, 23, "rt");
citySE.addPositionData("default", null, 15, 15, "dw");

game.addArea(citySE.getName(), citySE);

var citySW = new Area(32, 32, "city-sw");

citySW.addInteraction(15, 4, game.areas["library"].hoursMessage(), ["up"]);

citySW.addExit(23, 1, ["up"], "city-nw", "left");
citySW.addExit(24, 1, ["up"], "city-nw", "center");
citySW.addExit(25, 1, ["up"], "city-nw", "right");
citySW.addExit(31, 4, ["rt"], "city-se", "top-1");
citySW.addExit(31, 5, ["rt"], "city-se", "middle-1");
citySW.addExit(31, 6, ["rt"], "city-se", "bottom-1");
citySW.addExit(31, 14, ["rt"], "city-se", "top-2");
citySW.addExit(31, 15, ["rt"], "city-se", "middle-2");
citySW.addExit(31, 16, ["rt"], "city-se", "bottom-2");
citySW.addExit(31, 22, ["rt"], "city-se", "top-3");
citySW.addExit(31, 23, ["rt"], "city-se", "bottom-3");
citySW.addExit(13, 5, ["up"], "library");
citySW.addExit(29, 2, ["up"], "lobby");

citySW.addPositionData("city-nw", "left", 23, 1, "dw");
citySW.addPositionData("city-nw", "center", 24, 1, "dw");
citySW.addPositionData("city-nw", "right", 25, 1, "dw");
citySW.addPositionData("city-se", "top-1", 31, 4, "lf");
citySW.addPositionData("city-se", "middle-1", 31, 5, "lf");
citySW.addPositionData("city-se", "bottom-1", 31, 6, "lf");
citySW.addPositionData("city-se", "top-2", 31, 14, "lf");
citySW.addPositionData("city-se", "middle-2", 31, 15, "lf");
citySW.addPositionData("city-se", "bottom-2", 31, 16, "lf");
citySW.addPositionData("city-se", "top-3", 31, 22, "lf");
citySW.addPositionData("city-se", "bottom-3", 31, 23, "lf");
citySW.addPositionData("library", null, 13, 5, "dw");
citySW.addPositionData("lobby", null, 29, 2, "dw");
citySW.addPositionData("default", null, 15, 15, "dw");

game.addArea(citySW.getName(), citySW);

var cityNW = new Area(32, 32, "city-nw");

cityNW.addInteraction(26, 24, game.areas["ritual-roasters"].hoursMessage(), ["up"]);

cityNW.addExit(23, 31, ["dw"], "city-sw", "left");
cityNW.addExit(24, 31, ["dw"], "city-sw", "center");
cityNW.addExit(25, 31, ["dw"], "city-sw", "right");
cityNW.addExit(31, 25, ["rt"], "city-ne", "top");
cityNW.addExit(31, 26, ["rt"], "city-ne", "middle");
cityNW.addExit(31, 27, ["rt"], "city-ne", "bottom");
cityNW.addExit(24, 24, ["up"], "ritual-roasters");

cityNW.addPositionData("city-sw", "left", 23, 31, "up");
cityNW.addPositionData("city-sw", "center", 24, 31, "up");
cityNW.addPositionData("city-sw", "right", 25, 31, "up");
cityNW.addPositionData("city-ne", "top", 31, 25, "lf");
cityNW.addPositionData("city-ne", "middle", 31, 26, "lf");
cityNW.addPositionData("city-ne", "bottom", 31, 27, "lf");
cityNW.addPositionData("ritual-roasters", null, 24, 24, "dw");
cityNW.addPositionData("default", null, 15, 15, "dw");

game.addArea(cityNW.getName(), cityNW);