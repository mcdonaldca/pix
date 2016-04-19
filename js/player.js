/**
  Extension of Avatar for the player.
**/
function Player() {
  $.extend(this, new Avatar($("#avatar"), $("#reaction"), $("#sprite")));
  this.wallet = 2000;
}