import assert from "assert";
import sinon from "sinon";
import { identity } from "ramda";
import { defineAggregate, Success } from "../lib/bravent";

describe("a Bravent aggregate", () => {

  const Counter = defineAggregate({
    initialState: 0,
    eventHandlers: {
      counterIncremented: (state, event) => state + 1,
      counterDecremented: (state, event) => state - 1 
    },
    commandHandlers: {
      incrementCounter: (state, command) => Success([{ type: "counterIncremented" }]),
      decrementCounter: (state, command) => Success([{ type: "counterDecremented" }])
    }
  });

  it("evolves current state by dispatching commands", () => {
    const result =
      Counter.of([])
        .dispatch({ type: "incrementCounter" })
        .dispatch({ type: "decrementCounter" })
        .dispatch({ type: "incrementCounter" })
        .state();

    assert.deepEqual(result, 1);
  });

  it("skips unknown commands", () => {
     const result =
      Counter.of([])
        .dispatch({ type: "incrementCounter" })
        .dispatch({ type: "unknown" })
        .dispatch({ type: "decrementCounter" })
        .state();

    assert.deepEqual(result, 0);
  });
});

