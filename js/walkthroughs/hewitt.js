/**
  Walkthrough object to control a scene.
**/
function Hewitt() {
  // Set when the walkthrough starts.
  this.game = undefined;
  // Callback is set upon walkthrough initialization.
  this.callback = undefined;

  this.status = "playing"; // Current status of the walkthrough.
  this.current = 0;        // Current instruction step of the walkthrough.
  this.count = 0;          // Conversational counter.
  // Instructions for the walkthrough.
  this.instructions = [
    { act: "delay", dur: 1000 },
    { act: "appear", sub:"npc", type: "mom", dur: 0 },
    { act: "walk", sub: "npc", type: "mom", dir: "dw", dist: 1, dur: ANIM_LENGTH },
    { act: "walk", sub: "npc", type: "mom", dir: "lf", dist: 2, dur: ANIM_LENGTH },
    { act: "message", message: "You seem like you have a lot on your mind lately.", name: "mom"},
    { act: "react", sub: "player", react: "wat", dur: 2000 },
    { act: "options", message: "What's going on?", options: ["I'd like to set out on my own.", "I hate it here. I want to leave."], name: "mom" },
    { act: "appear", sub: "item", type: "newspaper", dur: 1000 },
    { act: "message", message: "It's the monthly paper -- there are usually a couple apartment listings.", name: "mom" },
    { act: "message", message: "Ah, what a wonderful choice.", name: "mom" }
  ];
};

/**
  Start the walkthrough.
  @param game Reference to the game object.
**/
Hewitt.prototype.start = function(game) {
  this.game = game;

  // Move to the hewitt home if not already there.
  if (game.area == undefined) {
    game.moveToArea("hewitt-home");
  }
  // Begin instruction sequence.
  this.step(this)();
}

/**
  Called to step through the walkthrough instructions.
  @param wt The walkthrough object.
**/
Hewitt.prototype.step = function(wt) {
  return function() {
    // Find the current instruction.
    var step = wt.instructions[wt.current];

    switch (step.act) {
      // Cause a character to react.
      case "react":
        var subject = wt.getSubject(step);
        switch (step.react) {
          case "wat":
            subject.reactWat();
            break;

          default:
            break;
        }
        wt.current += 1;
        break;

      // Cause an NPC or an item to appear.
      case "appear":
        var subject = wt.getSubject(step);
        subject.show();
        wt.current += 1;
        break;

      // Have a character walk in a direction.
      case "walk":
        var subject = wt.getSubject(step);
        if (wt.count == 0) {
          subject.stopWalking();
          subject.walk(step.dir);
        }

        switch (step.dir) {
          case "lf":
            subject.setLeft(subject.x - 1);
            break;

          case "up":
            subject.setBottom(subject.y + 1, wt.game.area.height);
            break;

          case "rt":
            subject.setLeft(subject.x + 1);
            break;

          case "dw":
            subject.setBottom(subject.y - 1, wt.game.area.height);
            break;

          default:
            break;
        }

        wt.count += 1;
        // If the final step has been taken.
        if (wt.count == step.dist) {
          wt.current += 1;
          wt.count = 0;
          // Stop the walking animation at the end of the step.
          setTimeout(function() {
            subject.stopWalking();
          }, step.dur);
        }
        break;

      // Display information through the prompt.
      case "message":
        wt.game.prompt.displayMessage(step.message, "mom");
        wt.status = "prompt";
        break;
      case "options":
        wt.game.prompt.displayOptions(step.message, step.options, step.name);
        wt.status = "prompt";
        break;

      // Freeze the view for a bit.
      case "delay":
        wt.current += 1;
        break;

      default:
        break;
    }

    // Call next step (if we're not in prompting mode or at the end of the instructions).
    if (wt.status != "prompt" && wt.current < wt.instructions.length) {
      setTimeout(wt.step(wt), step.dur);
    }
  }
}

/**
  Returns the subject of an instructions.
  @param instruction The instruction step.
**/
Hewitt.prototype.getSubject = function(instruction) {
  var subject = undefined;
  switch (instruction.sub) {
    case "player":
      subject = this.game.avatar;
      break;

    case "npc":
      subject = this.game.getNPC(instruction.type).avatar;
      break;

    case "item":
      subject = this.game.area.getItem(instruction.type);

    default:
      break;
  }
  return subject;
}

/**
  Called when the player presses space.
**/
Hewitt.prototype.interact = function() {
  switch(this.status) {
    case "prompt":
      if (this.current == 4) {
        this.status = "playing";
        this.game.prompt.removeMessage();
        this.current += 1;
        this.step(this)();
      } else if (this.current == 6) {
        if (this.count == 0) {
          var selected = this.game.prompt.selected();
          this.game.prompt.removeOptions();

          if (selected == 0) {
            this.game.prompt.displayMessage("I understand, dear. It's probably for the best.", "mom")
          } else {
            this.game.prompt.displayMessage("Oh... Well, I suppose it's time for you to make your way in the world.", "mom")
          }
        } else if (this.count == 1) {
          this.game.prompt.updateMessage("Here, this came today.", "mom");
        } else {
          this.status = "playing";
          this.count = -1;
          this.game.prompt.removeMessage();
          this.current += 1;
          this.step(this)();
        }
        this.count += 1;
      } else if (this.current == 8) {
        this.current += 1;
        this.game.prompt.removeMessage();
        this.callback(1);
        return "screen";
      } else if (this.current == 9) {
        if (this.count == 0) {
          this.game.prompt.updateMessage(this.game.city + " is a beautiful city.", "mom");
        } else if (this.count == 1) {
          this.game.prompt.updateMessage("Actually, an old friend of mine runs a coffee shop there.", "mom");
        } else if (this.count == 2) {
          this.game.prompt.updateMessage("I'll shoot Anne a message to let her know you're coming.", "mom");
        } else if (this.count == 3) {
          this.game.prompt.updateMessage("I'm sure she'd hire you for a bit while you get on your feet.", "mom");
        } else if (this.count == 4) {
          this.game.prompt.removeMessage();
          this.game.prompt.displayOptions(
            "",
            ["I'll miss you.", "Thanks, Mom!", "Whatever."]
            );
        } else if (this.count == 5) {
          var content = "I'll miss you, sweetie. Don't forget to call!";
          if (this.game.prompt.selected() == 0) {
            var content = "I'll miss you too, sweetie. Don't forget to call!";
          }
          this.game.prompt.removeOptions();
          this.game.prompt.displayMessage(content, "mom");
        } else if (this.count == 6) {
          this.game.prompt.removeMessage();
          this.callback(2);
          this.exit = "rundown-apt";
          return "exit";
        }
        this.count += 1;
      }
      break;

    case "playing":
    default:
      break;
  }
  return "walkthrough";
};

/**
  Getter for Hewitt.exit.
  @return The string of the area to exit to.
**/
Hewitt.prototype.exitTo = function() {
  return this.exit;
}

/**
  Necessary functions for a focus object.
**/
Hewitt.prototype.arrowUp = function() {
  if (this.status == "prompt") {
    this.game.prompt.arrowUp();
  }
};
Hewitt.prototype.arrowRight = function() {};
Hewitt.prototype.arrowDown = function() {
  if (this.status == "prompt") {
    this.game.prompt.arrowDown();
  }
};
Hewitt.prototype.arrowLeft = function() {};

/**
  Setter for Hewitt.callback.
  @param callback The callback function.
**/
Hewitt.prototype.setCallback = function(callback) {
  this.callback = callback;
}

// Add hewitt object to game's walkthrough selection.
var hewitt = new Hewitt(game.getNPC("mom"));
hewitt.setCallback(game.hewittCallback(game));
game.addWalkthrough("hewitt", hewitt);