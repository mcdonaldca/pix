var studio = new Grid(10, 9, "studio");

studio.addBlocked(8, 5, ["dw"]); // Bed, from above
studio.addBlocked(9, 5, ["dw"]); // Bed, from above
studio.addBlocked(8, 6, ["up"]); // Bed, from below
studio.addBlocked(9, 6, ["up"]); // Bed, from below
studio.addBlocked(2, 4, ["dw"]); // Counter, from above
studio.addBlocked(3, 4, ["dw"]); // Counter, from above
studio.addBlocked(2, 5, ["up"]); // Counter, from below
studio.addBlocked(3, 5, ["up"]); // Counter, from below
studio.addBlocked(4, 5);         // Counter
studio.addBlocked(4, 6);         // Counter
studio.addBlocked(5, 2, ["dw"]); // Couch, from above
//studio.addBlocked(6, 2, ["dw"]); // Couch, from above
studio.addBlocked(5, 3, ["up"]); // Couch, from below
studio.addBlocked(6, 3, ["up"]); // Couch, from below
studio.addBlocked(4, 2);         // Couch
studio.addBlocked(7, 2);         // Couch
studio.addBlocked(6, 2);         // Liam :)
studio.addBlocked(5, 0);         // TV
studio.addBlocked(6, 0);         // TV
studio.addBlocked(9, 0);         // Houseplant

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

studio.addExit(1, 0, ["dw"], "apt-hallway.html");

if (window.sessionStorage.getItem("from") == "apt-hallway") {
  var game = new Game(1, 0, "up", studio);
} else {
  var game = new Game(7, 4, "dw", studio);
}