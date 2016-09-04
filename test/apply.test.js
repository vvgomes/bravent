import defineApply from "../lib/apply";
import assert from "assert";
import { evolve, inc } from "ramda";

describe("apply()", () => {

  const counterIncremented = (state, event) => evolve({ counter: inc }, state);
  const apply = defineApply({ counterIncremented });
 
  it("calls appropriate handler for event and state", () => {
    const state = { counter: 0 };
    const event = { type: "counterIncremented" };
 
    assert.deepEqual(
      apply(state, event),
      { counter: 1 }
    );
  });
 
  it("returns unchanged state when no handler is found", () => {
    const state = { counter: 0 };
    const event = { type: "unknown" };
 
    assert.deepEqual(
      apply(state, event),
      { counter: 0 }
    );
  });
 
  it("returns unchanged state when event has no type", () => {
    const state = { counter: 0 };
    const event = {};
 
    assert.deepEqual(
      apply(state, event),
      { counter: 0 }
    );
  });
});

