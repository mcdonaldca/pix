/**
  Walkthrough when first appearing in the apartment.
**/
function OpeningRundownApt() {
  $.extend(this, new Walkthrough());
};

/**
  Start the walkthrough.
  @param game Reference to the game object.
**/
OpeningRundownApt.prototype.start = function(game) {
  // Instructions for the walkthrough.
  this.instructions = [
    { act: "delay", dur: 1000 },
    { act: "react", sub: "player", react: "wat", dur: 2000 },
    { act: "show", sub: "npc", type: "holland", dur: ANIM_LENGTH_NPC },
    { act: "walk", sub: "npc", type: "holland", dir: DIR.UP, dist: 1, dur: ANIM_LENGTH_NPC },
    { act: "face", sub: "npc", type: "holland", dir: DIR.RT, dur: 0 },
    { act: "message", message: "Hi there! You must be " + game.name + ".", name: "holland" },
    { act: "delay", dur: 1000 },
    { act: "react", sub: "player", react: "wat", dur: 2000 },
    { act: "delay", dur: 1000 },
    { act: "face", sub: "npc", type: "holland", dir: DIR.UP, dur: 0 },
    { act: "options", message: "PICK ONE:", options: ["It's... not what I expected.", "Is this a joke?"] },
    { act: "face", sub: "npc", type: "holland", dir: DIR.RT, dur: 0 },
    { act: "walk", sub: "npc", type: "holland", dir: DIR.DW, dist: 1, dur: ANIM_LENGTH_NPC },
    { act: "hide", sub: "npc", type: "holland", dur: 0 },
    { act: "callback" }
  ];
  this.game = game;

  game.exit("rundown-apt");
  var holland = game.getNPC("holland");
  holland.hide()
         .setPosition(2, 5)
         .faceUp();
  game.area.append(holland.getEl());
  // Begin instruction sequence.
  this.step(this)();
}

/**
  Called when the player presses space.
**/
OpeningRundownApt.prototype.interact = function() {
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
          this.game.prompt.updateMessage("Maybe you could put an ad online? All it takes is a computer!", "holland");
        } else if (this.count == 4) {
          this.game.player.faceLeft();
          this.game.getNPC("holland").faceRight();
          this.game.prompt.updateMessage("The library has computers you can use, but it might be worth it to buy one of your own.", "holland");
        } else if (this.count == 5) {
          this.game.prompt.updateMessage("Anyway, come find me in the lobby if you have any questions or want to do any renovations.", "holland");
        } else {
          this.game.prompt.removeMessage();
          this.count = -1;
          this.continue();
        }
        this.count += 1;
      }
      break;

    case "done":
      this.game.getNPC("holland").getEl().remove();
      this.callback();
      return "free";
      break;

    case "playing":
    default:
      break;
  }
  return "focused";
};

// Add hewitt object to game's walkthrough selection.
var openingRundownApt = new OpeningRundownApt();
openingRundownApt.setCallback(game.openingRundownAptCallback(game));
game.addWalkthrough("opening-rundown-apt", openingRundownApt);