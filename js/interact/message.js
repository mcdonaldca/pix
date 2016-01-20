function Message(message) {
  $.extend(this, new NPC(""));
  this.message = message;
}

Message.prototype.interact = function(dir) {
  var status = "convo"

  switch(this.count) {
    case 0:
      this.messages.show();
      this.display_message(this.message);
      break;

    case 1:
      this.display_message("");
      this.messages.hide();

      this.count = -1;
      status = "free";
      break;

    default:
      break;
  }

  this.count += 1;
  return status;
}