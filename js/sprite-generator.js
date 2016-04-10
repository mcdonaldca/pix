function SpriteGenerator(canvas) {
  this.canvas = canvas;
  this.context = this.canvas.getContext("2d");
  this.context.scale(2 * MULT, 2 * MULT);
  this.outfit = "dress";
  this.hair = "hair-3";

  this.generateSprite();
}

SpriteGenerator.prototype.setClothes = function(outfit) {
  this.outfit = outfit;
}

SpriteGenerator.prototype.setHairLength = function(hair) {
  this.hair = hair;
}

SpriteGenerate.prototype.setHairColor = function(color) {

}

SpriteGenerator.prototype.generateSprite = function() {
  var outfitImage = new Image();
  var manipCanvas = document.createElement("canvas");
  manipCanvas.width = 23 * 4;
  manipCanvas.height = 29 * 4;
  var manipContext = manipCanvas.getContext("2d");

  var sg = this;
  outfitImage.onload = function() {
    manipContext.imageSmoothingEnabled = false;
    manipContext.drawImage(outfitImage, 0, 0);
    var outfitImageData = manipContext.getImageData(0, 0, 23 * 4, 29 * 4);
    manipContext.clearRect(0, 0, 23 * 4, 29 * 4);

    var hairImage = new Image();

    hairImage.onload = function() {
      manipContext.imageSmoothingEnabled = false;
      manipContext.drawImage(hairImage, 0, 0);
      var hairImageData = manipContext.getImageData(0, 0, 23 * 4, 29 * 4);
      manipContext.clearRect(0, 0, 23 * 4, 29 * 4);

      for (var i = 0; i < hairImageData.data.length; i += 4) {
        var hairA = hairImageData.data[i + 3];

        if (hairA == 0) {
          hairImageData.data[i] = outfitImageData.data[i];
          hairImageData.data[i + 1] = outfitImageData.data[i + 1];
          hairImageData.data[i + 2] = outfitImageData.data[i + 2];
          hairImageData.data[i + 3] = outfitImageData.data[i + 3];
        }
      }

      manipContext.putImageData(hairImageData, 0, 0);
      sg.context.clearRect(0, 0, sg.canvas.width, sg.canvas.height);
      sg.context.imageSmoothingEnabled = false;
      sg.context.drawImage(manipCanvas, 0, 0);
    }

    hairImage.src = "img/player/" + sg.hair + ".png";
  }

  outfitImage.src = "img/player/" + this.outfit + ".png";
}