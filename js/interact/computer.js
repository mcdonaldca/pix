/**
  Computer object.
**/
function Computer() {}

Computer.prototype.interact = function() {
  game.displayScreen("email");
  this.open = true;
  return 'focused';
};