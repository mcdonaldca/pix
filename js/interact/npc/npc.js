function NPC(name) {
  $.extend(this, new Interactable());
  this.name = name;
}

NPC.prototype.displayMessage = function(message) {
  if (this.name != "") {
    message = this.name.toUpperCase() + ": " + message;
  }
  this.messageContent.html(message);
}