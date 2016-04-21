/**
  Walkthrough when first entering Ritual Roasters.
**/
function AnneIntro() {
  $.extend(this, new Walkthrough());
};

/**
  Start the walkthrough.
  @param game Reference to the game object.
**/
AnneIntro.prototype.start = function() {
  // Instructions for the walkthrough.
  this.instructions = [
    { act: "delay", dur: 1000 },
    { act: "show", sub:"npc", type: "anne", dur: ANIM_LENGTH_NPC },
    { act: "react", sub: "npc", type: "anne", react: "surprise", dur: 1000 },
    { act: "walk", sub: "npc", type: "anne", dir: "lf", dist: 1, dur: ANIM_LENGTH_NPC },
    { act: "face", sub: "npc", type: "anne", dir: "lf", dur: ANIM_LENGTH_NPC },
    { act: "hide", sub: "item", type: "counter-end", dur: 0 },
    { act: "hide", sub: "item", type: "counter", dur: 0 },
    { act: "walk", sub: "npc", type: "anne", dir: "lf", dist: 2, dur: ANIM_LENGTH_NPC },
    { act: "walk", sub: "npc", type: "anne", dir: "dw", dist: 3, dur: ANIM_LENGTH_NPC },
    { act: "walk", sub: "npc", type: "anne", dir: "rt", dist: 1, dur: ANIM_LENGTH_NPC },
    { act: "face", sub: "npc", type: "anne", dir: "dw", dur: 0 },
    { act: "walk", sub: "npc", type: "anne", dir: "dw", dist: 2, dur: ANIM_LENGTH_NPC },
    { act: "message", message: "You must be " + game.name + "! I can see the family resemblence.", name: "anne" },
    { act: "walk", sub: "npc", type: "anne", dir: "up", dist: 2, dur: ANIM_LENGTH_NPC },
    { act: "walk", sub: "npc", type: "anne", dir: "lf", dist: 1, dur: ANIM_LENGTH_NPC },
    { act: "walk", sub: "npc", type: "anne", dir: "up", dist: 3, dur: ANIM_LENGTH_NPC },
    { act: "walk", sub: "npc", type: "anne", dir: "rt", dist: 2, dur: ANIM_LENGTH_NPC },
    { act: "break" },
    { act: "walk", sub: "npc", type: "anne", dir: "rt", dist: 1, dur: ANIM_LENGTH_NPC },
    { act: "walk", sub: "npc", type: "anne", dir: "dw", dist: 2, dur: ANIM_LENGTH_NPC },
    { act: "face", sub: "npc", type: "anne", dir: "dw", dur: 0 }
  ];

  game.moveToArea("ritual-roasters");
  var anne = game.getNPC("anne");
  anne.avatar.setPosition(5, 2);
  anne.avatar.hide();
  game.player.stopWalking();
  // Begin instruction sequence.
  this.step(this)();
}

/**
  Called when the player presses space.
**/
AnneIntro.prototype.interact = function() {
  switch(this.status) {
    case "prompt":
      if (this.current == 12) {
        // Email prompt.
        if (this.count == 0) {
          game.prompt.displayOptions(
            "Did you get my email?", 
            ["Yes", "No"],
            "anne"
            );
        // Response to email prompt.
        } else if (this.count == 1) {
          // If we're in the middle of the "didn't check" email track.
          if (this.track == "didn't check") {
            if (this.trackCount == 0) {
              game.prompt.updateMessage("The library has computers you can use.", "anne");
              this.count = 0; // Reset to same count level.
            } else if (this.trackCount == 1) {
              game.prompt.updateMessage("I emailed you because your mother said you were moving out here.", "anne");
              this.count = 0; // Reset to same count level.
            } else if (this.trackCount == 2) {
              game.prompt.updateMessage("I know how hard it can be to get on your feet in a big city, and we have an opening,", "anne");
              this.count = 0; // Reset to same count level.
            } else {
              game.prompt.updateMessage("so I wanted to offer you a job as a barista here.", "anne");
              this.trackCount = -1;
            }
            this.trackCount += 1;
          } else {
            var s = game.prompt.selected();
            game.prompt.removeOptions();
            if (s == 0) {
              game.prompt.displayMessage("Great! We have an opening if you're interested.", "anne");
            } else {
              game.prompt.displayMessage("Hm, if you don't check your email you might miss something important.", "anne");
              // Begin "didn't check" email track.
              this.track = "didn't check";
              this.trackCount = 0;
              this.count = 0; // Reset to same count level.
            }
          }
        // Ask if player wants the coffee shop job.
        } else if (this.count == 2) {
          game.prompt.removeMessage();
          game.prompt.displayOptions(
            "",
            ["I'd love to work here!", "Sure", "No thanks.", "Why would I want to work here?"]
            );
        // Response to job offer.
        } else if (this.count == 3) {
          // If we're in the middle of the "accepted" job track.
          if (this.track == "accepted") {
            if (this.trackCount == 0) {
              game.prompt.updateMessage("Whenever you want to come into work, just walk through that door back there.", "anne");
              this.count = 2; // Reset to same count level.
            } else if (this.trackCount == 1) {
              game.prompt.updateMessage("Welcome to " + game.city + ", " + game.name + ".", "anne");
              this.count = 2; // Reset to same count level.
            } else {
              game.prompt.removeMessage();
              this.count = -1;
              this.trackCount = 0;
              this.continue();
              this.callback(this.acceptedJob);
              return "free";
            }
            this.trackCount += 1;
          } else {
            var s = game.prompt.selected();
            game.prompt.removeOptions();
            if (s == 0 || s == 1) {
              this.acceptedJob = true;
              game.getNPC("anne").avatar.reactHappy();
              game.prompt.displayMessage("So glad to hear it!", "anne");
              // Begin "accepted" job track.
              this.track = "accepted";
              this.trackCount = 0;
              this.count = 2; // Reset to same count level.
            } else {
              this.acceptedJob = false;
              game.prompt.displayMessage("Well, if you change your mind, come talk to me.", "anne");
            }
          }
        // End of walkthrough.
        } else {
          game.prompt.removeMessage();
          this.count = -1;
          this.continue();
          this.callback(this.acceptedJob);
          return "free";
        }
        this.count += 1;
      }
      break;

    case "playing":
      if (this.current == 17) {
        if (!this.acceptedJob) {
          game.getNPC("anne").avatar.faceLeft();
          var wt = this;
          setTimeout(function() {
            game.area.getItem("counter").show();
            game.area.getItem("counter-end").show();
            wt.continue();
          }, ANIM_LENGTH_NPC);
        } else {
          this.continue();
        }
      }
      break;

    default:
      break;
  }
  return "walkthrough";
};

// Add hewitt object to game's walkthrough selection.
var anneIntro = new AnneIntro();
anneIntro.setCallback(game.anneIntroCallback(game));
game.addWalkthrough("anne-intro", anneIntro);