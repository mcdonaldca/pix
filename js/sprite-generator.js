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

  this.outfit = "outfit-1";     // Default outfit.
  this.hair = "hair-3";         // Default hair style.
  this.hairColor = "chocolate"; // Default hair color.
  this.skinTone = "pale";       // Default skin tone.

  this.SPRITE_SHEET_WIDTH = 23 * 4;
  this.SPRITE_SHEET_HEIGHT = 29 * 4;

  this.generateSprite();
}

/**
  Setter for SpriteGenerator.outfit.
  @param outfit The new sprite outfit.
**/
SpriteGenerator.prototype.setOutfit = function(outfit) {
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
  Setter for SpriteGenerator.hairColor.
  @param hair The new sprite hair color.
**/
SpriteGenerator.prototype.setHairColor = function(color) {
  this.hairColor = color;
}

/**
  Setter for SpriteGenerator.skinTone.
  @param hair The new sprite skin tone.
**/
SpriteGenerator.prototype.setSkinTone = function(tone) {
  this.skinTone = tone;
}

/**
  Called to generate the sprite from relevant data.
**/
SpriteGenerator.prototype.generateSprite = function() {
  // Get image data from sprite-data.js.
  var outfitImageData = SPRITE_DATA.imageData[this.outfit] || SPRITE_DATA.imageData["dress"];
  var hairImageData = SPRITE_DATA.imageData[this.hair] || SPRITE_DATA.imageData["hair-3"];
  var hairColorData = SPRITE_DATA.hairColors[this.hairColor] || SPRITE_DATA.hairColors.chocolate;
  var skinToneData = SPRITE_DATA.skinTones[this.skinTone] || SPRITE_DATA.skinTones.pale;

  // Create our new image data object.
  var imageData = this.context.createImageData(this.SPRITE_SHEET_WIDTH, this.SPRITE_SHEET_HEIGHT);

  for (var i = 0; i < hairImageData.length; i += 4) {
    var hairA = hairImageData[i + 3];
    var outfitA = outfitImageData[i + 3];

    var y = Math.floor((i / 4) / this.SPRITE_SHEET_WIDTH);
    var x = (i / 4) - (y * this.SPRITE_SHEET_WIDTH);

    // If this is a special exception pixel.
    if (hairColorData.exceptions != undefined
     && y in hairColorData.exceptions
     && x in hairColorData.exceptions[y]) {
      var type = hairColorData.exceptions[y][x];
      imageData.data[i] = hairColorData[type].r;
      imageData.data[i + 1] = hairColorData[type].g;
      imageData.data[i + 2] = hairColorData[type].b;
      imageData.data[i + 3] = 255;

    } else {
      // If the hair pixel is transparent & the outfit pixel isn't.
      // Basically don't want to do work if it's an unused pixel.
      if (hairA == 0 && outfitA != 0) {
        var outfitR = outfitImageData[i];
        var outfitG = outfitImageData[i + 1];
        var outfitB = outfitImageData[i + 2];
        var type = this.getSkinToneType(outfitR, outfitG, outfitB);

        // If the skin matches the default (so draw unaltered data)
        // or the pixel isn't a skin pixel and should be unaltered.
        if (this.skinTone == "pale" || type == null) {
          imageData.data[i] = outfitR;
          imageData.data[i + 1] = outfitG;
          imageData.data[i + 2] = outfitB;

        // Draw the correct skin type.
        } else {
          imageData.data[i] = skinToneData[type].r;
          imageData.data[i + 1] = skinToneData[type].g;
          imageData.data[i + 2] = skinToneData[type].b;
        }

        // Set pixel to an opaque alpha value.
        imageData.data[i + 3] = 255;

      // If the hair pixel is present, use the hair pixel.
      } else if (hairA != 0) {
        var hairR = hairImageData[i];
        var hairG = hairImageData[i + 1];
        var hairB = hairImageData[i + 2];

        // If the sprite matches all the defaults.
        if (this.hairColor == "chocolate" && this.skinTone == "pale") {
          imageData.data[i] = hairR;
          imageData.data[i + 1] = hairG;
          imageData.data[i + 2] = hairB;

        // Custom skin + hair updates needed.
        } else {
          // If this hairstyle has an exception at this pixel.
          if (hairColorData.exceptions != undefined
           && hairColorData.exceptions[this.hair] != undefined
           && y in hairColorData.exceptions[this.hair]
           && x in hairColorData.exceptions[this.hair][y]) {
            var color = hairColorData.exceptions[this.hair][y][x];
            imageData.data[i] = hairColorData[color].r;
            imageData.data[i + 1] = hairColorData[color].g;
            imageData.data[i + 2] = hairColorData[color].b;
          } else {
            var type = this.getHairColorType(hairR, hairG, hairB);
            // If the pixel is not a hair specific pixel.
            if (type == "black") {
              type = this.getSkinToneType(hairR, hairG, hairB);

              // Just a #010101 pixel.
              if (type == null) {
                imageData.data[i] = 1;
                imageData.data[i + 1] = 1;
                imageData.data[i + 2] = 1;
              // Customize skin pixel.
              } else {
                imageData.data[i] = skinToneData[type].r;
                imageData.data[i + 1] = skinToneData[type].g;
                imageData.data[i + 2] = skinToneData[type].b;
              }
            // Customize hair pixel.
            } else {
              imageData.data[i] = hairColorData[type].r;
              imageData.data[i + 1] = hairColorData[type].g;
              imageData.data[i + 2] = hairColorData[type].b;
            }
          }
        }

        imageData.data[i + 3] = hairA;

      // Empty pixel.
      } else {
        imageData.data[i + 3] = 0;
      }
    }
  }

  // Create a canvas to draw our new imageData to.
  var manipCanvas = document.createElement("canvas");
  var manipContext = manipCanvas.getContext("2d");
  manipContext.putImageData(imageData, 0, 0);

  // Clear the display context and draw generated sprite.
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.context.mozImageSmoothingEnabled = false;
  this.context.msImageSmoothingEnabled = false;
  this.context.imageSmoothingEnabled = false;
  this.context.drawImage(manipCanvas, 0, 0);
}

/**
  Determines what type of hair pixel it is (light, medium, dark).
  @param r The pixel r value.
  @param g The pixel g value.
  @param b The pixel b value.
  @returns The pixel type or "black" if none.
**/
SpriteGenerator.prototype.getHairColorType = function(r, g, b) {
  var light = SPRITE_DATA.hairColors.chocolate.light;
  var med = SPRITE_DATA.hairColors.chocolate.med;
  var dark = SPRITE_DATA.hairColors.chocolate.dark;

  if (r == med.r && g == med.g && b == med.b) {
    return "med";
  } else if (r == dark.r && g == dark.g && b == dark.b) {
    return "dark";
  } else if (r == light.r && g == light.g && b == light.b) {
    return "light";
  } else {
    return "black";
  }
}

/**
  Determines what type of hair pixel it is (shine, light, ear, med, dark).
  @param r The pixel r value.
  @param g The pixel g value.
  @param b The pixel b value.
  @returns The pixel type or null if none.
**/
SpriteGenerator.prototype.getSkinToneType = function(r, g, b) {
  var shine = SPRITE_DATA.skinTones.pale.shine;
  var light = SPRITE_DATA.skinTones.pale.light;
  var ear = SPRITE_DATA.skinTones.pale.ear;
  var med = SPRITE_DATA.skinTones.pale.med;
  var dark = SPRITE_DATA.skinTones.pale.dark;

  if (r == light.r && g == light.g && b == light.b) {
    return "light";
  } else if (r == med.r && g == med.g && b == med.b) {
    return "med";
  } else if (r == dark.r && g == dark.g && b == dark.b) {
    return "dark";
  } else if (r == shine.r && g == shine.g && b == shine.b) {
    return "shine";
  } else if (r == ear.r && g == ear.g && b == ear.b) {
    return "ear";
  } else {
    return null;
  }
}

/**
  Returns the dataURL of the generated sprite.
**/
SpriteGenerator.prototype.getDataURL = function() {
  return this.canvas.toDataURL();
}