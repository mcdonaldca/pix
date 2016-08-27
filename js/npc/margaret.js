/**
  Margaret is a character in the game.
**/
function Margaret() {
  $.extend(this, new NPC("margaret", "characters/margaret", "shadow_sm"));

  this.schedule = {
    weekday: {
      0: {
        area: "liam-margaret",
        x: 20,
        y: 4,
        face: "dw",
        dir: ["up", "rt", "dw", "lf"],
      },
      7: {
        area: "ritual-roasters",
        x: 1,
        y: 2,
        face: "lf",
        dir: ["up", "lf"],
      },
      8: {
        area: "library",
        x: 8,
        y: 6,
        face: "lf",
        dir: ["up", "dw", "lf"],
      },
      21: {
        area: "liam-margaret",
        x: 20,
        y: 4,
        face: "dw",
        dir: ["up", "rt", "dw", "lf"],
      },
    }
  }

  this.currentLocation = "liam-margaret";
}

/**
  Called when the player interacts with Margaret.
  @param prompt The interface to the on-screen prompter.
  @param dir    (Not used here) The direction the user is facing.
  @return The current game status.
**/
Margaret.prototype.interact = function(prompt, dir) {
  
}

// Add Margaret object to game's NPC collection.
var margaret = new Margaret();
game.addNPC(margaret.name, margaret);