import R from "ramda";
import Maybe from "data.maybe"
import Validation from "data.validation"

const Success = Validation.Success;
const Failure = Validation.Failure;

const defineHandle = (commandHandlers) =>
 (state, command) =>
    Maybe
      .fromNullable(commandHandlers[command.type])
      .map(R.flip(R.apply)([state, command]))
      .getOrElse(Failure([`Cannot handle command of type '${command.type}'.`]));

const defineApply = (eventHandlers) =>
  (state, event) =>
    Maybe
      .fromNullable(eventHandlers[event.type])
      .map((handler) => handler(state, event))
      .getOrElse(state);

const defineState = (apply, initialState) =>
  (events) => R.reduce(apply, initialState, events);

const Bravent = {};

Bravent.createApp = (config) => {
  const commandHandlers = config.commandHandlers || {};
  const eventHandlers = config.eventHandlers || {};
  const initialState = config.initialState || {};

  const handle = defineHandle(commandHandlers);
  const apply = defineApply(eventHandlers);
  const state = defineState(apply, initialState);

  return (events) => {
    const currentState = state(events);

    return {
      state: () => currentState,
      dispatch: (command) => handle(currentState, command)
    };
  };
};

export default Bravent;

