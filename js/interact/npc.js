function NPC(name) {
  this.name = name;
  this.count = 0;

  this.messages = $("#messages");
  this.next_arrow = $("#next");
  this.message_content = $("#messages .content");

  this.options = $("#options");
  this.select_arrow = $("#select");
  this.options_content = $("#options .content");
}

NPC.prototype.display_message = function(message) {
  if (this.name != "") {
    message = this.name.toUpperCase() + ": " + message;
  }
  this.message_content.html(message);
}