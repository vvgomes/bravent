"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

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
        return _ramda2.default.reduce(apply, initialState, this.events);
      }
    }, {
      key: "dispatch",
      value: function dispatch(command) {
        var onSuccess = arguments.length <= 1 || arguments[1] === undefined ? _ramda2.default.identity : arguments[1];
        var onFailure = arguments.length <= 2 || arguments[2] === undefined ? _ramda2.default.identity : arguments[2];

        var success = _ramda2.default.pipe(_ramda2.default.tap(onSuccess), _ramda2.default.concat(this.events), Aggregate.of);

        var failure = _ramda2.default.pipe(_ramda2.default.tap(onFailure), _ramda2.default.always(this));

        return handle(this.state(), command).fold(failure, success);
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