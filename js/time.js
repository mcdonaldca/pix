/**
  The Time object keeps track of the time and date in the game.
**/
function Time() {
  this.active = false;       // If time is currently passing.
  this.interval = undefined; // The time interval.
  this.time = 0;             // The current time elapsed (in milliseconds).

  this.hour = 6; // Current hour.
  this.hourTenthEl = $("#status .hour-tenth"); // Tenths place of the hour.
  this.hourSingleEl = $("#status .hour-single"); // Ones place of the hour.
  this.minute = 30; // Current minute.
  this.minuteTenthEl = $("#status .minute-tenth"); // Tenths place of the minute.
  this.timeOfDay = "AM"; // Current time of day.
  this.timeOfDayEl = $("#status .time-of-day"); // AM/PM element.

  // Set the time to begin with and start the timer.
  this.setTime(this.hour, this.minute, this.timeOfDay);
  this.startTime();
  this.begin();
}

/**
  Called to begin the timing interval.
**/
Time.prototype.begin = function() {
  this.interval = setInterval(this.tick(this), 100);
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
    if (time.active) {
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
        this.timeOfDay == "PM" :
        this.timeOfDay == "AM";

      this.timeOfDayEl.css(
        "background-position", 
        this.timeOfDay == "AM" ?
          "0 0" :
          "0 -" + (8 * MULT).toString() + "px"
        );

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
  Sets the current time of the game.
  @param hour      The new hour.
  @param minute    The new minute.
  @param timeOfDay The new time of day.
**/
Time.prototype.setTime = function(hour, minute, timeOfDay) {
  this.hour = hour;
  this.minute = minute;
  this.timeOfDay = timeOfDay;

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