/**
  Walkthrough when first appearing in the apartment.
**/
function RundownApt1() {
  $.extend(this, new Walkthrough());
};

/**
  Start the walkthrough.
  @param game Reference to the game object.
**/
RundownApt1.prototype.start = function(game) {
  // Instructions for the walkthrough.
  this.instructions = [
    { act: "delay", dur: 1000 },
    { act: "react", sub: "player", react: "wat", dur: 2000 },
    { act: "show", sub: "npc", type: "holland", dur: ANIM_LENGTH_NPC },
    { act: "walk", sub: "npc", type: "holland", dir: "up", dist: 1, dur: ANIM_LENGTH_NPC },
    { act: "face", sub: "npc", type: "holland", dir: "rt", dur: 0 },
    { act: "message", message: "Hi there! You must be " + game.name + ".", name: "holland" },
    { act: "delay", dur: 1000 },
    { act: "react", sub: "player", react: "wat", dur: 2000 },
    { act: "delay", dur: 1000 },
    { act: "face", sub: "npc", type: "holland", dir: "up", dur: 0 },
    { act: "options", message: "", options: ["It's... not what I expected.", "Is this a joke?"] },
    { act: "face", sub: "npc", type: "holland", dir: "rt", dur: 0 },
    { act: "walk", sub: "npc", type: "holland", dir: "dw", dist: 1, dur: ANIM_LENGTH_NPC },
    { act: "hide", sub: "npc", type: "holland", dur: 0 },
    { act: "callback" }
  ];
  this.game = game;

  game.moveToArea("rundown-apt");
  var holland = game.getNPC("holland");
  holland.avatar.hide();
  holland.avatar.setLeft(1);
  holland.avatar.setBottom(0, game.area.height);
  holland.avatar.faceUp();
  game.area.append(holland.getEl());
  // Begin instruction sequence.
  this.step(this)();
}

/**
  Called when the player presses space.
**/
RundownApt1.prototype.interact = function() {
  switch(this.status) {
    case "prompt":
      if (this.current == 5) {
        if (this.count == 0) {
          this.game.prompt.updateMessage("Welcome to " + game.city + "!", "holland");
        } else if (this.count == 1) {
          this.game.prompt.updateMessage("My name is Holland, I work at the front desk.", "holland");
        } else {
          this.game.prompt.removeMessage();
          this.count = -1;
          this.continue();
        }
        this.count += 1;
      } else if (this.current == 10) {
        if (this.count == 0) {
          this.game.prompt.removeOptions();
          this.game.prompt.displayMessage("Well, the place is a bit of a fixer-upper.", "holland");
        } else if (this.count == 1) {
          this.game.prompt.updateMessage("It has some charm of its own, though.", "holland");
        } else if (this.count == 2) {
          this.game.prompt.updateMessage("But if you want to move out, all you have to do is find another renter!", "holland");
        } else if (this.count == 3) {
          this.game.prompt.updateMessage("Maybe you could put an ad online?", "holland");
        } else if (this.count == 4) {
          this.game.player.faceLeft();
          this.game.getNPC("holland").avatar.faceRight();
          this.game.prompt.updateMessage("Anyway, come find me in the lobby if you have any questions or want to do any renovations.", "holland");
        } else {
          this.game.prompt.removeMessage();
          this.count = -1;
          this.continue();
        }
        this.count += 1;
      }
      break;

    case "playing":
      if (this.current == 14) {
        this.game.getNPC("holland").getEl().remove();
        this.callback();
        return "free";
      }
      break;

    default:
      break;
  }
  return "walkthrough";
};

// Add hewitt object to game's walkthrough selection.
var rundownApt1 = new RundownApt1();
rundownApt1.setCallback(game.openingRundownAptCallback(game));
game.addWalkthrough("opening-rundown-apt", rundownApt1);