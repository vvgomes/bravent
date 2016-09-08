"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Failure = exports.Success = exports.validate = undefined;

var _data = require("data.validation");

var _data2 = _interopRequireDefault(_data);

var _ramda = require("ramda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Success = _data2.default.Success;
var Failure = _data2.default.Failure;

var messageAndPredicatePairs = _ramda.toPairs;
var message = _ramda.head;
var predicate = _ramda.last;

var validate = function validate(command, validations) {
  var runValidation = function runValidation(errors, validation) {
    return predicate(validation)(command) ? errors : (0, _ramda.append)(message(validation), errors);
  };

  var wrapResults = function wrapResults(errors) {
    return (0, _ramda.isEmpty)(errors) ? Success(command) : Failure(errors);
  };

  return (0, _ramda.pipe)(messageAndPredicatePairs, (0, _ramda.reduce)(runValidation, []), wrapResults)(validations);
};

exports.validate = validate;
exports.Success = Success;
exports.Failure = Failure;