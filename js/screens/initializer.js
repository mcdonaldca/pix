/**
  Creates and maps all player screens. Sets callbacks if necessary.
**/
Game.prototype.initializeScreens = function() {
  var collection = [
    { screen: new CharacterSelect(), callback: this.characterSelectCallback() },
    { screen: new Email() },
    { screen: new Keyboard(), callback: this.keyboardCallback() },
    { screen: new Newspaper(), callback: this.newspaperCallback() },
  ];

  for (var i = 0; i < collection.length; i++) {
    var screenObj = collection[i].screen;
    var screenCallback = collection[i].callback;

    screenObj.setCallback(screenCallback);
    this.screens[screenObj.name] = screenObj;
  }
};