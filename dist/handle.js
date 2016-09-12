"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _data = require("data.maybe");

var _data2 = _interopRequireDefault(_data);

var _data3 = require("data.validation");

var _data4 = _interopRequireDefault(_data3);

var _ramda = require("ramda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Success = _data4.default.Success;
var Failure = _data4.default.Failure;

var defineHandle = function defineHandle(commandHandlers) {
  return function (state, command) {
    return _data2.default.fromNullable(commandHandlers[command.type]).map(function (handler) {
      return handler(state, command);
    }).map((0, _ramda.when)((0, _ramda.complement)(_ramda.is)(_data4.default), Success)).getOrElse(Failure(["Cannot handle command of type '" + command.type + "'."]));
  };
};

exports.default = defineHandle;