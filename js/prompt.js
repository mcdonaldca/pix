/**
  This is the object that controls the on-screen prompter.
**/
function Prompt() {
  this.count = 0; // State management for conversation flow.

  this.messages = $(".messages");                // Messages container (show/hide).
  this.nextArrow = $(".next-arrow");             // Blinking arrow (show/hide).
  this.messageContent = $(".messages .content"); // Messages content (adjust innerHTML).

  this.options = $(".options");                 // Options container (show/hide).
  this.selectArrow = $(".select-arrow");        // Select arrow (show/hide).
  this.optionsContent = $(".options .content"); // Options content (adjust innerHTML).

  this.currentSelect = 0;          // Which option is currently selected.
  this.originalSelect = undefined; // Will highlight an option in red if used.
  this.selectOptions = [];         // Options from which the player can select.
}

/**
  Used to display a message on the screen.
  @param message The message to display.
  @param name    (Optional) The name to prefix.
**/
Prompt.prototype.displayMessage = function(message, name) {
  name = name || "";

  this.nextArrow.show();
  // If it's something with a name, prefix it.
  if (name != "") {
    message = name.toUpperCase() + ": " + message;
  }
  this.messageContent.html(message);
  this.messages.show();
}

/**
  Updates the currently visible message.
  @param message The message to display.
  @param name    (Optional) The name to prefix.
**/
Prompt.prototype.updateMessage = function(message, name) {
  name = name || "";

  // If it's something with a name, prefix it.
  if (name != "") {
    message = name.toUpperCase() + ": " + message;
  }
  this.messageContent.html(message);
}

/**
  Remove currently visible message.
**/
Prompt.prototype.removeMessage = function() {
  this.messages.hide();
  this.messageContent.html("");
  this.nextArrow.show();
}

/**
  Generates and displays the HTML for any conversation options.
  @param message The message (related to option selection).
  @param options The list of options to display.
  @param name    (Optional) The name to prefix on message.
  @param start   (Optional) Default selection to start with.
  @param mark    (Optional) Boolean, whether or not mark the original option in red.
**/
Prompt.prototype.displayOptions = function(message, options, name, start, mark) {
  this.selectOptions = options;

  // Display the message.
  if (message != "") {
    name = name || "";
    this.displayMessage(message, name);
    this.nextArrow.hide();
  }

  // Builds the list's HTML.
  start = start || 0;
  mark = mark || false;
  var optionsHtml = this.generateOptionsHTML(options, start, mark);
  this.optionsContent.html(optionsHtml);

  this.currentSelect = start || 0;
  this.setSelectArrow();
  this.options.show();
}

/**
  Called to update the options being displayed.
  @param message The new message to be displayed.
  @param options The new options to be displayed.
  @param start   (Optional) Default selection to start with.
  @param mark    (Optional) Boolean, whether or not mark an option in red.
  @param name    (Optional) The name to prefix on message.
**/
Prompt.prototype.updateOptions = function(message, options, start, mark, name) {
  this.selectOptions = options;

  name = name || "";
  this.updateMessage(message, name);

  this.currentSelect = start || 0;
  this.setSelectArrow();

  // Builds the list's HTML.
  start = start || 0;
  mark = mark || false;
  var optionsHtml = this.generateOptionsHTML(options, start, mark);
  this.optionsContent.html(optionsHtml);
}

/**
  Remove and clean up after currently displayed options.
**/
Prompt.prototype.removeOptions = function() {
  this.options.hide();
  this.currentSelect = 0;
  this.optionsContent.html("");

  this.messages.hide();
  this.nextArrow.show();
  this.messageContent.html("");
}

/**
  Generates the HTML for the options to display.
  @param options The list of options.
  @param start   (Optional) Default selection to start with.
  @param mark    (Optional) Boolean, whether or not mark an option in red.
  @return The genrated HTML string.
**/
Prompt.prototype.generateOptionsHTML = function(options, start, mark) {
  var html = "";
  for (var i = 0; i < options.length; i ++) {
    if (mark && i == start) {
      html += "<div class='current-selection'>";
    } else {
      html += "<div>";
    }
    html += options[i] + "</div>";
  }
  return html;
}

/**
  Moves the player's selection arrow and updates Interactable.currentSelect.
**/
Prompt.prototype.arrowUp = function() {
  if (this.currentSelect > 0) {
    this.currentSelect -= 1;
    this.setSelectArrow();
  }
}

/**
  Moves the player's selection arrow and updates Interactable.currentSelect.
**/
Prompt.prototype.arrowDown = function() {
  if (this.currentSelect < this.selectOptions.length - 1) {
    this.currentSelect += 1;
    this.setSelectArrow();
  }
}

/**
  Sets the location of the player's selection arrow.
**/
Prompt.prototype.setSelectArrow = function() {
  this.selectArrow.css("top", (4 + 10 * this.currentSelect) * MULT);
}

/**
  Getter from prompt.currentSelect.
  @return Current selection value.
**/
Prompt.prototype.selected = function() {
  return this.currentSelect;
}