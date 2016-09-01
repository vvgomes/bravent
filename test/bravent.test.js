import assert from "assert";
import Bravent from "../lib/bravent";

const Success = Bravent.Success;
const Failure = Bravent.Failure;

describe("a Bravent aggregate", () => {

  const Counter = Bravent.defineAggregate({
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
  
  it("collects errors from unsuccessful commands", () => {
    let result;
     
    Counter.of([])
      .dispatch({ type: "incrementCounter" })
      .dispatch({ type: "unknown" }, () => {}, (errors) => result = errors)
      .dispatch({ type: "decrementCounter" })
      .state();

    assert.deepEqual(result, ["Cannot handle command of type 'unknown'."]);
  });
});

