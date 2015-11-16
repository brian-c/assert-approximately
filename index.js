var assert = require('assert');

var DEFAULT_TOLERANCE_FACTOR = 0.05;

function assertApproximately (actual, expected, tolerance, message) {
  if (typeof tolerance === 'string') {
    message = tolerance;
    tolerance = undefined;
  }

  if (tolerance === undefined) {
    tolerance = Math.abs(expected) * DEFAULT_TOLERANCE_FACTOR;
  }

  var difference = Math.abs(actual - expected);
  var isWithinTolerance = difference <= tolerance;

  if (!isWithinTolerance) {
    assert.fail(actual, expected, message, '~=', assertApproximately);
    }
}

module.exports = assertApproximately;
module.exports.__defaultToleranceFactor = DEFAULT_TOLERANCE_FACTOR;
