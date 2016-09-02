"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require("ramda");

var _data = require("data.maybe");

var _data2 = _interopRequireDefault(_data);

var _data3 = require("data.validation");

var _data4 = _interopRequireDefault(_data3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defineHandle = function defineHandle(commandHandlers) {
  return function (state, command) {
    return _data2.default.fromNullable(commandHandlers[command.type]).map((0, _ramda.flip)(_ramda.apply)([state, command])).getOrElse(_data4.default.Failure(["Cannot handle command of type '" + command.type + "'."]));
  };
};

exports.default = defineHandle;