function Interactable() {
  this.count = 0;

  this.messages = $(".messages");
  this.nextArrow = $(".next-arrow");
  this.messageContent = $(".messages .content");

  this.options = $(".options");
  this.selectArrow = $(".select-arrow");
  this.optionsContent = $(".options .content");

  this.currentSelect = 0;
  this.selectOptions = [];
}

Interactable.prototype.displayMessage = function(message) {
  this.messageContent.html(message);
}

Interactable.prototype.displayOptions = function(options, mark) {
  mark = mark || false;
  this.selectOptions = options;
  var optionsHtml = "";
  for (var i = 0; i < options.length; i ++) {
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

Interactable.prototype.arrowUp = function() {
  if (this.currentSelect > 0) {
    this.currentSelect -= 1;
    this.setSelectArrow();
  }
}

Interactable.prototype.arrowDown = function() {
  if (this.currentSelect < this.selectOptions.length - 1) {
    this.currentSelect += 1;
    this.setSelectArrow();
  }
}

Interactable.prototype.setSelectArrow = function() {
  this.selectArrow.css("top", (4 + 10 * this.currentSelect) * MULT);
}