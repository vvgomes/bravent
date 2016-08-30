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

  describe("#state", () => {
    it("rebuilds the current state based on events", () => {
      const events = [
        { type: "counterIncremented" },
        { type: "counterIncremented" }
      ];

      assert.deepEqual(
        app(events).state(),
        { counter: 2 }
      );
    });

    it("defaults to the initial state", () => {
      assert.deepEqual(
        app().state(),
        { counter: 0 }
      );
    });
  });

  describe("#dispatch", () => {
    it("sends a command to be handled by the app", () => {
      const command = { type: "incrementCounter" };

      assert.deepEqual(
        app().dispatch(command),
        [{ type: "counterIncremented" }]
      );
    });
  });
});

