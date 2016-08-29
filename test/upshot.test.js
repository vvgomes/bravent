import assert from "assert";
import R from "ramda";
import Validation from "data.validation"
import Upshot from "../upshot";

describe("an event sourcing app", () => {

  // just a simple counter
  const app = Upshot.createApp({
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
      assert.deepEqual(
        app([]).state(),
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
      const firstCommand = { type: "incrementCounter" };

      assert.deepEqual(
        app([]).dispatch(firstCommand),
        [{ type: "counterIncremented" }]
      );

      const secondCommand = { type: "decrementCounter" };

      assert.deepEqual(
        app([]).dispatch(secondCommand),
        [{ type: "counterDecremented" }]
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

