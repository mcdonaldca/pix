/** 
  Screen where player can read emails
**/
function Email() {
  $.extend(this, new Screen("img/screens/email/background.svg"));

  // Start with a message from Anne and Mom
  this.inbox = [{
    from: "anne",
    date: "Spring 01, Year 0",
    title: "Job offer",
    message: [
      "Hi there!", 
      "",
      "I'd like to set you up with some work. Come by Ritual Coffee Roasters when you get a chance!", 
      "",
      "Cheers, Anne"
    ],
    read: false,
  }, {
    from: "mom",
    date: "Spring 01, Year 0",
    title: "How are you?",
    message: [
      "Hi sweetie,",
      "",
      "How is San Francisco? Do you like the weather? Thinking about you.",
      "",
      "Love, Mom"
    ],
    read: false,
  }];

  // Arrow selector
  this.selectorData = {
    arrow: { img: "url(img/screens/email/arrow.svg)", width: 9, height: 5 },
  };

  // Set up the cursor 
  var selectorEl = document.createElement("div");
  $(selectorEl).addClass("selector")
               .css("background-image", this.selectorData.arrow.img)
               .css("width", (this.selectorData.arrow.height * MULT).toString() + "px")
               .css("height", (this.selectorData.arrow.width * MULT).toString() + "px")
               .css("left", (12 * MULT).toString() + "px")
               .css("top", (35 * MULT).toString() + "px");
  this.selectorEl = $(selectorEl);
  this.elements.push(this.selectorEl);

  // Create up and down display arrows.
  var moreUpEl = document.createElement("div");
  $(moreUpEl).addClass("email__more-up")
             .css("display", "none");
  this.moreUpEl = $(moreUpEl);
  this.elements.push(this.moreUpEl);
  var moreDownEl = document.createElement("div");
  $(moreDownEl).addClass("email__more-down")
               .css("display", "none");
  this.moreDownEl = $(moreDownEl);
  this.elements.push(this.moreDownEl);

  // Build the visible emails.
  this.visibleRows = [];
  for (var i = 0; i < 6; i++) {
    var row = document.createElement("div");
    $(row).addClass("screen__email")
          .css("top", ((28 + (i * 22)) * MULT).toString() + "px")
          .css("display", "none");
    var icon = document.createElement("div");
    $(icon).addClass("email__icon");
    var text = document.createElement("div");
    $(text).addClass("email__text");
    $(row).append(icon).append(text);
    this.visibleRows.push({ row: $(row), icon: $(icon), text: $(text) });
    this.elements.push($(row));
  }

  // Starting position for arrow
  this.position = 0;
  // Start index for displayed emails.
  this.startIndex = 0;
}

Email.prototype.customDisplay = function() {
  // Move cursor to top
  this.selectorEl.css("top", (35 * MULT).toString() + "px");
  this.position = 0;
  this.startIndex = 0;

  // Display first six messages.
  this.displayMessages();
}

Email.prototype.displayMessages = function() {
  // Row index goes from 0 -> 5
  var rowIndex = 0;
  // Display 6 emails starting from startIndex (or hide unecessary rows)
  for (var i = this.startIndex; i < this.startIndex + 6; i++) {
    // If there is a message to display
    if (this.inbox[i]) {
      this.visibleRows[rowIndex].row.css("display", "block");
      var position = this.inbox[i].read ? "0 " + (22 * MULT).toString() + "px" : "0 0";
      this.visibleRows[rowIndex].icon.css("background-position", position);
      var text = this.inbox[i].from.toUpperCase() + ": " + this.inbox[i].title;
      this.visibleRows[rowIndex].text.html(text);
    } else {
      this.visibleRows[rowIndex].row.css("display", "none");
    }
    rowIndex += 1;
  }

  // Display arrows to indicate more messages (when applicable)
  var displayUp = this.startIndex > 0 ? "block" : "none";
  var displayDown = this.inbox.length > this.startIndex + 6 ? "block" : "none";
  this.moreUpEl.css("display", displayUp);
  this.moreDownEl.css("display", displayDown);
}

/**
  Called to send and email to the inbox.
  @param from    Who the email is from.
  @param title   The subject of the email.
  @param message The body of the email.
**/
Email.prototype.recieve = function(from, title, message) {
  const email = {
    from: from,
    date: game.time.today(),
    title: title,
    message: message,
    read: false
  };

  this.inbox.unshift(message);
};

/**
  Called when player interacts with email screen.
  @param dir (Not used) Direction user is facing
**/
Email.prototype.interact = function(dir) {
  switch (this.count) {
    case 0:
      var email = this.inbox[this.position];
      this.prompt.displayMultilineMessage([
        "FROM: " + email.from.toUpperCase(), 
        "ON: &nbsp;&nbsp;" + email.date, 
        "SUBJ: " + email.title
      ]);
      this.count += 1;
      break;

    case 1:
      var email = this.inbox[this.position];
      this.prompt.updateMultilineMessage(email.message);
      this.count += 1;
      break;

    case 2:
      var email = this.inbox[this.position];
      this.prompt.removeMessage();
      if (!email.read) {
        this.inbox[this.position].read = true;
        this.visibleRows[this.position].icon.css("background-position", "0 " + (22 * MULT).toString() + "px");
      }
      this.count = 0;
      break;

    case 'end':
      this.count = 0;
      this.endScreen();
      return 'free';
      break;

    default:
      break;
  }

  // Stay on screen.
  return "focused";
};

/**
  Event fired when left or right arrow keys are pressed.
**/
Email.prototype.arrowLeft = function() {}
Email.prototype.arrowRight = function() {}


/**
  Event fired when up arrow key is pressed.
**/
Email.prototype.arrowUp = function() {
  if (this.position == 0 && this.startIndex > 0) {
    this.startIndex -= 1;
    this.displayMessages();
  } else if (this.position > 0) {
    this.position -= 1;
    this.selectorEl.css("top", ((35 + 22 * this.position) * MULT).toString() + "px");
  }
}


/**
  Event fired when down arrow key is pressed.
**/
Email.prototype.arrowDown = function() {
  if (this.position == 5 && this.inbox.length > this.startIndex + 6) {
    this.startIndex += 1;
    this.displayMessages();
  } else if (this.position < 5 && this.position < this.inbox.length - 1) {
    this.position += 1;
    this.selectorEl.css("top", ((35 + 22 * this.position) * MULT).toString() + "px");
  }
}

/**
  Event fired when backspace key is pressed. 
**/
Email.prototype.backspace = function() {
  this.count = 'end';
  game.interact();
};

// Add Keyboard object to game's screen selection.
var email = new Email();
game.addScreen("email", email);