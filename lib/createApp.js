import R from "ramda";

const defineCreateApp = (defineHandle, defineApply, defineState) =>
  (config = {}) => {
    const commandHandlers = config.commandHandlers || {};
    const eventHandlers = config.eventHandlers || {};
    const initialState = config.initialState || {};

    const handle = defineHandle(commandHandlers);
    const apply = defineApply(eventHandlers);
    const state = defineState(apply, initialState);

    return (events = []) => {
      const currentState = state(events);

      return {
        state: () => currentState,
        dispatch: (command) => handle(currentState, command)
      };
    };
  };

export default defineCreateApp;

