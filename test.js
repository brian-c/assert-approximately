var assert = require('assert');
var assertApproximately = require('.');

describe('assertApproximately', function() {
  it('exports a function', function() {
    assert.equal(typeof assertApproximately, 'function');
  });

  it('exposes its default tolerance factor', function() {
    assert(typeof assertApproximately.__defaultToleranceFactor, 'number');
  });

  var DEFAULT_TOLERANCE_FACTOR = assertApproximately.__defaultToleranceFactor;
  var TOLERANCES = [undefined, 0, 1, 2];
  var TEST_SET = [-Math.PI, -2, -1, 0, 1, 2, Math.PI];

  TOLERANCES.forEach(function(tolerance) {
    describe('with the tolerance ' + tolerance, function() {
      describe('and equal values', function() {
        TEST_SET.forEach(function(expected) {
          var actual = expected;
          it('doesn’t throw given ' + [actual, expected].join(','), function() {
            assert.doesNotThrow(function() {
              assertApproximately(actual, expected, tolerance);
            });
          });
        });
      });

      describe('and values within the tolerance', function() {
        TEST_SET.forEach(function(expected, i) {
          var workingTolerance = tolerance;
          if (workingTolerance === undefined) workingTolerance = DEFAULT_TOLERANCE_FACTOR * expected;
          var actualModifier = workingTolerance * 0.9;
          var actual = expected + actualModifier;

          it('doesn’t throw given ' + [actual, expected].join(','), function() {
            assert.doesNotThrow(function() {
              assertApproximately(actual, expected, tolerance);
            });
          });
        });
      });

      describe('and values exceeding the tolerance', function() {
        TEST_SET.forEach(function(expected, i) {
          var workingTolerance = tolerance;
          if (workingTolerance === undefined) workingTolerance = DEFAULT_TOLERANCE_FACTOR * expected;
          var actualModifier = workingTolerance * 1.1;
          var actual = expected + actualModifier;

          if (actual === expected) return; // Skip `0`.

          it('throws given ' + [actual, expected].join(','), function() {
            assert.throws(function() {
              assertApproximately(actual, expected, tolerance);
            });
          });
        });
      });
    });
  });
})
