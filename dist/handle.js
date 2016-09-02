"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

var _data = require("data.maybe");

var _data2 = _interopRequireDefault(_data);

var _data3 = require("data.validation");

var _data4 = _interopRequireDefault(_data3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defineHandle = function defineHandle(commandHandlers) {
  return function (state, command) {
    return _data2.default.fromNullable(commandHandlers[command.type]).map(_ramda2.default.flip(_ramda2.default.apply)([state, command])).getOrElse(_data4.default.Failure(["Cannot handle command of type '" + command.type + "'."]));
  };
};

exports.default = defineHandle;