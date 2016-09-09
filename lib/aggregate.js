import { reduce, identity, pipe, tap, concat, always, when, complement, is } from "ramda";
import Validation from "data.validation";

const defineAggregate = (apply, handle, initialState) =>
  class Aggregate {
    constructor(events = []) {
      this.events = events;
    }

    static of(events) {
      return new Aggregate(events);
    }

    state() {
      return reduce(apply, initialState, this.events);
    }

    dispatch(command, onSuccess = identity, onFailure = identity) {
      const success = pipe(tap(onSuccess), concat(this.events), Aggregate.of);
      const failure = pipe(tap(onFailure), always(this));

      const normalize = when(complement(is)(Validation), Validation.Success);
      return normalize(handle(this.state(), command)).fold(failure, success);
    }
  };

export default defineAggregate;

