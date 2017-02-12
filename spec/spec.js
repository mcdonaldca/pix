/**
  Method to create a test suite for a class.
  @param className The class of the html element to display test results.
**/
function Spec(className) {
  this.testEl = $(className);
  this.results = [];
  this.success = true;

  var spec = this;
  this.testEl.click(function() {
    $('.results').html(spec.resultsHTML());
  });
}



/**
  Constructs test suite results output to be displayed to the user.
  @return The test results HTML.
**/
Spec.prototype.resultsHTML = function() {
  return '<h2>' + this.testEl.text() + '</h2>' + this.output();
};



/**
  Returns the error message for a failing test.
  @param error Object containing information about the error.
  @return The error message HTML.
**/
Spec.prototype.errorMessageHTML = function(error = {}) {
  var errorMessage = '<div class="message">' + error.message + '</div>';
  if (error.expected || error.actual) {
    errorMessage += '<div class="expected"><b>expected:</b> ' + 
                    error.expected + 
                    '</div><div class="actual"><b>actual:</b> ' + 
                    error.actual + 
                    '</div>';
  }
  return errorMessage;
};



/**
  The results for a specific test in the test block.
  @param testName    The name of the test
  @param testResults The results (HTML) of the test.
  @return The HTML of the test's results, whether passed or failed.
**/
Spec.prototype.testResultsHTML = function(testName, testResults) {
  var testIndicator = '<div class="test-output__indicator"></div>'
  var testName = '<div class="test-output__name">' + testName + '</div>';
  var testOutput = testIndicator + testName;
  if (!testResults.passed) {
    testOutput += '<div class="test-output__error-message">' + testResults.error + '</div>';
  }
  var passedClass = testResults.passed ? 'passed' : 'failed';
  return '<div class="results__test-output ' + passedClass + '">' + testOutput + '</div>'
};


/**
  The title HTML for a specfic test block within the entire suite.
  @param description The description of the test block.
  @return The HTML for a test block.
**/
Spec.prototype.testDescribeHTML = function(description) {
  var describeBlockOuter = '<div class="results__describe-block">'
  var testOutputOuter = '<div class="results__test-output description">'
  var testDescription = '<div class="test-output__name">' + description + '</div>';
  return describeBlockOuter + testOutputOuter + testDescription + '</div>';
};



/**
  Sets a class on the test indicator dependant on if the suite passed or failed.
**/
Spec.prototype.run = function() {
  var passedClass = this.success ? 'passed' : 'failed';
  this.testEl.addClass(passedClass);
};



/**
  Tries to a run a test, catches any errors.
  @param method The test method
  @return An object containing a boolean for success and an error message.
**/
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
};



/**
  Combines all the test suite's results into an HTML blob.
  @return The combined test results.
**/
Spec.prototype.output = function() {
  return this.results.join('');
};



/**
  Runs a test block within the test suite and adds the results to the HTML.
**/
Spec.prototype.describe = function(description, method) {
  this.results.push(this.testDescribeHTML(description));
  method();
  this.results.push('</div>');
};



/**
  Runs a specific test within a test block and adds the results to the HTML.
**/
Spec.prototype.it = function(description, method) {
  var testResults = this.runTest(method);
  this.success = this.success && testResults.passed;
  this.results.push(this.testResultsHTML(description, testResults));
};

var expect = chai.expect;