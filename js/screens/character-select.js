/** 
  CharacterSelect at beginning of game where player builds their character.
**/
function CharacterSelect() {
  $.extend(this, new Screen("img/screens/character-select.svg"));

  this.selectorData = {
    square: { img: "url(img/screens/character-selector-square.svg)", width: 17, height: 17 },
    sprite: { img: "url(img/screens/character-selector-sprite.svg)", width: 23, height: 21 },
    random: { img: "url(img/screens/character-selector-random.svg)", width: 75, height: 20 },
    done:   { img: "url(img/screens/character-selector-done.svg)", width: 46, height: 20 }
  };

  var selectorEl = document.createElement("div");
  $(selectorEl).addClass("selector")
               .css("background-image", this.selectorData.square.img)
               .css("width", (this.selectorData.square.height * MULT).toString() + "px")
               .css("height", (this.selectorData.square.width * MULT).toString() + "px")
               .css("left", (68 * MULT).toString() + "px")
               .css("bottom", (93 * MULT).toString() + "px");
  this.selectorEl = $(selectorEl);
  this.elements.push(this.selectorEl);

  var canvasContainer = document.createElement("div");
  $(canvasContainer).addClass("character-select-display");
  var canvas = document.createElement("canvas");
  canvas.width = 23 * 2 * 4 * MULT;
  canvas.height = 29 * 2 * 4 * MULT;
  $(canvasContainer).append(canvas);
  this.elements.push(canvasContainer);

  this.spriteGenerator = new SpriteGenerator(canvas);

  this.category = 0;
  this.currentSelection = 0;
  this.values = [
    ["light", "medium", "dark"],
    ["dress", "vest"],
    ["bald", "hair-1", "hair-2", "hair-3"],
    ["blonde", "brown", "chocolate", "black", "red"],
    ["random", "done"]
  ];

  this.bottomValues = {
    0: 93,
    1: 70,
    2: 47,
    3: 28,
    4: 5
  }
}

/**
  Event fired when left arrow key is pressed.
**/
CharacterSelect.prototype.arrowLeft = function() {
  // If we're in selection mode and our current selection is greater than zero.
  if (this.status == "selection" && this.currentSelection > 0) {
    this.currentSelection -= 1;

    if (this.category == 4) {
      this.selectorEl.css("left", (8 * MULT).toString() + "px")
                     .css("background-image", this.selectorData.random.img)
                     .css("width", this.selectorData.random.width * MULT)
                     .css("height", this.selectorData.random.height * MULT);
    } else {
      var leftVal = 68 + (this.currentSelection * 21);
      // If we're in a sprite row, slight adjustment.
      if (this.category == 1 || this.category == 2) {
        leftVal -= 3;
      }

      // Apple new style.
      this.selectorEl.css("left", (leftVal * MULT).toString() + "px");
    }
  }
}

/**
  Event fired when up arrow key is pressed.
**/
CharacterSelect.prototype.arrowUp = function() {
  // If in selection mode and we're not at the top row.
  // Also checks that there is an object above to go to.
  if (this.status == "selection" && this.category > 0 &&
      this.currentSelection < this.values[this.category - 1].length) {
    this.category -= 1;

    // If we're going from a square -> sprite row.
    if (this.category == 0 || this.category == 3) {
      var leftVal = 68 + (this.currentSelection * 21);
      this.selectorEl.css("left", (leftVal * MULT).toString() + "px")
                     .css("background-image", this.selectorData.square.img)
                     .css("width", this.selectorData.square.width * MULT)
                     .css("height", this.selectorData.square.height * MULT);
    // If we're going from a sprite -> square row.
    } else if (this.category == 2) {
      var leftVal = 65 + (this.currentSelection * 21);
      this.selectorEl.css("left", (leftVal * MULT).toString() + "px")
                     .css("background-image", this.selectorData.sprite.img)
                     .css("width", this.selectorData.sprite.width * MULT)
                     .css("height", this.selectorData.sprite.height * MULT);
    }
  
    this.selectorEl.css("bottom", (this.bottomValues[this.category] * MULT).toString() + "px");
  }
}

/**
  Event fired when right arrow key is pressed.
**/
CharacterSelect.prototype.arrowRight = function() {
  // If we're in selection mode and our current selection hasn't maxed out the row.
  if (this.status == "selection" && this.currentSelection < this.values[this.category].length - 1) {
    this.currentSelection += 1;

    if (this.category == 4) {
      this.selectorEl.css("left", (124 * MULT).toString() + "px")
                     .css("background-image", this.selectorData.done.img)
                     .css("width", this.selectorData.done.width * MULT)
                     .css("height", this.selectorData.done.height * MULT);
    } else {
      var leftVal = 68 + (this.currentSelection * 21);
      // If we're in a sprite row, slight adjustment.
      if (this.category == 1 || this.category == 2) {
        leftVal -= 3;
      }

      // Apple new style.
      this.selectorEl.css("left", (leftVal * MULT).toString() + "px");
    }
  }
}

/**
  Event fired when down arrow key is pressed.
**/
CharacterSelect.prototype.arrowDown = function() {
  // If in selection mode and we're not at the last row.
  if (this.status == "selection" && this.category < this.values.length - 1) {
    if (this.category == 3) {
      this.category += 1;
      if (this.currentSelection < 2) {
        this.currentSelection = 0;
        this.selectorEl.css("left", (8 * MULT).toString() + "px")
                       .css("background-image", this.selectorData.random.img)
                       .css("width", this.selectorData.random.width * MULT)
                       .css("height", this.selectorData.random.height * MULT);
      } else {
        this.currentSelection = 1;
        this.selectorEl.css("left", (124 * MULT).toString() + "px")
                       .css("background-image", this.selectorData.done.img)
                       .css("width", this.selectorData.done.width * MULT)
                       .css("height", this.selectorData.done.height * MULT);
      }
      this.selectorEl.css("bottom", (this.bottomValues[this.category] * MULT).toString() + "px");
    } else if (this.currentSelection < this.values[this.category + 1].length) {
      this.category += 1;

      // If we're going from a square -> sprite row.
      if (this.category == 1) {
        var leftVal = 65 + (this.currentSelection * 21);
        this.selectorEl.css("left", (leftVal * MULT).toString() + "px")
                       .css("background-image", this.selectorData.sprite.img)
                       .css("width", this.selectorData.sprite.width * MULT)
                       .css("height", this.selectorData.sprite.height * MULT);
      } else if (this.category == 3) {
        var leftVal = 68 + (this.currentSelection * 21);
        this.selectorEl.css("left", (leftVal * MULT).toString() + "px")
                       .css("background-image", this.selectorData.square.img)
                       .css("width", this.selectorData.square.width * MULT)
                       .css("height", this.selectorData.square.height * MULT);
      }

      this.selectorEl.css("bottom", (this.bottomValues[this.category] * MULT).toString() + "px");
    }
  }
}

/**
  Event fired when space bar is pressed. Param not used.
  @param dir Direction user is facing. Not used.
**/
CharacterSelect.prototype.interact = function(dir) {
  if (this.category == 1) {
    this.spriteGenerator.setClothes(this.values[1][this.currentSelection]);
    this.spriteGenerator.generateSprite();
  } else if (this.category == 2) {
    this.spriteGenerator.setHairLength(this.values[2][this.currentSelection]);
    this.spriteGenerator.generateSprite();
  }
  return "screen";
}

// Add CharacterSelect object to game's screen selection.
var characterSelect = new CharacterSelect();
game.addScreen("character-select", characterSelect);