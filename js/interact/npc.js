function NPC(name) {
  this.MULT = 2;
  this.name = name;
  this.count = 0;

  this.messages = $("#messages");
  this.nextArrow = $("#next");
  this.messageContent = $("#messages .content");

  this.options = $("#options");
  this.selectArrow = $("#select");
  this.optionsContent = $("#options .content");

  this.currentOption = 0;
  this.selectOptions = [];
}

NPC.prototype.displayMessage = function(message) {
  if (this.name != "") {
    message = this.name.toUpperCase() + ": " + message;
  }
  this.messageContent.html(message);
}

NPC.prototype.displayOptions = function(options) {
  this.selectOptions = options;
  var optionsHtml = "";
  for (var i = 0; i < options.length; i ++) {
    optionsHtml += "<div>" + options[i] + "</div>";
  }
  this.setSelectArrow();
  this.optionsContent.html(optionsHtml);
}

NPC.prototype.arrowUp = function() {
  if (this.currentOption > 0) {
    this.currentOption -= 1;
    this.setSelectArrow();
  }
}

NPC.prototype.arrowDown = function() {
  if (this.currentOption < this.selectOptions.length - 1) {
    this.currentOption += 1;
    this.setSelectArrow();
  }
}

NPC.prototype.setSelectArrow = function() {
  this.selectArrow.css("top", (4 + 10 * this.currentOption) * this.MULT);
}