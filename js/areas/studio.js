var studio = new Grid(10, 9, "studio", true);

studio.addShowZone(8, 6, "bed");
studio.addShowZone(9, 6, "bed");
studio.addShowZone(2, 5, "counter");
studio.addShowZone(3, 5, "counter");
studio.addShowZone(4, 3, "couch");
studio.addShowZone(5, 3, "couch");
studio.addShowZone(6, 3, "couch");
studio.addShowZone(7, 3, "couch");
studio.addShowZone(5, 1, "tv");
studio.addShowZone(6, 1, "tv");
studio.addShowZone(9, 1, "houseplant");

studio.addInteraction(0, 7, new Fridge(), ["up"]);
studio.addInteraction(1, 7, new Fridge(), ["up"]);
studio.addInteraction(8, 6, new SleepZone());
studio.addInteraction(9, 6, new SleepZone());
studio.addInteraction(6, 2, new Liam(), ["rt", "up"]);
studio.addInteraction(9, 0, new Message("Hm... you should probably water your plant more."), ["rt", "dw"]);

studio.addExit(1, 0, ["dw"], "apt-2");

if (window.sessionStorage.getItem("from") == "apt-2") {
  var game = new Game(1, 0, "up", studio);
} else {
  var game = new Game(7, 4, "dw", studio);
}