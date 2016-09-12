import assert from "assert";
import { identity, evolve, inc, dec } from "ramda";
import { defineAggregate } from "../lib/bravent";

describe("a Bravent aggregate", () => {

  const Counter = defineAggregate({
    initialState: { counter: 0 },
    eventHandlers: {
      counterIncremented: (state, event) => evolve({ counter: inc }, state),
      counterDecremented: (state, event) => evolve({ counter: dec }, state),
    },
    commandHandlers: {
      incrementCounter: (state, command) => [{ type: "counterIncremented" }],
      decrementCounter: (state, command) => [{ type: "counterDecremented" }]
    }
  });

  it("evolves current state by dispatching commands", () => {
    const state =
      Counter.of([])
        .dispatch({ type: "incrementCounter" })
        .dispatch({ type: "decrementCounter" })
        .dispatch({ type: "incrementCounter" })
        .state();

    assert.deepEqual(state, { counter: 1 });
  });

  it("skips unknown commands", () => {
     const state =
      Counter.of([])
        .dispatch({ type: "incrementCounter" })
        .dispatch({ type: "unknown" })
        .dispatch({ type: "incrementCounter" })
        .state();

    assert.deepEqual(state, { counter: 2 });
  });
});

