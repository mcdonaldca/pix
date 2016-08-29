/**
  Extension of Avatar for the player.
**/
function Player() {
  $.extend(this, new Avatar(true));
  this.wallet = new Wallet();
  this.karma = new Karma();

  this.isCat = false; // Is the sprite a cat.
  this.job = "unemployed"; // Players current job.
  this.salary = 0;

  this.hoursWorked = {};

  this.libraryAccess = false;
}

/**
  Easter egg to become a cat (or reverse).
**/
Player.prototype.becomeCat = function() {
  this.spriteEl.css(
    "background-image", 
    this.isCat ? "url(img/characters/adele.svg)" : "url(img/pets/black-cat.svg)"
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
  Setter for Player.job and Player.salary
  @param job    The new job.
  @param salary The job's hourly pay.
**/
Player.prototype.employ = function(job, salary) {
  this.job = job;
  this.salary = salary;

  this.hoursWorked[this.job] = {};
  this.hoursWorked[this.job].start = [game.time.day, game.time.season, game.time.year];
  this.hoursWorked[this.job].hours = 0;
};

/**
  Called when the player works some number of hours.
  @param hours The number of hours worked.
**/
Player.prototype.work = function(hours) {
  this.wallet.add(Math.floor(hours * this.salary));
  this.hoursWorked[this.job].hours += hours;
}

/**
  Called to give the player a library card.
**/
Player.prototype.getLibraryCard = function() {
  this.libraryAccess = true;
}

/**
  Getter for Player.libraryAccess
  @return Boolean
**/
Player.prototype.hasLibraryCard = function() {
  return this.libraryAccess;
};