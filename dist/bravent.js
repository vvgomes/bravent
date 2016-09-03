"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = exports.Failure = exports.Success = exports.defineAggregate = undefined;

var _validate = require("./validate");

Object.defineProperty(exports, "validate", {
  enumerable: true,
  get: function get() {
    return _validate.validate;
  }
});

var _handle = require("./handle");

var _handle2 = _interopRequireDefault(_handle);

var _apply = require("./apply");

var _apply2 = _interopRequireDefault(_apply);

var _aggregate = require("./aggregate");

var _aggregate2 = _interopRequireDefault(_aggregate);

var _data = require("data.validation");

var _data2 = _interopRequireDefault(_data);

var _ramda = require("ramda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defineAggregateFromConfig = function defineAggregateFromConfig() {
  var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var commandHandlers = (0, _ramda.propOr)({}, "commandHandlers", config);
  var eventHandlers = (0, _ramda.propOr)({}, "eventHandlers", config);
  var initialState = (0, _ramda.propOr)({}, "initialState", config);

  var handle = (0, _handle2.default)(commandHandlers);
  var apply = (0, _apply2.default)(eventHandlers);
  return (0, _aggregate2.default)(apply, handle, initialState);
};

exports.defineAggregate = defineAggregateFromConfig;
var Success = exports.Success = _data2.default.Success;
var Failure = exports.Failure = _data2.default.Failure;