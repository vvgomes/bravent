import R from "ramda";

const defineAggregate = (apply, handle, initialState) =>
  class Aggregate {
    constructor(events = []) {
      this.events = events;
    }

    static of(events) {
      return new Aggregate(events);
    }

    state() {
      return R.reduce(apply, initialState, this.events);
    }

    dispatch(command, onSuccess = R.identity, onFailure = R.identity) {
      const success = R.pipe(
        R.tap(onSuccess),
        R.concat(this.events),
        Aggregate.of);

      const failure = R.pipe(
        R.tap(onFailure),
        R.always(this));

      return handle(this.state(), command).fold(failure, success);
    }
  };

export default defineAggregate;

