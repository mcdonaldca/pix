/**
  An NPC is an Interactable with a name and directional sprite.
  @param name   The name of the NPC.
  @param sprite The url for the sprite image.
  @param shadow The url for the shadow, if any.
**/
function NPC(name, sprite, shadow) {
  // Use name provided or random string instead.
  this.name = name || Math.random().toString(36).substring(7);
  $.extend(this, new Avatar(false, this.name, sprite, shadow));
  this.class = 'NPC';

  this.count = 0;
  this.talkedTo = false; // Tracks if the character has been spoken to.

  // Schedule related values.
  this.SCHEDULE = {};
  this.SCHEDULE_STATUSES = {};
  this.SCHEDULE_TRAVEL = {};
  this.scheduleStatus = 0;

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
    for (var time = 0; time < 24; time++) {
      scheduleData[day][time] = 0;
    }
  }

  if (this.SCHEDULE.everyday) this.generateDailySchedule(scheduleData, [0, 1, 2, 3, 4, 5, 6], this.SCHEDULE.everyday)
  if (this.SCHEDULE.weekday)  this.generateDailySchedule(scheduleData, [1, 2, 3, 4, 5], this.SCHEDULE.weekday);
  if (this.SCHEDULE.weekend)  this.generateDailySchedule(scheduleData, [0, 6], this.SCHEDULE.weekend);

  game.time.augmentNPCSchedule(this.name, scheduleData);
}

/**
  Generate a schedule for the specified days with the schedule parameters.
  @param scheduleObject The object to add schedule values to.
  @param dayList        The list of days to generate a schedule for.
  @param scheduleList   The specification for the days' schedule.
**/
NPC.prototype.generateDailySchedule = function(scheduleObject, dayList, scheduleList) {
  for (var dayIndex = 0; dayIndex < dayList.length; dayIndex++) {
    var day = dayList[dayIndex];
    var startTime = 0;
    for (var i = 1; i < scheduleList.length + 1; i++) {
      var changeTime;
      if (i == scheduleList.length) {
        changeTime = 24;
      } else {
        changeTime = scheduleList[i][0];
      }
      var newPosition = scheduleList[i - 1][1];
      for (var time = startTime; time < changeTime; time++) {
        scheduleObject[day][time] = newPosition;
      }
      startTime = changeTime;
    }
  }
}

/**
  Update the location/status of an NPC.
  @param newStatus  The new status the NPC should transition to.
  @param skipTravel If travel patterns should be ignored and NPC just placed.
**/
NPC.prototype.updateScheduleStatus = function(newStatus, skipTravel) {
  // Only update status if there is a valid new status 
  // and we're not already in that status.
  if (newStatus != 0 && this.scheduleStatus != newStatus) {
    var area = this.SCHEDULE_STATUSES[newStatus].area;
    var x = this.SCHEDULE_STATUSES[newStatus].x;
    var y = this.SCHEDULE_STATUSES[newStatus].y;
    var face = this.SCHEDULE_STATUSES[newStatus].face;
    var dir = this.SCHEDULE_STATUSES[newStatus].dir;

    if (this.currentLocation) {
      if (this.SCHEDULE_TRAVEL[this.currentLocation]) var travelDirections = this.SCHEDULE_TRAVEL[this.currentLocation][area];
    }

    if (travelDirections && !skipTravel) {
      travelDirections.start();
    } else {
      if(this.currentLocation) {
        game.areas[this.currentLocation].removeNPC(this.name);
      }
      game.areas[area].addNPC(x, y, face, this, dir);
      this.setPosition(x, y)
          .faceDir(face);
      this.currentLocation = area;
    }

    this.scheduleStatus = newStatus;
  }
}