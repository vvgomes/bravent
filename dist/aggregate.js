"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ramda = require("ramda");

var _data = require("data.validation");

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defineAggregate = function defineAggregate(apply, handle, initialState) {
  return function () {
    function Aggregate() {
      var events = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      _classCallCheck(this, Aggregate);

      this.events = events;
    }

    _createClass(Aggregate, [{
      key: "state",
      value: function state() {
        return (0, _ramda.reduce)(apply, initialState, this.events);
      }
    }, {
      key: "dispatch",
      value: function dispatch(command) {
        var onSuccess = arguments.length <= 1 || arguments[1] === undefined ? _ramda.identity : arguments[1];
        var onFailure = arguments.length <= 2 || arguments[2] === undefined ? _ramda.identity : arguments[2];

        var success = (0, _ramda.pipe)((0, _ramda.tap)(onSuccess), (0, _ramda.concat)(this.events), Aggregate.of);
        var failure = (0, _ramda.pipe)((0, _ramda.tap)(onFailure), (0, _ramda.always)(this));

        var normalize = (0, _ramda.when)((0, _ramda.complement)(_ramda.is)(_data2.default), _data2.default.Success);
        return normalize(handle(this.state(), command)).fold(failure, success);
      }
    }], [{
      key: "of",
      value: function of(events) {
        return new Aggregate(events);
      }
    }]);

    return Aggregate;
  }();
};

exports.default = defineAggregate;