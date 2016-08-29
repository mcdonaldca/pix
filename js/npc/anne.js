/**
  Anne
**/
function Anne() {
  $.extend(this, new NPC("anne", "characters/anne", "shadow_sm"));
  this.talkedTo = true;
}

/**
  No interaction needed for now.
**/
Anne.prototype.interact = function(prompt, dir) {
  var status = "focused";

  switch(this.count) {
    case 0:
      if (dir == "dw") this.faceUp();
      var options = ["Great!", "Okay", "Terrible."];
      if (game.player.getJob() == "unemployed") {
        options.push("I'd like a job.");
      }
      game.prompt.displayOptions(
        "Hi, " + game.name + ". How are you doing?",
        options,
        "anne"
        );
      break;

    case 1:
      var s = game.prompt.selected();
      game.prompt.removeOptions();
      switch(s) {
        case 0:
          game.prompt.displayMessage("I'm so glad to hear that!", "anne");
          game.player.karma.update("anne", 1, "Told Anne you were doing great.");
          break;

        case 1:
          game.prompt.displayMessage("Glad to hear it.", "anne");
          game.player.karma.log("Told Anne you were doing okay.");
          break;

        case 2:
          game.prompt.displayMessage("I'm sorry to hear that. Let me know if I can help.", "anne");
          game.player.karma.update("anne", -1, "Told Anne you were doing terrible.");
          break;

        case 3:
          game.prompt.displayMessage("Of course! Whenever you want to come into work, just walk through that door back there.", "anne");
          game.player.employ("Ritual Roasters Barista", 12);
          game.area.space(3, 2).setBlocked([]);
          game.area.getItem("counter-end").hide();
          game.area.getItem("counter").hide();
        default:
          break;
      }
      break;

    case 2:
      this.faceDown();
      game.prompt.removeMessage();
      this.count = -1;
      status = "free";

    default:
      break;
  }

  this.count += 1;
  return status;
}

// Add Anne object to game's NPC collection.
var anne = new Anne();
game.addNPC(anne.name, anne);