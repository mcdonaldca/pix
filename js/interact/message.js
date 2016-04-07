/**
  The Message object is used for one-off messages with not further complicated interactions.
**/
function Message(message) {
  $.extend(this, new Interactable());
  this.message = message;
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
      this.displayMessage(this.message);
      this.messages.show();
      break;

    case 1:
      this.displayMessage("");
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

/**
  Setter for Message.message.
  @param message The new message string.
**/
Message.prototype.setMessage = function(message) {
  this.message = message;
}