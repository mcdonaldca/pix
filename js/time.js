/**
  The Time object keeps track of the time and date in the game.
**/
function Time() {
  this.active = false;       // If time is currently passing.
  this.interval = undefined; // The time interval.
  this.time = 0;             // The current time elapsed (in milliseconds).
  this.statusEl = $("#status");

  this.hour = 4; // Current hour.
  this.hourTenthEl = $("#status .hour-tenth"); // Tenths place of the hour.
  this.hourSingleEl = $("#status .hour-single"); // Ones place of the hour.
  this.minute = 0; // Current minute.
  this.minuteTenthEl = $("#status .minute-tenth"); // Tenths place of the minute.
  this.timeOfDay = "PM"; // Current time of day.
  this.timeOfDayEl = $("#status .time-of-day"); // AM/PM element.

  this.day = 30;
  this.dayTenthEl = $("#status .day-tenth"); // Tenths place of the hour.
  this.daySingleEl = $("#status .day-single"); // Ones place of the hour.
  this.seasons = ["SP", "SU", "AU", "WI"];
  this.seasonEl = $("#status .season");
  this.season = 3;

  // Number of days passed in the game.
  this.daysPassed = 0;
  this.weekday = 0;
  this.weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  this.weekdayEl = $("#status .weekday");

  // Set the time to begin with and start the timer.
  this.setTime(
    this.daysPassed,
    this.hour, 
    this.minute, 
    this.timeOfDay
    );

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
        time.inc();
      }
    }
  }
}

/**
  Called to increment the day's time.
**/
Time.prototype.inc = function() {
  this.minute += 10;
  // If we've hit an hour.
  if (this.minute == 60) {
    this.minute = 0;
    this.hour += 1;

    // If we're changing times of day.
    if (this.hour == 12) {
      this.timeOfDay == "AM" ?
        this.timeOfDay = "PM" :
        this.timeOfDay = "AM";

      this.timeOfDayEl.css(
        "background-position", 
        this.timeOfDay == "AM" ?
          "0 0" :
          "0 -" + (8 * MULT).toString() + "px"
        );

      // If it's a new day.
      if (this.timeOfDay == "AM") {
        this.day += 1;
        this.daysPassed += 1;

        // If it's a new season.
        if (this.day == 31) {
          this.day = 1;
          this.season = (this.season + 1) % 4;
          this.setSeason(this.season);
        }
        this.setNumber(this.dayTenthEl, Math.floor(this.day / 10));
        this.setNumber(this.daySingleEl, this.day % 10);
      }

    // Flip hour 13 to 1 o'clock.
    } else if (this.hour == 13) {
      this.hour = 1;
    }

    // Set the new hour time.
    this.setNumber(this.hourTenthEl, Math.floor(this.hour / 10));
    this.setNumber(this.hourSingleEl, this.hour % 10);
  }

  // Set the new minute time.
  this.setNumber(this.minuteTenthEl, Math.floor(this.minute / 10));
}

/**
  Called to adjust a displayed number.
  @param numberEl The number element to adjust.
  @param value    The new value to display.
**/
Time.prototype.setNumber = function(numberEl, value) {
  var offset = value * 8 * MULT;
  numberEl.css("background-position", "0 -" + offset.toString() + "px");
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
  Sets the current time of the game.
  @param hour      The new hour.
  @param minute    The new minute.
  @param timeOfDay The new time of day.
**/
Time.prototype.setTime = function(daysPassed, hour, minute, timeOfDay) {
  this.daysPassed = daysPassed;
  this.weekday = daysPassed % 7;
  this.season = Math.floor(daysPassed / 30) % 4;
  this.day = (daysPassed % 30) + 1;
  this.hour = hour;
  this.minute = minute;
  this.timeOfDay = timeOfDay;

  this.setSeason(this.season);
  this.setWeekday(this.weekday);
  this.setNumber(this.dayTenthEl, Math.floor(this.day / 10));
  this.setNumber(this.daySingleEl, this.day % 10);
  this.setNumber(this.hourTenthEl, Math.floor(this.hour / 10));
  this.setNumber(this.hourSingleEl, this.hour % 10);
  this.setNumber(this.minuteTenthEl, Math.floor(this.minute / 10));
  this.timeOfDayEl.css(
    "background-position", 
    this.timeOfDay == "AM" ?
      "0 0" :
      "0 -" + (8 * MULT).toString() + "px"
    );
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
  Function called when the player goes to sleep.
**/
Time.prototype.sleep = function() {
  /* Guide:
  Note: user is forced to sleep @ 4am (passes out).
  4:10AM  -  7PM: Wake up at 6AM the next morning.
  7:10PM  - 12AM: Wake up at 8AM the next morning.
  12:10AM -  4AM: Wake up at 10AM the next morning.
  */

  var sleepTiming = "early";

  // Sleep between early cutoff and normal cutoff.
  // 7:10PM or later
  // Any PM time with hours 8 - 11
  // 12:00AM
  if ((this.hour == 7 && this.minute >= 10 && this.timeOfDay == "PM")
   || (this.hour >= 8 && this.hour <= 11 && this.timeOfDay == "PM")
   || (this.hour == 12 && this.minute == 0 && this.timeOfDay == "AM")) {
    sleepTiming = "normal";
  // Sleep after late cutoff and before passing out.
  // 12:10AM or later
  // Any AM time with hours 1 - 3
  // 4:00AM
  } else if ((this.hour == 12 && this.minute >= 10 && this.timeOfDay == "AM")
          || (this.hour >= 1 && this.hour <= 3 && this.timeOfDay == "AM")
          || (this.hour == 4 && this.minute == 0 && this.timeOfDay == "AM")) {
    sleepTiming = "late";
  }

  // Find the scheduled events.
  var scheduledSeason = this.season;
  var scheduledDay = this.day;

  if ((sleepTiming == "early" || sleepTiming == "normal") && 
      !(this.hour == 12 && this.minute == 0 && this.timeOfDay == "AM")) {
    this.day += 1;
    this.daysPassed += 1;
    scheduledDay = this.day;
    if (this.day == 31) {
      this.day = 1;
      scheduledDay = this.day;
      this.season = (season + 1) % 4;
      scheduledSeason = this.season;
    }
  }

  // Check for scheduled events.
  if (this.scheduled[scheduledSeason] != undefined 
   && this.scheduled[scheduledSeason][scheduledDay] != undefined) {
    for (var i = 0; i < this.scheduled[scheduledSeason][scheduledDay].length; i++) {
      this.scheduled[scheduledSeason][scheduledDay][i]();
    }
  }

  // Find the hour to set.
  var setHour = 6;
  if (sleepTiming == "normal") {
    setHour = 8;
  } else if (sleepTiming == "late") {
    setHour = 10;
  }
  this.setTime(this.daysPassed, setHour, 0, "AM");
}