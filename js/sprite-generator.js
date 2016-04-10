/** 
  Builds a custom sprite using canvas.
  Uses image data from sprite.data.js.
  @param canvas The canvas to draw to.
  @param scale  (Optional) Any extra scaling.
**/
function SpriteGenerator(canvas, scale) {
  scale = scale || 1;
  this.canvas = canvas; // The canvas to draw the sprite to.
  this.context = this.canvas.getContext("2d"); // Context of the canvas.

  // Scale the canvas by the necessary amount.
  this.context.scale(scale * MULT, scale * MULT);

  this.outfit = "dress"; // Default outfit for the sprite.
  this.hair = "hair-3";  // Default hair for the sprite.

  this.generateSprite();
}

/**
  Setter for SpriteGenerator.outfit.
  @param outfit The new sprite outfit.
**/
SpriteGenerator.prototype.setClothes = function(outfit) {
  this.outfit = outfit;
}

/**
  Setter for SpriteGenerator.hair.
  @param hair The new sprite hair style.
**/
SpriteGenerator.prototype.setHairLength = function(hair) {
  this.hair = hair;
}

/**
  Called to generate the sprite from relevant data.
**/
SpriteGenerator.prototype.generateSprite = function() {
  // Get image data from sprite-data.js.
  var outfitImageData = spriteData[this.outfit] || spriteData["dress"];
  var hairImageData = spriteData[this.hair] || spriteData["hair-3"];

  // Create our new image data object.
  var imageData = this.context.createImageData(23 * 4, 29 * 4);

  for (var i = 0; i < hairImageData.length; i += 4) {
    var hairA = hairImageData[i + 3];

    // If the hair pixel is transparent, use the outfit pixel.
    if (hairA == 0) {
      imageData.data[i] = outfitImageData[i];
      imageData.data[i + 1] = outfitImageData[i + 1];
      imageData.data[i + 2] = outfitImageData[i + 2];
      imageData.data[i + 3] = outfitImageData[i + 3];
    // If the hair pixel is present, use the hair pixel.
    } else {
      imageData.data[i] = hairImageData[i];
      imageData.data[i + 1] = hairImageData[i + 1];
      imageData.data[i + 2] = hairImageData[i + 2];
      imageData.data[i + 3] = hairA;
    }
  }

  // Create a canvas to draw our new imageData to.
  var manipCanvas = document.createElement("canvas");
  var manipContext = manipCanvas.getContext("2d");
  manipContext.putImageData(imageData, 0, 0);

  // Clear the display context and draw generated sprite.
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.context.imageSmoothingEnabled = false;
  this.context.drawImage(manipCanvas, 0, 0);
}