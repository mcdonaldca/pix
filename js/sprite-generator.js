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

  this.outfit = "dress";        // Default outfit.
  this.hair = "hair-3";         // Default hair style.
  this.hairColor = "chocolate"; // Default hair color.
  this.skinTome = "pale";       // Default skin tone.

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
  var outfitImageData = spriteData.imageData[this.outfit] || spriteData.imageData["dress"];
  var hairImageData = spriteData.imageData[this.hair] || spriteData.imageData["hair-3"];
  var hairColorData = spriteData.hairColors[this.hairColor] || spriteData.hairColors.chocolate;
  var skinToneData = spriteData.skinTones[this.skinTone] || spriteData.skinTones.pale;

  // Create our new image data object.
  var imageData = this.context.createImageData(23 * 4, 29 * 4);

  for (var i = 0; i < hairImageData.length; i += 4) {
    var hairA = hairImageData[i + 3];
    var outfitA = outfitImageData[i + 3];

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

      imageData.data[i + 3] = hairA;

    // Empty pixel.
    } else {
      imageData.data[i + 3] = 0;
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

/**
  Determines what type of hair pixel it is (light, medium, dark).
  @param r The pixel r value.
  @param g The pixel g value.
  @param b The pixel b value.
  @returns The pixel type or "black" if none.
**/
SpriteGenerator.prototype.getHairColorType = function(r, g, b) {
  var light = spriteData.hairColors.chocolate.light;
  var med = spriteData.hairColors.chocolate.med;
  var dark = spriteData.hairColors.chocolate.dark;

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
  var shine = spriteData.skinTones.pale.shine;
  var light = spriteData.skinTones.pale.light;
  var ear = spriteData.skinTones.pale.ear;
  var med = spriteData.skinTones.pale.med;
  var dark = spriteData.skinTones.pale.dark;

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