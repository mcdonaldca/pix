function NPC(name) {
  this.MULT = 4;
  this.name = name;
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

NPC.prototype.displayMessage = function(message) {
  if (this.name != "") {
    message = this.name.toUpperCase() + ": " + message;
  }
  this.messageContent.html(message);
}

NPC.prototype.displayOptions = function(options, mark) {
  mark = mark || false;
  this.selectOptions = options;
  var optionsHtml = "";
  for (var i = 0; i < options.length; i ++) {
    if (mark && i == this.currentSelect) {
      optionsHtml += "<div class='current-selection'>";
    } else {
      optionsHtml += "<div>";
    }
    optionsHtml += options[i] + "</div>";
  }
  this.setSelectArrow();
  this.optionsContent.html(optionsHtml);
}

NPC.prototype.arrowUp = function() {
  if (this.currentSelect > 0) {
    this.currentSelect -= 1;
    this.setSelectArrow();
  }
}

NPC.prototype.arrowDown = function() {
  if (this.currentSelect < this.selectOptions.length - 1) {
    this.currentSelect += 1;
    this.setSelectArrow();
  }
}

NPC.prototype.setSelectArrow = function() {
  this.selectArrow.css("top", (4 + 10 * this.currentSelect) * this.MULT);
}