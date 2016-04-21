/**
  The Message object is used for one-off messages with not further complicated interactions.
  @param content Array of strings to display
**/
function Message(content) {
  this.count = 0;
  this.setMessage(content);
}

/**
  Called when the player interacts with something that has a message.
  @param prompt The interface to the on-screen prompter.
  @param dir    (Not used here) The direction the user is facing.
  @return The current game status.
**/
Message.prototype.interact = function(prompt, dir) {
  var status = "convo"

  switch(this.count) {
    case 0:
      game.prompt.displayMessage(this.content[this.count]);
      break;

    case this.content.length:
      game.prompt.removeMessage();

      this.count = -1;
      status = "free";
      break;

    default:
      game.prompt.updateMessage(this.content[this.count]);
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
  if (typeof content == "string") {
    content = [content];
  }
  this.content = content || [];
}

// All interactables need these functions.
Message.prototype.arrowUp = function(prompt) {}
Message.prototype.arrowDown = function(prompt) {}