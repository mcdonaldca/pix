/**
  Extension of Avatar for the player.
**/
function Player() {
  $.extend(this, new Avatar($("#avatar"), $("#reaction"), $("#sprite")));
  this.wallet = 2000;

  this.isCat = false; // Is the sprite a cat.
}

/**
  Easter egg to become a cat (or reverse).
**/
Avatar.prototype.becomeCat = function() {
  this.spriteEl.css(
    "background-image", 
    this.isCat ? "url(" + this.spriteImageURL + ")" : "url(img/pets/black-cat.svg)"
    );
  this.isCat = !this.isCat;
}