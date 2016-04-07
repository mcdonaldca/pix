/**
  This is the base object for all objects the player can interact with.
**/
function Interactable() {
  this.count = 0; // State management for conversation flow.

  this.messages = $(".messages"); // Messages container (show/hide).
  this.nextArrow = $(".next-arrow"); // Blinking arrow (show/hide).
  this.messageContent = $(".messages .content"); // Messages content (adjust innerHTML).

  this.options = $(".options"); // Options container (show/hide).
  this.selectArrow = $(".select-arrow"); // Select arrow (show/hide).
  this.optionsContent = $(".options .content"); // Options content (adjust innerHTML).

  this.currentSelect = 0; // Which option is currently selected.
  this.originalSelect = undefined; // Will highlight an option in red if used.
  this.selectOptions = []; // Options from which the player can select.
}

/**
  Used to display a message on the screen.
  @param message The message to display.
**/
Interactable.prototype.displayMessage = function(message) {
  this.messageContent.html(message);
}

/**
  Generates and displays the HTML for any conversation options.
  @param options The list of options to display.
  @param mark    Boolean, whether or not mark the original option in red.
**/
Interactable.prototype.displayOptions = function(options, mark) {
  this.selectOptions = options;

  // Builds the list's HTML.
  var optionsHtml = "";
  for (var i = 0; i < options.length; i ++) {
    mark = mark || false;
    if (mark && i == this.originalSelect) {
      optionsHtml += "<div class='current-selection'>";
    } else {
      optionsHtml += "<div>";
    }
    optionsHtml += options[i] + "</div>";
  }
  this.setSelectArrow();
  this.optionsContent.html(optionsHtml);
}

/**
  Moves the player's selection arrow and updates Interactable.currentSelect.
**/
Interactable.prototype.arrowUp = function() {
  if (this.currentSelect > 0) {
    this.currentSelect -= 1;
    this.setSelectArrow();
  }
}

/**
  Moves the player's selection arrow and updates Interactable.currentSelect.
**/
Interactable.prototype.arrowDown = function() {
  if (this.currentSelect < this.selectOptions.length - 1) {
    this.currentSelect += 1;
    this.setSelectArrow();
  }
}

/**
  Sets the location of the player's selection arrow.
**/
Interactable.prototype.setSelectArrow = function() {
  this.selectArrow.css("top", (4 + 10 * this.currentSelect) * MULT);
}