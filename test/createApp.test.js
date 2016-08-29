import assert from "assert";
import R from "ramda";
import defineCreateApp from "../lib/createApp";

describe("createApp", () => {
  const defineHandle = (commandHandlers) =>
    (state, command) => commandHandlers[command.type](state, command);

  const defineApply = (eventHandlers) =>
    (state, event) => eventHandlers[event.type](state, event);

  const defineState = (apply, initialState) =>
    (events) => R.reduce(apply, initialState, events);

  const config = {
    initialState: { counter: 0 },
    eventHandlers: {
      counterIncremented: (state, event) =>
        R.evolve({ counter: R.inc }, state)
    },
    commandHandlers: {
      incrementCounter: (state, command) =>
        [{ type: "counterIncremented" }]
    }
  };

  const createApp = defineCreateApp(defineHandle, defineApply, defineState);
  const app = createApp(config);

  const events = [
    { type: "counterIncremented" },
    { type: "counterIncremented" },
    { type: "counterIncremented" }
  ];

  it("rebuilds the current state", () => {
    assert.deepEqual(
      app(events).state(),
      { counter: 3 }
    );
  });

  it("dispatches commands", () => {
    const command = { type: "incrementCounter" };

    assert.deepEqual(
      app(events).dispatch(command),
      [{ type: "counterIncremented" }]
    );
  });
});

