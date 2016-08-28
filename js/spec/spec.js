function Spec(className) {
  this.testEl = $(className);
  this.results = [];
  this.success = true;

  var specObj = this;
  this.testEl.click(function() {
    $('.results').html(specObj.resultsHTML());
  });
}

Spec.prototype.resultsHTML = function() {
  return '<h2>' + this.testEl.text() + '</h2>' + this.output();
};

Spec.prototype.errorMessageHTML = function(error = {}) {
  return '<div class="message">' + 
   error.message + 
   '</div><div class="expected"><b>expected:</b> ' + 
   error.expected + 
   '</div><div class="actual"><b>actual:</b> ' + 
   error.actual + 
   '</div>';
};

Spec.prototype.testResultsHTML = function(testName, testResults) {
  var testIndicator = '<div class="test-output__indicator"></div>'
  var testName = '<div class="test-output__name">' + testName + '</div>';
  var testOutput = testIndicator + testName;
  if (!testResults.passed) {
    testOutput += '<div class="test-output__error-message">' + testResults.error + '</div>';
  }
  var passedClass = this.success ? 'passed' : 'failed';
  return '<div class="results__test-output ' + passedClass + '">' + testOutput + '</div>'
};

Spec.prototype.testDescribeHTML = function(description) {
  var describeBlockOuter = '<div class="results__describe-block">'
  var testOutputOuter = '<div class="results__test-output description">'
  var testDescription = '<div class="test-output__name">' + description + '</div>';
  return describeBlockOuter + testOutputOuter + testDescription + '</div>';
};

Spec.prototype.run = function() {
  var passedClass = this.success ? 'passed' : 'failed';
  this.testEl.addClass(passedClass);
}

Spec.prototype.runTest = function(method) {
  var errorMessage = '';
  var success = true;

  try {
    method();      
  } catch(error) {
    success = false;
    errorMessage = this.errorMessageHTML(error);
  }

  return {
    passed: success,
    error: errorMessage,
  }
}

Spec.prototype.output = function() {
  return this.results.join('');
}

Spec.prototype.describe = function(description, method) {
  this.results.push(this.testDescribeHTML(description));
  method();
  this.results.push('</div>');
};

Spec.prototype.it = function(description, method) {
  var testResults = this.runTest(method);
  this.success = this.success && testResults.passed;
  this.results.push(this.testResultsHTML(description, testResults));
}

var expect = chai.expect;