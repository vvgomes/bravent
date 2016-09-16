import assert from "assert";
import { defineAggregate } from "../lib/bravent";

describe("a Bravent aggregate", () => {

  const Counter = defineAggregate({
    initialState: 0,
    eventHandlers: {
      counterIncremented: (state, event) => state + 1,
      counterDecremented: (state, event) => state - 1
    },
    commandHandlers: {
      incrementCounter: (state, command) => [{ type: "counterIncremented" }],
      decrementCounter: (state, command) => [{ type: "counterDecremented" }]
    }
  });

  it("runs the counter example", () => {
    const events = [];
    const counter = Counter.of(events);
    assert.equal(counter.state(), 0);

    const newCounter =
      counter
        .dispatch({ type: "incrementCounter" })
        .dispatch({ type: "decrementCounter" })
        .dispatch({ type: "incrementCounter" })
        .dispatch({ type: "incrementCounter" });

    assert.equal(newCounter.state(), 2);
  });
});
