"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _data = require("data.maybe");

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defineApply = function defineApply(eventHandlers) {
  return function (state, event) {
    return _data2.default.fromNullable(eventHandlers[event.type]).map(function (handler) {
      return handler(state, event);
    }).getOrElse(state);
  };
};

exports.default = defineApply;