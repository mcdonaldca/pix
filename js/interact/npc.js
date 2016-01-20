function NPC(name) {
  this.name = name;
  this.count = 0;

  this.messages = $("#messages");
  this.nextArrow = $("#next");
  this.messageContent = $("#messages .content");

  this.options = $("#options");
  this.selectArrow = $("#select");
  this.optionsContent = $("#options .content");
}

NPC.prototype.displayMessage = function(message) {
  if (this.name != "") {
    message = this.name.toUpperCase() + ": " + message;
  }
  this.messageContent.html(message);
}

NPC.prototype.displayOptions = function(options) {
  var optionsHtml = "";
  for (var i = 0; i < options.length; i ++) {
    optionsHtml += "<div>" + options[i] + "</div>";
  }
  this.optionsContent.html(optionsHtml);
}

NPC.prototype.arrowUp = function() {
  console.log("up");
}

NPC.prototype.arrowDown = function() {
  console.log("down");
}