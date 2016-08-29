import assert from "assert";
import R from "ramda";
import Validation from "data.validation"
import Bravent from "../bravent";

describe("an event sourcing app", () => {

  // just a simple counter
  const app = Bravent.createApp({
    initialState: { counter: 0 },

    eventHandlers: {
      counterIncremented: (state, event) => R.evolve({ counter: R.inc }, state),
      counterDecremented: (state, event) => R.evolve({ counter: R.dec }, state)
    },

    commandHandlers: {
      incrementCounter: (state, command) => [ { type: "counterIncremented" } ],
      decrementCounter: (state, command) => [ { type: "counterDecremented" } ]
    }
  });

  describe("state", () => {
    it("is the initial state by default", () => {
      const events = [];

      assert.deepEqual(
        app(events).state(),
        { counter: 0 }
      );
    });

    it("applies previous events", () => {
      const events = [
        { type: "counterIncremented" },
        { type: "counterDecremented" },
        { type: "counterIncremented" },
        { type: "counterIncremented" }
      ];

      assert.deepEqual(
        app(events).state(),
        { counter: 2 }
      );
    });

    it("applies only known events", () => {
      const events = [
        { type: "counterIncremented" },
        { type: "unknown" },
        { type: "counterDecremented" },
        { type: "counterIncremented" }
      ];

      assert.deepEqual(
        app(events).state(),
        { counter: 1 }
      );
    });

    it("ignores events without a type", () => {
      const events = [
        { type: "counterIncremented" },
        {},
        { type: "counterDecremented" },
        { type: "counterIncremented" }
      ];

      assert.deepEqual(
        app(events).state(),
        { counter: 1 }
      );
    });

  });

  describe("dispatch", () => {
    it("produces events after command handled successfully", () => {
      const command = { type: "incrementCounter" };

      assert.deepEqual(
        app([]).dispatch(command),
        [{ type: "counterIncremented" }]
      );
    });

    it("produces error when the command is unknown", () => {
      const command = { type: "unknown" };

      assert.deepEqual(
        app([]).dispatch(command),
        Validation.Failure(["Cannot handle command of type 'unknown'."])
      );
    });

    it("produces error when the command has no type", () => {
      const command = {};

      assert.deepEqual(
        app([]).dispatch(command),
        Validation.Failure(["Cannot handle command of type 'undefined'."])
      );
    });
  });
});

