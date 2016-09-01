/**
  The Time object keeps track of the time and date in the game.
**/
function Time() {
  this.active = false;       // If time is currently passing.
  this.interval = undefined; // The time interval.
  this.time = 0;             // The current time elapsed (in milliseconds).
  this.statusEl = $("#status");

  this.hour = 16; // Current hour.
  this.hourTenthEl = $("#status .hour-tenth"); // Tenths place of the hour.
  this.hourSingleEl = $("#status .hour-single"); // Ones place of the hour.
  this.minute = 0; // Current minute.
  this.minuteTenthEl = $("#status .minute-tenth"); // Tenths place of the minute.
  this.timeOfDayEl = $("#status .time-of-day"); // AM/PM element.

  this.day = 30;
  this.dayTenthEl = $("#status .day-tenth"); // Tenths place of the hour.
  this.daySingleEl = $("#status .day-single"); // Ones place of the hour.
  this.seasons = ["SP", "SU", "AU", "WI"];
  this.seasonEl = $("#status .season");
  this.season = 3;

  this.year = 0;

  // Number of days passed in the game.
  this.daysPassed = 0;
  this.weekday = 6;
  this.weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  this.weekdayEl = $("#status .weekday");

  // Set the time to begin with and start the timer.
  this.updateDisplay();

  // Scheduled events.
  this.scheduled = {};
}

/**
  Called to begin the timing interval.
**/
Time.prototype.begin = function() {
  this.interval = setInterval(this.tick(this), 100);
  this.statusEl.css("opacity", 1);
}

/**
  Pauses the time.
**/
Time.prototype.pauseTime = function() {
  this.active = false;
}

/**
  Continues the time.
**/
Time.prototype.startTime = function() {
  this.active = true;
}

/**
  Returns the function called every .1 seconds.
  @param time The time object.
  @return Function
**/
Time.prototype.tick = function(time) {
  return function() {
    // Only increase time if the timer should be active.
    if (time.active && game.status == "free") {
      time.time += 100;
      // Increment time every ten seconds.
      if (time.time % 10000 == 0) {
        time.incMin(10);
      }
    }
  }
}

/**
  Increases the minute value by some amount.
  @param inc The increase amount.
**/
Time.prototype.incMin = function(inc) {
  this.minute += inc;
  if (this.minute == 60) {
    this.minute = 0;
    this.incHour(1);
  } else {
    this.setTime(this.daysPassed, this.hour, this.minute);
  }
};

/**
  Increases the hour value by some amount.
  @param inc The increase amount.
**/
Time.prototype.incHour = function(inc) {
  this.hour += inc;

  if (this.hour > 23) {
    this.hour = this.hour % 24;
    this.incDay(1);
  } else {
    this.setTime(this.daysPassed, this.hour, this.minute);
  }

  this.updateNPClocations();
};

/**
  Increases the day value by some amount.
  @param inc The increase amount.
**/

Time.prototype.incDay = function(inc) {
  this.daysPassed += inc;
  this.setTime(this.daysPassed, this.hour, this.minute);
};

/**
  Sets the current time of the game.
  @param hour      The new hour.
  @param minute    The new minute.
  @param timeOfDay The new time of day.
**/
Time.prototype.setTime = function(daysPassed, hour, minute) {
  this.daysPassed = daysPassed;
  this.weekday = daysPassed % 7;
  this.year = Math.floor(daysPassed / 120);
  this.season = Math.floor(daysPassed / 30) % 4;
  this.day = (daysPassed % 30) + 1;
  this.hour = hour;
  this.minute = minute;

  if (game.area && 
      game.area.isLimited() && 
      game.area.isClosed(this.weekday, this.hour)
  ) {
    game.closeArea();
  }

  if (this.duskLevel() != 0) {
    game.updateDuskLevel();
  }

  this.updateDisplay();
}

/**
  Updates the time display.
  Converts the stored 24h time to am/pm.
**/
Time.prototype.updateDisplay = function() {
  this.setSeason(this.season);
  this.setWeekday(this.weekday);
  this.setNumber(this.dayTenthEl, Math.floor(this.day / 10));
  this.setNumber(this.daySingleEl, this.day % 10);

  var hourDisplay = this.hour % 12;
  if (hourDisplay == 0) hourDisplay = 12;

  this.setNumber(this.hourTenthEl, Math.floor(hourDisplay / 10), true);
  this.setNumber(this.hourSingleEl, hourDisplay % 10);
  this.setNumber(this.minuteTenthEl, Math.floor(this.minute / 10));
  this.timeOfDayEl.css(
    "background-position", 
    this.hour < 12 ?
      "0 0" :
      "0 -" + (8 * MULT).toString() + "px"
    );
}

/**
  Called to adjust a displayed number.
  @param numberEl The number element to adjust.
  @param value    The new value to display.
  @param hour     Boolean, if it's an hour place.
**/
Time.prototype.setNumber = function(numberEl, value, hour) {
  if (!(hour && value == 0)) {
    var offset = (8 + value * 8) * MULT;
    numberEl.css("background-position", "0 -" + offset.toString() + "px");
  } else {
    numberEl.css("background-position", "0 0");
  }
}

/**
  Sets the displayed season.
  @param season The season to display.
**/
Time.prototype.setSeason = function(season) {
  var offset = season * 8 * MULT;
  this.seasonEl.css("background-position", "0 -" + offset.toString() + "px");
}

/**
  Sets the displayed day of the week.
  @param season The season to display.
**/
Time.prototype.setWeekday = function(season) {
  var offset = season * 8 * MULT;
  this.weekdayEl.css("background-position", "0 -" + offset.toString() + "px");
}

/**
  Schedule an event for the future.
  @param when     Keyword for when to schedule the event.
  @param callback The callback for the event.
**/
Time.prototype.scheduleEvent = function(when, callback) {
  switch(when) {
    case "tomorrow":
      var day = this.day;
      var season = this.season;
      day += 1;
      if (day == 31) {
        day = 1;
        season = (season + 1) % 4;
      }
      if (this.scheduled[season] == undefined) this.scheduled[season] = {};
      if (this.scheduled[season][day] == undefined) this.scheduled[season][day] = [];
      
      this.scheduled[season][day].push(callback);
      break;

    default:
      break;
  }
}

/**
  Returns 0, 1, or 2 for the level of dusk outside.
  @return Number
**/
Time.prototype.duskLevel = function() {
  if (this.hour <= 3) return 2;
  if (this.hour <= 5) return 1;
  if (this.hour >= 21) return 2;
  if (this.hour >= 19) return 1;
  return 0;
}

/**
  Function called when the player goes to sleep.
**/
Time.prototype.sleep = function() {
  /* Guide:
  Note: user is forced to sleep @ 4am (passes out).
  4:00AM  -  6:50PM: Wake up at 6AM the next morning.
  7:00PM  - 11:50PM: Wake up at 8AM the next morning.
  12:00AM -  3:50AM: Wake up at 10AM the next morning.
  */

  var sleepTiming = "early";

  if (this.hour >= 19) {
    sleepTiming = "normal";
  } else if (this.hour < 4) {
    sleepTiming = "late";
  }

  if (sleepTiming == "early" || sleepTiming == "normal") {
    this.incDay(1);
  }

  // Check for scheduled events.
  var scheduledSeason = this.season;
  var scheduledDay = this.day;
  if (this.scheduled[scheduledSeason] != undefined 
   && this.scheduled[scheduledSeason][scheduledDay] != undefined) {
    for (var i = 0; i < this.scheduled[scheduledSeason][scheduledDay].length; i++) {
      this.scheduled[scheduledSeason][scheduledDay][i]();
    }
  }

  var setHour = 6;
  if (sleepTiming == "normal") {
    setHour = 8;
  } else if (sleepTiming == "late") {
    setHour = 10;
  }
  this.setTime(this.daysPassed, setHour, 0);
}

/**
  Function called when the player goes to work.
  @param closeHour (Optional) The hour works closes.
**/
Time.prototype.work = function(closeHour) {
  // If the workplace is closed 4 hours from now.
  if (this.hour + 4 >= closeHour) {
    var hours = closeHour - this.hour;
    if (this.minute == 0) {
      this.incHour(hours);
      this.updateDisplay();
      return hours;
    } else {
      var minutes = 60 - this.minute;
      hours -= 1;
      this.incHour(hours);
      this.incMin(minutes);
      this.updateDisplay();
      return hours + (minutes / 60);
    }
  } else {
    this.incHour(4);
    this.updateDisplay();
    return 4;
  }
};

/**
  Called to find the general time of day.
  @return String, time of day.
**/
Time.prototype.timeOfDay = function() {
  if (this.hour < 4) return "evening";
  if (this.hour < 12) return "morning";
  if (this.hour < 17) return "afternoon";
  if (this.hour <= 23) return "evening";
}

/**
  @return String, date in DD-SS-YY format
**/
Time.prototype.today = function() {
  return String(this.day) + "-" + this.seasons[this.season] + "-" + String(this.year);
}

/**
  Updates the locations of NPCs who will move.
**/
Time.prototype.updateNPClocations = function() {
  for (npc in game.NPCs) {
    var character = game.NPCs[npc]
    if (character.schedule) {
      if (character.schedule["weekday"]) {
        if (character.schedule["weekday"][this.hour]) {
          var areaChange = character.schedule["weekday"][this.hour].area;
          var x = character.schedule["weekday"][this.hour].x;
          var y = character.schedule["weekday"][this.hour].y;
          var face = character.schedule["weekday"][this.hour].face;
          var dir = character.schedule["weekday"][this.hour].dir;
          if(character.currentLocation) {
            game.areas[character.currentLocation].removeNPC(character.name);
          }
          game.areas[areaChange].addNPC(x, y, face, character, dir);
          character.updateLocation(areaChange);
        }
      }
    }
  }
};