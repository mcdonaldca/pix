/** 
  Newspaper at beginning of game where player selects city.
**/
function Newspaper() {
  $.extend(this, new Screen("img/screens/newspaper.svg"));

  var selectorEl = document.createElement("div");
  $(selectorEl).addClass("selector")
               .css("background-image", "url(img/screens/newspaper-selector.svg)")
               .css("width", (52 * MULT).toString() + "px")
               .css("height", (31 * MULT).toString() + "px")
               .css("left", (71 * MULT).toString() + "px")
               .css("bottom", (84 * MULT).toString() + "px");
  this.selectorEl = $(selectorEl);
  this.elements.push(this.selectorEl);

  this.citySelected = "San Francisco"; // The currently selected city.
}

/**
  Event fired when left arrow key is pressed.
**/
Newspaper.prototype.arrowLeft = function() {
  // If we're in selection mode and the current city is Seattle.
  // Can only go specific directions from specific cities because
  // of the newspaper layout.
  if (this.status == "selection" && this.citySelected == "Seattle") {
    this.selectorEl.css("left", (71 * MULT).toString() + "px");
    this.citySelected = "San Francisco";
  }
}

/**
  Event fired when up arrow key is pressed.
**/
Newspaper.prototype.arrowUp = function() {
  // If in selection mode (and at correct city).
  if (this.status == "selection" && this.citySelected == "New York City") {
    this.selectorEl.css("bottom", (84 * MULT).toString() + "px");
    this.citySelected = "San Francisco";

  // If interacting with the prompt
  } else if (this.status == "prompt") {
    this.interactable.arrowUp();
  }
}

/**
  Event fired when right arrow key is pressed.
**/
Newspaper.prototype.arrowRight = function() {
  // If in selection mode (and at correct city).
  if (this.status == "selection" && this.citySelected == "San Francisco") {
    this.selectorEl.css("left", (121 * MULT).toString() + "px");
    this.citySelected = "Seattle";
  }
}

/**
  Event fired when down arrow key is pressed.
**/
Newspaper.prototype.arrowDown = function() {
  // If in selection mode (and at correct city).
  if (this.status == "selection" && this.citySelected == "San Francisco") {
    this.selectorEl.css("bottom", (55 * MULT).toString() + "px");
    this.citySelected = "New York City";

  // If interacting with the prompt
  } else if (this.status == "prompt") {
    this.interactable.arrowDown();
  }
}

/**
  Event fired when space bar is pressed. Param not used.
  @param dir Direction user is facing. Not used.
**/
Newspaper.prototype.interact = function(dir) {
  var gameStatus = "screen";
  var currentSelect = this.interactable.currentSelect;

  switch(this.count) {
    // A city has been selected
    case 0:
      this.status = "prompt";
      this.interactable.nextArrow.hide();
      this.interactable.displayMessage("Move to " + this.citySelected + " ?");
      this.interactable.messages.show();
      this.interactable.displayOptions(["Yes!", "Keep looking."]);
      this.interactable.options.show();
      break;

    // Indicated if interested in city.
    case 1:
      if (currentSelect == 0) {
        this.interactable.displayMessage("Are you sure?");
        this.interactable.displayOptions(["Definitely.", "Maybe not..."]);
      } else if (currentSelect == 1) {
        this.interactable.messages.hide();
        this.interactable.nextArrow.show();
        this.interactable.displayMessage("");
        this.interactable.options.hide();
        this.interactable.displayOptions([""]);
        this.status = "selection";
        this.count = -1;
      }
      break;

    // Officially accept/reject city.
    case 2:
      this.interactable.options.hide();
      this.interactable.displayOptions([""]);
      this.interactable.nextArrow.show();

      // No Seattle version currently.
      if (currentSelect == 0 && this.citySelected == "Seattle") {
        this.interactable.displayMessage("(Whoops, Seattle version coming eventually.)");
      // No New York City version currently.
      } else if (currentSelect == 0 && this.citySelected == "New York City") {
        this.interactable.displayMessage("(Whoops, New York City version coming eventually.)");

      // All other scenerios.
      } else {
        this.interactable.messages.hide();
        this.interactable.displayMessage("");
        this.count = -1;
        this.status = "selection";

        // Accepted city!
        if (currentSelect == 0) {
          gameStatus = "exit";
          this.exit = "studio";
          // Clean up after screen;
          this.selectorEl.remove();
          this.screenEl.css("background-image", "none");
        }
      }
      break;

    // Invalid city pop-ups.
    case 3:
      this.interactable.messages.hide();
      this.interactable.displayMessage("");
      this.count = -1;
      this.status = "selection";

    default:
      break;
  }

  this.interactable.currentSelect = 0;
  this.count += 1;
  return gameStatus;
}

// Add newspaper object to game's screen selection.
var newspaper = new Newspaper();
game.addScreen("newspaper", newspaper);