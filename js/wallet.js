/**
  Object to manage player's funds.
**/
function Wallet() {
  this.class = 'Wallet';
  
  this.numbers = [
    $("#status .wallet-tho"),
    $("#status .wallet-hun"),
    $("#status .wallet-ten"),
    $("#status .wallet-sin")
  ];

  this.amount = 0;
  this.updateDisplay();
  this.numbers[3].css("background-position", "0 0");
};



/** 
  Update status display with wallet amount.
**/
Wallet.prototype.updateDisplay = function() {
  // User can't have more than 9999 in their wallet.
  var value = this.amount;
  var thousandths = Math.floor(value / 1000);
  value -= thousandths * 1000;
  var hundredths = Math.floor(value / 100);
  value -= hundredths * 100;
  var tenths = Math.floor(value / 10);
  var singles = this.amount % 10;

  var hitValue = false;
  hitValue = this.setNumber(this.numbers[0], thousandths, hitValue);
  hitValue = this.setNumber(this.numbers[1], hundredths, hitValue);
  hitValue = this.setNumber(this.numbers[2], tenths, hitValue);
  this.setNumber(this.numbers[3], singles, true);
};



/**
  Called to adjust a displayed number.
  @param el       The number element to adjust.
  @param value    The new value to display.
  @param hitValue If a value has been displayed yet.
**/
Wallet.prototype.setNumber = function(el, value, hitValue) {
  if (value == 0 && hitValue || value > 0) {
    var offset = (8 + value * 8) * MULT;
    el.css("background-position", "0 -" + offset.toString() + "px");
  } else {
    el.css("background-position", "0 0");
  }

  return value > 0 || hitValue;
};



/**
  Spend money from the wallet.
  @param x The amount to spend.
**/
Wallet.prototype.spend = function(x) {
  if (this.afford(x)) {
    this.amount -= x;
    this.updateDisplay();
  }
};



/**
  Checks if the wallet can afford a certain amount.
  @param x The amount to check.
  @return Boolean
**/
Wallet.prototype.afford = function(x) {
  return this.amount >= x;
};



/**
  Add an amount to the wallet.
  @param x The amount to add.
**/
Wallet.prototype.add = function(x) {
  this.amount += x;
  this.updateDisplay();
};