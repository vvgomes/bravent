"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Failure = exports.Success = exports.validate = exports.defineAggregate = undefined;

var _aggregate = require("./aggregate");

var _aggregate2 = _interopRequireDefault(_aggregate);

var _validate = require("./validate");

var _validate2 = _interopRequireDefault(_validate);

var _data = require("data.validation");

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Success = _data2.default.Success;
var Failure = _data2.default.Failure;

exports.defineAggregate = _aggregate2.default;
exports.validate = _validate2.default;
exports.Success = Success;
exports.Failure = Failure;