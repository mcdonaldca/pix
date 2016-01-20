function Liam() {
  $.extend(this, new NPC("liam"));
  this.avatar = $("#liam");

  this.talkedTo = false;
}

Liam.prototype.interact = function(dir) {
  this.talkedTo = true;
  var status = "convo"

  switch(this.count) {
    case 0:
      if (dir == "rt") {
        this.avatar.css("background-image", "url(img/characters/liam_left.svg)");
      }

      this.messages.show();
      this.display_message("Good morning, sleepyhead!");
      break;

    case 1:
      this.display_message("You better hurry to work, you're running kind of late, eh?");
      break;

    case 2:
      this.display_message("");
      this.messages.hide();

      this.avatar.css("background-image", "url(img/characters/liam_front.svg)");
      this.count = -1;
      status = "free";
      break;

    default:
      break;
  }

  this.count += 1;
  return status;
}