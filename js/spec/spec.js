function Spec(className) {
  this.testEl = $(className);
  this.tests = [];
  this.output = "";

  var specObj = this;
  this.testEl.click(function() {
    $(".results").html("<h2>" + specObj.testEl.text() + "</h2>" + specObj.results());
  });
}

Spec.prototype.run = function() {
  if (this.tests.length == 0) { this.declare(); }

  var results = [];
  var success = true;

  for (var i = 0; i < this.tests.length; i++) {
    var testResults = this.tests[i].method();
    success = success && testResults.passed;
    var testOutput = "<div class='check'></div><div class='test-name'>" + this.tests[i].desc + "</div>";
    if (!testResults.passed) {
      testOutput += "<div class='error-message'>" + testResults.error + "</div>";
    }
    results.push("<div class='test-output " + testResults.passed + "'>" + testOutput + '</div>');
  }

  var passedClass = success ? "passed" : "failed";
  this.testEl.addClass(passedClass);
  for (var i = 0; i < results.length; i++) {
    this.output += results[i];
  };
}

Spec.prototype.results = function() {
  if (!this.output) { this.run(); }
  return this.output;
}

Spec.prototype.test = function(method) {
  return function() {
    var errorMessage = "";
    var success = true;
    try {
      method();      
    } catch(err) {
      success = false;
      errorMessage = "<div class='message'>" + 
                     err.message + 
                     "</div><div class='expected'><b>expected:</b> " + 
                     err.expected + 
                     "</div><div class='actual'><b>actual:</b> " + 
                     err.actual + 
                     "</div>";
    }
    return {
      passed: success,
      error: errorMessage,
    }
  } 
}