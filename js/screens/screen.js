/** 
  Screen with selection involved (character selection, inventory, newspaper, etc.).
**/
function Screen(background) {
  this.background = background; // Background for the screen.
  this.screenEl = $("#screen"); // Access to the screen element (change bg).
  this.status = "selection"; // Whether we're in selection mode or interacting w/ prompt.
  this.exit = undefined; // The location to exit to after selection.
  this.elements = []; // The elements used on the screen.
  this.count = 0; // Keeps track of our point in the conversation.

  // Prompt is passed to the screen upon display.
  this.prompt = undefined;
  // Callback is set upon screen initialization.
  this.callback = undefined;
}

/**
  Called to display the screen and it's selectors.
**/
Screen.prototype.display = function(prompt) {
  this.prompt = prompt;
  if (this.customDisplay) {
    this.customDisplay();
  }
  this.screenEl.css("background-image", "url(" + this.background + ")");
  for (var i = 0; i < this.elements.length; i++) {
    this.screenEl.append(this.elements[i]);
  }
}

/**
  Getter for Screen.exit.
**/
Screen.prototype.exitTo = function() {
  return this.exit;
}

/**
  Setter for Screen.callback.
**/
Screen.prototype.setCallback = function(callback) {
  this.callback = callback;
}

/**
  Cleans up after the screen is finished.
**/
Screen.prototype.endScreen = function() {
  this.screenEl.css("background-image", "none");
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].remove();
  }
}