/**
  Travel object to dictate the path an NPC travels.
**/
function Travel(npc, instructions) {
  this.npc = npc;
  this.instructions = instructions;

  this.current = 0;        // Current instruction step of the walkthrough.
  this.stepCount = 0;      // Step counter;
};

Travel.prototype.start = function() {
  game.player.stopWalking();
  // Begin instruction sequence.
  this.step(this)();
}

/**
  Called to step through the walkthrough instructions.
  @param t The walkthrough object.
**/
Travel.prototype.step = function(t) {
  return function() {
    // Find the current instruction.
    var step = t.instructions[t.current];

    switch (step.act) {

      // Have the npc walk in a direction.
      case 'walk':
        if (t.stepCount == 0) {
          t.npc.stopWalking();
          t.npc.walk(step.dir);
        }

        t.npc.moveDir(step.dir);

        t.stepCount += 1;
        // If the final step has been taken.
        if (t.stepCount == step.dist) {
          t.current += 1;
          t.stepCount = 0;
          // Stop the walking animation at the end of the step.
          setTimeout(function() {
            t.npc.stopWalking();
          }, step.dur);
        }
        break;



      // Have the npc face a certain direction.
      case 'face':
        t.npc.faceDir(step.dir);
        t.current += 1;
        break;

      case 'exit':
        // Remove NPC from their current location & update current location.
        game.areas[t.npc.currentLocation].removeNPC(t.npc.name);
        t.npc.currentLocation = step.to;

        // Add NPC to new location and update postion/direction.
        game.areas[t.npc.currentLocation].addNPC(step.x, step.y, DIR.DW, t.npc, []);
        t.npc.setPosition(step.x, step.y, /* arrivingInArea */ true);
        t.npc.faceDir(step.dir);

        t.current += 1;
        break;

      default:
        break;
    }

    // Call next step (if we're not in prompting mode or at the end of the instructions).
    if (t.current < t.instructions.length) {
      setTimeout(t.step(t), step.dur);
    }
    if (t.current == t.instructions.length) {
      t.current = 0;
    }
  }
}

/**
  Necessary functions for a focus object.
**/
Travel.prototype.arrowUp = function() {};
Travel.prototype.arrowRight = function() {};
Travel.prototype.arrowDown = function() {};
Travel.prototype.arrowLeft = function() {};