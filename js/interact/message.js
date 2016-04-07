/**
  The Message object is used for one-off messages with not further complicated interactions.
  @param content Array of strings to display
**/
function Message(content) {
  $.extend(this, new Interactable());
  if (typeof content == "string") {
    content = [content];
  }
  this.content = content || [];
}

/**
  Called when the player interacts with something that has a message.
  @param dir The direction the user is facing (not used here).
  @return The current game status.
**/
Message.prototype.interact = function(dir) {
  var status = "convo"

  switch(this.count) {
    case 0:
      this.displayMessage(this.content[this.count]);
      this.messages.show();
      break;

    case this.content.length:
      this.displayMessage("");
      this.messages.hide();

      this.count = -1;
      status = "free";
      break;

    default:
      this.displayMessage(this.content[this.count]);
      break;
  }

  this.count += 1;
  return status;
}

/**
  Setter for Message.content.
  @param content The new message string.
**/
Message.prototype.setMessage = function(content) {
  this.content = content;
}