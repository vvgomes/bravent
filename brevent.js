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

const Brevent = {};

Brevent.createApp = (config) => {
  const commandHandlers = config.commandHandlers || {};
  const eventHandlers = config.eventHandlers || {};
  const initialState = config.initialState || {};

  const handle = defineHandle(commandHandlers);
  const apply = defineApply(eventHandlers);

  return (events) => {
    const state = R.reduce(apply, initialState, events);

    return {
      state: () => state,
      dispatch: (command) =>  handle(state, command)
    };
  };
};

export default Brevent;

