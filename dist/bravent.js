"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

var _data = require("data.validation");

var _data2 = _interopRequireDefault(_data);

var _handle = require("./handle");

var _handle2 = _interopRequireDefault(_handle);

var _apply = require("./apply");

var _apply2 = _interopRequireDefault(_apply);

var _aggregate = require("./aggregate");

var _aggregate2 = _interopRequireDefault(_aggregate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bravent = {
  Success: _data2.default.Success,
  Failure: _data2.default.Failure,

  defineAggregate: function defineAggregate() {
    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var commandHandlers = _ramda2.default.propOr({}, "commandHandlers", config);
    var eventHandlers = _ramda2.default.propOr({}, "eventHandlers", config);
    var initialState = _ramda2.default.propOr({}, "initialState", config);

    var handle = (0, _handle2.default)(commandHandlers);
    var apply = (0, _apply2.default)(eventHandlers);

    return (0, _aggregate2.default)(apply, handle, initialState);
  }
};

exports.default = Bravent;