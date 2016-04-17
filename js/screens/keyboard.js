/** 
  Keyboard screen where player enters name.
  Will likely be later abstracted for a generic keyboard screen.
**/
function Keyboard() {
  $.extend(this, new Screen("img/screens/keyboard/background.svg"));

  // The various selectors used by this screen.
  this.selectorData = {
    letter: { img: "url(img/screens/keyboard/selector-letter.svg)", width: 17, height: 17 },
    delete: { img: "url(img/screens/keyboard/selector-delete.svg)", width: 58, height: 20 },
    flip:   { img: "url(img/screens/keyboard/selector-flip.svg)", width: 27, height: 27 },
    done:   { img: "url(img/screens/keyboard/selector-done.svg)", width: 46, height: 20 }
  };

  // Set up the selector element.
  var selectorEl = document.createElement("div");
  $(selectorEl).addClass("selector")
               .css("background-image", this.selectorData.letter.img)
               .css("width", (this.selectorData.letter.height * MULT).toString() + "px")
               .css("height", (this.selectorData.letter.width * MULT).toString() + "px")
               .css("left", (22 * MULT).toString() + "px")
               .css("bottom", (80 * MULT).toString() + "px");
  this.selectorEl = $(selectorEl);
  this.elements.push(this.selectorEl);

  // This is the div that will display the entered text.
  var textFieldEl = document.createElement("div");
  $(textFieldEl).addClass("text-entry");
  this.textFieldEl = $(textFieldEl);
  this.elements.push(this.textFieldEl);

  // Values for tracking current selection.
  this.entry = "";
  this.row = 0;
  this.col = 0;
  this.values = [
    ["a", "b", "c", "d", "e", "f", "g", "h", "i"],
    ["j", "k", "l", "m", "n", "o", "p", "q", "r"],
    ["s", "t", "u", "v", "w", "x", "y", "z", " "],
    ["delete", "flip", "done"]
  ];

  // Values for CSS bottom property, by row.
  this.bottomValues = {
    0: 80,
    1: 64,
    2: 48,
    3: 5
  }

  this.mode = "caps";         // Current letter mode (caps or low)
  this.firstInteract = false; // If they've selected a letter yet.
}

/**
  Event fired when left arrow key is pressed.
**/
Keyboard.prototype.arrowLeft = function() {
  // If we're in selection mode and our current selection is greater than zero.
  if (this.status == "selection" && this.col > 0) {
    this.col -= 1;

    // If we're on the last row, we're using custom selectors for each item.
    if (this.row == 3) {
      if (this.col == 0) {
        this.selectorEl.css("left", (6 * MULT).toString() + "px")
                       .css("background-image", this.selectorData.delete.img)
                       .css("width", this.selectorData.delete.width * MULT)
                       .css("height", this.selectorData.delete.height * MULT);
     } else if (this.col == 1) {
        this.selectorEl.css("left", (80 * MULT).toString() + "px")
                       .css("background-image", this.selectorData.flip.img)
                       .css("width", this.selectorData.flip.width * MULT)
                       .css("height", this.selectorData.flip.height * MULT);
     }
    } else {
      var leftVal = 22 + (this.col * 15);
      this.selectorEl.css("left", (leftVal * MULT).toString() + "px");
    }
  }
}

/**
  Event fired when right arrow key is pressed.
**/
Keyboard.prototype.arrowRight = function() {
  // If we're in selection mode and our current selection is greater than zero.
  if (this.status == "selection" && this.col < this.values[this.row].length - 1) {
    this.col += 1;

    if (this.row == 3) {
      if (this.col == 1) {
        this.selectorEl.css("left", (80 * MULT).toString() + "px")
                       .css("background-image", this.selectorData.flip.img)
                       .css("width", this.selectorData.flip.width * MULT)
                       .css("height", this.selectorData.flip.height * MULT);
     } else if (this.col == 2) {
        this.selectorEl.css("left", (124 * MULT).toString() + "px")
                       .css("background-image", this.selectorData.done.img)
                       .css("width", this.selectorData.done.width * MULT)
                       .css("height", this.selectorData.done.height * MULT);
     }
    } else {
      var leftVal = 22 + (this.col * 15);

      // Apple new style.
      this.selectorEl.css("left", (leftVal * MULT).toString() + "px");
    }
  }
}

/**
  Event fired when up arrow key is pressed.
**/
Keyboard.prototype.arrowUp = function() {
  // If in selection mode and we're not at the top row.
  if (this.status == "selection" && this.row > 0) {
    this.row -= 1;

    // If we're going from the bottom row to the letters.
    if (this.row == 2) {
      var leftVal = 22 + (this.col * 15);
      this.selectorEl.css("left", (leftVal * MULT).toString() + "px")
                     .css("background-image", this.selectorData.letter.img)
                     .css("width", this.selectorData.letter.width * MULT)
                     .css("height", this.selectorData.letter.height * MULT);
    }
  
    this.selectorEl.css("bottom", (this.bottomValues[this.row] * MULT).toString() + "px");
  } else if (this.status == "prompt") {
    this.prompt.arrowUp();
  }
}

/**
  Event fired when down arrow key is pressed.
**/
Keyboard.prototype.arrowDown = function() {
  // If in selection mode and we're not at the last row.
  if (this.status == "selection" && this.row < this.values.length - 1) {
      this.row += 1;
    // If we're going to the last row.
    if (this.row == 3) {
      if (this.col < 3) {
        this.col = 0;
        this.selectorEl.css("left", (6 * MULT).toString() + "px")
                       .css("background-image", this.selectorData.delete.img)
                       .css("width", this.selectorData.delete.width * MULT)
                       .css("height", this.selectorData.delete.height * MULT);
      } else if (this.col < 6) {
        this.col = 1;
        this.selectorEl.css("left", (80 * MULT).toString() + "px")
                       .css("background-image", this.selectorData.flip.img)
                       .css("width", this.selectorData.flip.width * MULT)
                       .css("height", this.selectorData.flip.height * MULT);
      } else {
        this.col = 2;
        this.selectorEl.css("left", (124 * MULT).toString() + "px")
                       .css("background-image", this.selectorData.done.img)
                       .css("width", this.selectorData.done.width * MULT)
                       .css("height", this.selectorData.done.height * MULT);
      }
    }
    this.selectorEl.css("bottom", (this.bottomValues[this.row] * MULT).toString() + "px");
  } else if (this.status == "prompt") {
    this.prompt.arrowDown();
  }
}

/**
  Event fired when space bar is pressed. Param not used.
  @param dir Direction user is facing. Not used.
**/
Keyboard.prototype.interact = function(dir) {
  // Done has been selected!
  if (this.count == 1) {
    this.count = 0;

    // They've entered a valid name.
    if (this.entry.length > 0) {
      this.prompt.removeOptions();

      // Confirmed their name.
      if (this.prompt.selected() == 0) {
        this.endScreen();
        this.callback(this.entry);
        this.status = "selection";

      // Not done editing.
      } else {
        this.status = "selection";
      }

    // Haven't entered a name yet.
    } else {
      this.prompt.removeMessage();
      this.status = "selection";
    }
    return "screen";
  }

  // Current selected value!
  var value = this.values[this.row][this.col];

  switch(this.row) {
    // Letter rows.
    case 0:
    case 1:
    case 2:
      this.addLetter(
        this.mode == "caps" ?
          value.toUpperCase() :
          value
        );

      if (this.firstInteract == false) {
        this.flipMode();
      }
      this.firstInteract = true;
      break;

    // Delete/flip/done row.
    case 3:
      // Selected delete.
      if (this.col == 0) {
        this.removeLetter();

      // Selected flip.
      } else if (this.col == 1) {
        this.flipMode();

      // Selected done.
      } else {
        if (this.entry.length > 0) {
          this.prompt.displayOptions(
            "So your name is " + this.entry + "?",
            ["Yup.", "Nope."]
            );
        } else {
          this.prompt.displayMessage("You need to enter your name.");
        }
        this.count += 1;
        this.status = "prompt";
      }
      break;

    default:
      break;
  }
  // Stay on screen.
  return "screen";
}

/**
  Adds a letter to the current text string.
  @param letter The letter to add.
**/
Keyboard.prototype.addLetter = function(letter) {
  if (this.entry.length < 15) {
    this.entry += letter;
    this.textFieldEl.html(this.entry); 
  }
}

/**
  Removes a letter from the current text string.
**/
Keyboard.prototype.removeLetter = function() {
  if (this.entry.length > 0) {
    this.entry = this.entry.slice(0, -1);
    this.textFieldEl.html(this.entry); 

    // If we've removed the last letter, switch to caps mode.
    if (this.entry.length == 0) {
      this.firstInteract = false;
      this.mode = "caps";
      this.screenEl.css("background-position", "0 0");
    }
  }
}

/**
  Flips the keyboard mode.
**/
Keyboard.prototype.flipMode = function() {
  if (this.mode == "caps") {
    this.mode = "low";
    this.screenEl.css("background-position", "0 -" + (176 * MULT).toString() + "px");
  } else {
    this.mode = "caps";
    this.screenEl.css("background-position", "0 0");
  }
}

// Add Keyboard object to game's screen selection.
var keyboard = new Keyboard();
keyboard.setCallback(game.keyboardCallback(game));
game.addScreen("keyboard", keyboard);