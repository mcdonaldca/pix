/**
  Travel object to dictate the path an NPC travels.
  @param npc          The NPC doing the traveling.
  @param instructions The instructions to follow.
**/
function Travel(npc, instructions) {
  this.npc = npc;
  this.instructions = instructions;

  this.current = 0; // Current instruction step of the walkthrough.

  this.currentPath = undefined; // Current path being followed.
  this.walkCount = 0;           // Which walking instruction within path.
  this.stepCount = 0;           // Which step within the walking instruction.
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

      // Walk the NPC along a generated area route.
      case 'path':
        // If the path hasn't been generated yet, do so.
        if (!t.currentPath) {
          var directions = game.areas[step.area].pathBetween(step.start, step.end);
          var route = t.processRoute(directions);
          t.currentPath = route;
        }

        // Find our current walk instruction.
        var currWalkInstruction = t.currentPath[t.walkCount];
        // If on first step, set new walking direction.
        if (t.stepCount == 0) {
          t.npc.stopWalking();
          t.npc.walk(currWalkInstruction.dir);
        }

        // Move our current direction.
        t.npc.moveDir(currWalkInstruction.dir);

        t.stepCount += 1;
        // If the final step has been taken.
        if (t.stepCount == currWalkInstruction.dist) {
          t.walkCount += 1;
          t.stepCount = 0;
          // Stop the walking animation at the end of the step.
          setTimeout(function() {
            t.npc.stopWalking();
          }, step.dur);
        }
        
        // If we've hit the end of the route, reset tracking values and continue.
        if (t.walkCount == t.currentPath.length) {
          t.currentPath = undefined;
          t.walkCount = 0;
          t.stepCount = 0;
          t.current += 1;
        }        
        break;

      // Have the npc face a certain direction.
      case 'face':
        t.npc.faceDir(step.dir);
        t.current += 1;
        break;

      case 'exit':
        // Remove NPC from their current location & update current location.
        game.areas[t.npc.currentLocation].removeNPC(t.npc);
        var prevLocation = t.npc.currentLocation;
        t.npc.currentLocation = step.to;

        // Add NPC to new location and update postion/direction.
        game.areas[t.npc.currentLocation].addNPC(t.npc);
        t.npc.setPosition(step.x, step.y, /* arrivingInArea */ true, prevLocation)
             .faceDir(step.dir);

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
  Takes a set of direction instructions and bundles into distances.
  Ex. "lf", "lf" => { "lf", 2 }
  @param directions The list of directions
  @returns An list of objects with directions and distances.
**/
Travel.prototype.processRoute = function(directions) {
  var route = [];
  var currentInstruction = 0;
  var currentDir = directions[0];
  route.push({ dir: currentDir, dist: 1 });

  for (var i = 1; i < directions.length; i++) {
    if (directions[i] === currentDir) {
      route[currentInstruction].dist += 1
    } else {
      currentDir = directions[i];
      route.push({ dir: currentDir, dist: 1 });
      currentInstruction += 1;
    }
  }

  return route;
}

/**
  Necessary functions for a focus object.
**/
Travel.prototype.arrowUp = function() {};
Travel.prototype.arrowRight = function() {};
Travel.prototype.arrowDown = function() {};
Travel.prototype.arrowLeft = function() {};