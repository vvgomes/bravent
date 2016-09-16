import Maybe from "data.maybe";

const defineApply = eventHandlers =>
  (state, event) =>
    Maybe
      .fromNullable(eventHandlers[event.type])
      .map(handler => handler(state, event))
      .getOrElse(state);

export default defineApply;
