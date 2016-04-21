/**
  Extension of Avatar for the player.
**/
function Player() {
  $.extend(this, new Avatar($("#avatar"), $("#reaction"), $("#sprite")));
  this.wallet = new Wallet();

  this.isCat = false; // Is the sprite a cat.
  this.job = "unemployed"; // Players current job.
}

/**
  Easter egg to become a cat (or reverse).
**/
Player.prototype.becomeCat = function() {
  this.spriteEl.css(
    "background-image", 
    this.isCat ? "url(" + this.spriteImageURL + ")" : "url(img/pets/black-cat.svg)"
    );
  this.isCat = !this.isCat;
}

/**
  Getter for Player.job
  @return String, player's job.
**/
Player.prototype.getJob = function() {
  return this.job;
};

/**
  Setter for Player.jon
  @param The new job.
**/
Player.prototype.employ = function(job) {
  this.job = job;
};