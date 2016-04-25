/**
  Walkthrough object to control a scene.
**/
function Walkthrough() {
  // Callback is set upon walkthrough initialization.
  this.callback = undefined;

  this.status = "playing"; // Current status of the walkthrough.
  this.current = 0;        // Current instruction step of the walkthrough.
  this.count = 0;          // Conversational counter.
  this.stepCount = 0;      // Step counter;
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

    switch (step.act) {
      // Cause a character to react.
      case "react":
        var subject = wt.getSubject(step);
        switch (step.react) {
          case "surprise":
            subject.reactSurprise();
            break;

          case "wat":
            subject.reactWat();
            break;

          case "love":
            subject.reactLove();
            break;

          case "happy":
            subject.reactHappy();
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
        break;



      // Have a character walk in a direction.
      case "walk":
        var subject = wt.getSubject(step);
        if (wt.stepCount == 0) {
          subject.stopWalking();
          subject.walk(step.dir);
        }

        switch (step.dir) {
          case "lf":
            subject.setLeft(subject.x - 1);
            break;

          case "up":
            subject.setBottom(subject.y - 1);
            break;

          case "rt":
            subject.setLeft(subject.x + 1);
            break;

          case "dw":
            subject.setBottom(subject.y + 1);
            break;

          default:
            break;
        }

        wt.stepCount += 1;
        // If the final step has been taken.
        if (wt.stepCount == step.dist) {
          wt.current += 1;
          wt.stepCount = 0;
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
        game.setStatus("focused");
        game.prompt.displayMessage(step.message, step.name);
        wt.status = "prompt";
        break;
      case "options":
        game.setStatus("focused");
        game.prompt.displayOptions(step.message, step.options, step.name);
        wt.status = "prompt";
        break;



      // Freeze the view for a bit.
      case "delay":
        wt.current += 1;
        break;



      // End the scene.
      case "callback":
        wt.status = "done";
        game.setStatus("focused");
        game.interact("");
        wt.current += 1;
        break;



      // Give control to walkthrough.
      case "break":
        wt.interact("");
        break;

      default:
        break;
    }

    // Call next step (if we're not in prompting mode or at the end of the instructions).
    if (step.act != "break" && wt.status != "prompt" && wt.current < wt.instructions.length) {
      setTimeout(wt.step(wt), step.dur);
    }
    if (wt.current == wt.instructions.length) {
      wt.current = 0;
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
      subject = game.player;
      break;

    case "npc":
      subject = game.getNPC(instruction.type).avatar;
      break;

    case "item":
      subject = game.area.getItem(instruction.type);

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
    game.prompt.arrowUp();
  }
};
Walkthrough.prototype.arrowRight = function() {};
Walkthrough.prototype.arrowDown = function() {
  if (this.status == "prompt") {
    game.prompt.arrowDown();
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

/**
  Continutes a walkthrough (usually when stopped for prompting).
**/
Walkthrough.prototype.continue = function() {
  game.setStatus("walkthrough");
  this.status = "playing";
  this.current += 1;
  this.step(this)();
}