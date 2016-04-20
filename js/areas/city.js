var city = new Area(64, 64, "city");

city.addExit(0, 63, ["dw"], "lobby");

city.addPositionData("lobby", 0, 63, "up");
city.addPositionData("default", null, 0, 63, "up");

game.addArea(city.getName(), city);