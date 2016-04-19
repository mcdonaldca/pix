/**
  Walkthrough object to control a scene.
**/
function Walkthrough() {
  // Set when the walkthrough starts.
  this.game = undefined;
  // Callback is set upon walkthrough initialization.
  this.callback = undefined;

  this.status = "playing"; // Current status of the walkthrough.
  this.current = 0;        // Current instruction step of the walkthrough.
  this.count = 0;          // Conversational counter.
  this.instructions = [];  // Instructions for the walkthrough.
};

/**
  Called to step through the walkthrough instructions.
  @param wt The walkthrough object.
**/
Walkthrough.prototype.step = function(wt) {
  return function() {
    // Find the current instruction.
    var step = wt.instructions[wt.current];
    console.log(step.act)

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

      // Cause an NPC or an item to appear or disappear.
      case "show":
        var subject = wt.getSubject(step);
        subject.show();
        wt.current += 1;
        break;
      case "hide":
        var subject = wt.getSubject(step);
        subject.hide();
        wt.current += 1;

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

      // Have a character face a certain direction.
      case "face":
        var subject = wt.getSubject(step);

        switch (step.dir) {
          case "lf":
            subject.faceLeft();
            break;

          case "up":
            subject.faceUp();
            break;

          case "rt":
            subject.faceRight();
            break;

          case "dw":
            subject.faceDown();
            break;

          default:
            break;
        }
        wt.current += 1;
        break;


      // Display information through the prompt.
      case "message":
        wt.game.prompt.displayMessage(step.message, step.name);
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

      // End the scene.
      case "callback":
        wt.game.interact("");
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
Walkthrough.prototype.getSubject = function(instruction) {
  var subject = undefined;
  switch (instruction.sub) {
    case "player":
      subject = this.game.player;
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
  Getter for Walkthrough.exit.
  @return The string of the area to exit to.
**/
Walkthrough.prototype.exitTo = function() {
  return this.exit;
}

/**
  Necessary functions for a focus object.
**/
Walkthrough.prototype.arrowUp = function() {
  if (this.status == "prompt") {
    this.game.prompt.arrowUp();
  }
};
Walkthrough.prototype.arrowRight = function() {};
Walkthrough.prototype.arrowDown = function() {
  if (this.status == "prompt") {
    this.game.prompt.arrowDown();
  }
};
Walkthrough.prototype.arrowLeft = function() {};

/**
  Setter for Walkthrough.callback.
  @param callback The callback function.
**/
Walkthrough.prototype.setCallback = function(callback) {
  this.callback = callback;
}