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

var message = _ramda.head;
var predicate = _ramda.last;
var messageAndPredicatePairs = _ramda.toPairs;

var validate = function validate(command, validations) {
  var run = function run(validation) {
    return predicate(validation)(command) ? Success(command) : Failure([message(validation)]);
  };

  return (0, _ramda.reduce)(function (result, validation) {
    return result.ap(run(validation));
  }, Success((0, _ramda.curryN)((0, _ramda.length)((0, _ramda.keys)(validations)), function () {
    return command;
  })), messageAndPredicatePairs(validations));
};

exports.validate = validate;
exports.Success = Success;
exports.Failure = Failure;