/**
  Walkthrough when trying to enter library without card.
**/
function NoLibraryCard() {
  $.extend(this, new Walkthrough());
};

/**
  Start the walkthrough.
**/
NoLibraryCard.prototype.start = function() {
  // Instructions for the walkthrough.
  this.instructions = [
    { act: "react", sub: "npc", type: "mary", react: "surprise", dur: 1500 },
    { act: "message", message: "You can't enter without a library card!", name: "mary" },
    { act: "walk", sub: "player", dir: "dw", dist: 2, dur: ANIM_LENGTH },
    { act: "face", sub: "player", dir: "dw", dur: ANIM_LENGTH },
    { act: "callback" }
  ];

  // Begin instruction sequence.
  this.step(this)();
}

/**
  Called when the player presses space.
**/
NoLibraryCard.prototype.interact = function() {
  switch(this.status) {
    case "prompt":
      if (this.current == 1) {
        game.prompt.removeMessage();
        this.continue();
      }
      break;

    case "done":
      return "free";
      break;

    case "playing":
    default:
      break;
  }
  return "walkthrough";
};

// Add NoLibraryCard object to game's walkthrough selection.
var noLibraryCard = new NoLibraryCard();
game.addWalkthrough("no-library-card", noLibraryCard);