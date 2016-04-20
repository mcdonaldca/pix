var city = new Area(64, 64, "city");

city.addExit(0, 0, ["dw"], "lobby");

city.addPositionData("lobby", 2, 4, "dw");
city.addPositionData("default", null, 5, 0, "up");

game.addArea(city.getName(), city);