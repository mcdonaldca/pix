/**
  Creates and maps all player walkthroughs. Sets callbacks if necessary.
**/
Game.prototype.initializeWalkthroughs = function() {
  var collection = [
    { walkthrough: new AnneIntro(), callback: this.anneIntroCallback() },
    { walkthrough: new NoLibraryCard() },
    { walkthrough: new OpeningHewitt(), callback: this.openingHewittCallback() },
    { walkthrough: new OpeningRundownApt(), callback: this.openingRundownAptCallback() },
  ];

  for (var i = 0; i < collection.length; i++) {
    var walkthroughObj = collection[i].walkthrough;
    var walkthroughCallback = collection[i].callback;

    walkthroughObj.setCallback(walkthroughCallback);
    this.walkthroughs[walkthroughObj.name] = walkthroughObj;
  }
};