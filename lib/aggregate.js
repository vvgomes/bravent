import _defineApply from "./apply";
import _defineHandle from "./handle";
import { propOr, reduce, identity, pipe, tap, concat, always } from "ramda";

const defineAggregate = (
  config = {},
  defineApply = _defineApply,
  defineHandle = _defineHandle
) => {
  const commandHandlers = propOr({}, "commandHandlers", config);
  const eventHandlers = propOr({}, "eventHandlers", config);
  const initialState = propOr({}, "initialState", config);

  const apply = defineApply(eventHandlers);
  const handle = defineHandle(commandHandlers);

  return (
    class Aggregate {
      constructor (events = []) {
        this.events = events;
      }

      static of (events) {
        return new Aggregate(events);
      }

      state () {
        return reduce(apply, initialState, this.events);
      }

      dispatch (command, onSuccess = identity, onFailure = identity) {
        const success = pipe(tap(onSuccess), concat(this.events), Aggregate.of);
        const failure = pipe(tap(onFailure), always(this));
        return handle(this.state(), command).fold(failure, success);
      }
    }
  );
};

export default defineAggregate;
