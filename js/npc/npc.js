/**
  An NPC is an Interactable with a name and directional sprite.
  @param name   The name of the NPC.
  @param sprite The url for the sprite image.
  @param shadow The url for the shadow, if any.
**/
function NPC(name, sprite, shadow, schedule) {
  // Use name provided or random string instead.
  this.name = name || Math.random().toString(36).substring(7);
  $.extend(this, new Avatar(false, this.name, sprite, shadow));
  this.class = 'NPC';

  this.count = 0;
  this.talkedTo = false; // Tracks if the character has been spoken to.

  // Schedule related values.
  schedule = schedule || {};
  this.SCHEDULE = schedule.skeleton;
  this.SCHEDULE_STATUSES = schedule.statuses;
  this.SCHEDULE_TRAVEL = schedule.travel;
  this.scheduleStatus = 0;
  this.buildNPCSchedule();

  // Set in NPC.updateScheduleStatus
  this.currentLocation = undefined;
}

/**
  Pass control to the prompt.
**/
NPC.prototype.arrowUp = function() { game.prompt.arrowUp(); }
NPC.prototype.arrowDown = function() { game.prompt.arrowDown(); }

/**
  Builds the NPCs schedule.
**/
NPC.prototype.buildNPCSchedule = function() {
  var scheduleData = {};
  for (var day = 0; day < 7; day++) {
    scheduleData[day] = {};
    for (var hour = 0; hour < 24; hour++) {
      scheduleData[day][hour] = {};
      for (var min = 0; min < 60; min += 10) {
        scheduleData[day][hour][min] = 0;
      }
    }
  }

  if (this.SCHEDULE) {
    if (this.SCHEDULE.everyday) this.generateDailySchedule(scheduleData, [0, 1, 2, 3, 4, 5, 6], this.SCHEDULE.everyday)
    if (this.SCHEDULE.weekday)  this.generateDailySchedule(scheduleData, [1, 2, 3, 4, 5], this.SCHEDULE.weekday);
    if (this.SCHEDULE.weekend)  this.generateDailySchedule(scheduleData, [0, 6], this.SCHEDULE.weekend);
    if (this.SCHEDULE.wednesday)  this.generateDailySchedule(scheduleData, [3], this.SCHEDULE.wednesday);
  }

  this.scheduleData = scheduleData;
}

/**
  Generate a schedule for the specified days with the schedule parameters.
  @param scheduleObject The object to add schedule values to.
  @param dayList        The list of days to generate a schedule for.
  @param scheduleList   The specification for the days' schedule.
**/
NPC.prototype.generateDailySchedule = function(scheduleObject, dayList, scheduleList) {
  // Build a schedule for each day in the day list.
  for (var dayIndex = 0; dayIndex < dayList.length; dayIndex++) {
    var day = dayList[dayIndex];

    // Initialize time values.
    var startHour = 0;
    var changeHour = 0;
    var changeMin = 0;

    // Iterate through schedule specifications.
    for (var i = 1; i < scheduleList.length + 1; i++) {
      // Grab position value from previous spec.
      var newPosition = scheduleList[i - 1][0];

      // Finish out previous hour (if there was a minute specified)
      for (var min = changeMin; min < 60; min += 10) {
        scheduleObject[day][changeHour][min] = newPosition;
      }

      // If we're past the end of the list, the final hour should be the end of the day.
      if (i == scheduleList.length) {
        changeHour = 23;
      } else {
        changeHour = scheduleList[i][1];
      }
      // Iterate through intermediate hours and set position.
      for (var hour = startHour + 1; hour < changeHour; hour++) {
        for (var min = 0; min < 60; min += 10) {
          scheduleObject[day][hour][min] = newPosition;
        }
      }

      // If we're past the end of the list, the final hour should be the last minute.
      if (i == scheduleList.length) {
        changeMin = 60;
      } else {
        changeMin = scheduleList[i][2];
      }
      for (var min = 0; min < changeMin; min += 10) {
        scheduleObject[day][changeHour][min] = newPosition;
      }

      // Next round should start from the hour we ended on.
      startHour = changeHour;
    }
  }
}

/**
  Update the location/status of an NPC.
  @param newStatus  The new status the NPC should transition to.
  @param skipTravel If travel patterns should be ignored and NPC just placed.
  @param forcePlace Place the NPC even if that's they're current status.
**/
NPC.prototype.updateScheduleStatus = function(newStatus, skipTravel, forcePlace) {
  // Only update status if there is a valid new status 
  // and we're not already in that status.
  if (forcePlace || (newStatus != 0 && this.scheduleStatus != newStatus)) {
    var area = this.SCHEDULE_STATUSES[newStatus].area;
    var x = this.SCHEDULE_STATUSES[newStatus].x;
    var y = this.SCHEDULE_STATUSES[newStatus].y;
    var face = this.SCHEDULE_STATUSES[newStatus].face;

    var travelDirections = undefined;
    // When game initially starts, no locations are set.
    if (this.currentLocation &&
        this.SCHEDULE_TRAVEL &&
        this.SCHEDULE_TRAVEL[this.currentLocation]) {
      travelDirections = this.SCHEDULE_TRAVEL[this.currentLocation][area];
    }

    if (travelDirections && !skipTravel) {
      travelDirections.start();
    } else {
      if(this.currentLocation) {
        game.world.getArea(this.currentLocation).removeNPC(this);
      }
      game.world.getArea(area).addNPC(this);
      if (this.currentLocation != area) {
        var previousLocation = this.currentLocation;
        this.currentLocation = area;
        this.setPosition(x, y, true, previousLocation)
            .faceDir(face);
      } else {
        this.setPosition(x, y)
            .faceDir(face);
      }
    }

    this.scheduleStatus = newStatus;
  }
}