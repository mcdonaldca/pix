function Holland() {
  $.extend(this, new NPC("holland"));
  this.avatar = $("#holland");

  this.talkedTo = false;
}

Holland.prototype.interact = function(dir) {
  this.talkedTo = true;
  var status = "convo"

  switch(this.count) {
    case 0:
      if (dir == "rt") {
        this.avatar.css("background-position", "0 " + (-87 * this.MULT).toString() + "px");
      } else if (dir == "lf") {
        this.avatar.css("background-position", "0 " + (-29 * this.MULT).toString() + "px");
      }

      this.messages.show();
      this.displayMessage("Seems like you're running late today, Adele!");
      break;

    case 1:
      this.displayMessage("");
      this.messages.hide();

      this.avatar.css("background-position", "0 0");
      this.count = -1;
      status = "free";
      break;

    default:
      break;
  }

  this.count += 1;
  return status;
}