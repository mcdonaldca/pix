/**
  Object to track user's interaction with the world and NPCs.
**/
function Karma() {
  this.class = 'Karma';

  this.status = { karma: 0 };
  this.history = {};
};



/**
  Called to update a specific karma level.
  @param key The karma level to update.
  @param change The amount to change the level by.
  @param logMessage The log associated with the change.
**/
Karma.prototype.update = function(key, change, logMessage, today) {
  if (!this.status[key]) {
    this.status[key] = 0;
  }

  this.status[key] += change;
  this.log(logMessage, today);
};



/**
  Called to log an event of some kind.
  @param logMessage The log associated with the event.
  @param today      The day associated with the message.
**/
Karma.prototype.log = function(logMessage, today) {
  if (!this.history[today]) {
    this.history[today] = [];
  }

  this.history[today].push(logMessage);
};