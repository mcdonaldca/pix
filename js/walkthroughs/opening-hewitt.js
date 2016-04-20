/**
  Walkthrough at very beginning of the game.
**/
function Hewitt() {
  $.extend(this, new Walkthrough());
};

/**
  Start the walkthrough.
  @param game Reference to the game object.
**/
Hewitt.prototype.start = function(game) {
  // Instructions for the walkthrough.
  this.instructions = [
    { act: "delay", dur: 1000 },
    { act: "show", sub:"npc", type: "mom", dur: ANIM_LENGTH_NPC },
    { act: "walk", sub: "npc", type: "mom", dir: "dw", dist: 1, dur: ANIM_LENGTH_NPC },
    { act: "walk", sub: "npc", type: "mom", dir: "lf", dist: 2, dur: ANIM_LENGTH_NPC },
    { act: "message", message: "You seem like you have a lot on your mind lately.", name: "mom"},
    { act: "react", sub: "player", react: "wat", dur: 2000 },
    { act: "options", message: "What's going on?", options: ["I'd like to set out on my own.", "I hate it here. I want to leave."], name: "mom" },
    { act: "show", sub: "item", type: "newspaper", dur: 1000 },
    { act: "message", message: "It's the monthly paper -- there are usually a couple apartment listings.", name: "mom" },
    { act: "message", message: "Ah, " + game.city + " is a beautiful city.", name: "mom" }
  ];
  this.game = game;

  // Move to the hewitt home if not already there.
  if (game.area == undefined) {
    game.moveToArea("hewitt-home");
    game.getNPC("mom").avatar.hide();
  }
  // Begin instruction sequence.
  this.step(this)();
}

/**
  Called when the player presses space.
**/
Hewitt.prototype.interact = function() {
  switch(this.status) {
    case "prompt":
      if (this.current == 4) {
        this.game.prompt.removeMessage();
        this.continue();
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
          this.game.prompt.removeMessage();
          this.count = -1;
          this.continue();
        }
        this.count += 1;
      } else if (this.current == 8) {
        this.current += 1;
        this.game.prompt.removeMessage();
        this.callback(1);
        return "screen";
      } else if (this.current == 9) {
        if (this.count == 0) {
          this.game.prompt.updateMessage("Actually, an old friend of mine runs a coffee shop there.", "mom");
        } else if (this.count == 1) {
          this.game.prompt.updateMessage("I'll shoot Anne a message to let her know you're coming.", "mom");
        } else if (this.count == 2) {
          this.game.prompt.updateMessage("I'm sure she'd hire you for a bit while you get on your feet.", "mom");
        } else if (this.count == 3) {
          this.game.prompt.removeMessage();
          this.game.prompt.displayOptions(
            "",
            ["I'll miss you.", "Thanks, Mom!", "Whatever."]
            );
        } else if (this.count == 4) {
          var content = "I'll miss you, sweetie. Don't forget to call!";
          if (this.game.prompt.selected() == 0) {
            var content = "I'll miss you too, sweetie. Don't forget to call!";
          }
          this.game.prompt.removeOptions();
          this.game.prompt.displayMessage(content, "mom");
        } else {
          this.count = -1;
          this.game.prompt.removeMessage();
          this.callback(2);
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

// Add hewitt object to game's walkthrough selection.
var hewitt = new Hewitt();
hewitt.setCallback(game.openingHewittCallback(game));
game.addWalkthrough("opening-hewitt", hewitt);