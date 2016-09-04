"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _data = require("data.maybe");

var _data2 = _interopRequireDefault(_data);

var _validation = require("./validation");

var _ramda = require("ramda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defineHandle = function defineHandle(commandHandlers) {
  return function (state, command) {
    return _data2.default.fromNullable(commandHandlers[command.type]).map(function (handler) {
      return handler(state, command);
    }).getOrElse((0, _validation.Failure)(["Cannot handle command of type '" + command.type + "'."]));
  };
};

exports.default = defineHandle;