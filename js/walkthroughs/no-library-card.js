/**
  Walkthrough when trying to enter library without card.
**/
function NoLibraryCard() {
  $.extend(this, new Walkthrough('no-library-card'));
};

/**
  Start the walkthrough.
**/
NoLibraryCard.prototype.start = function() {
  // Instructions for the walkthrough.
  this.instructions = [
    { act: 'react', sub: 'npc', type: 'mary', react: 'surprise', dur: 1000 },
    { act: 'face', sub: 'player', dir: DIR.DW, dur: ANIM_LENGTH_NPC },
    { act: 'message', message: 'You can\'t enter without a library card!', name: 'mary' },
    { act: 'walk', sub: 'player', dir: DIR.DW, dist: 2, dur: ANIM_LENGTH },
    { act: 'callback' }
  ];

  // Begin instruction sequence.
  this.step(this)();
}

/**
  Called when the player presses space.
**/
NoLibraryCard.prototype.interact = function() {
  switch(this.status) {
    case 'prompt':
      if (this.current == 2) {
        game.prompt.removeMessage();
        this.continue();
      }
      break;

    case 'done':
      return 'free';
      break;

    case 'playing':
    default:
      break;
  }
  return 'focused';
};