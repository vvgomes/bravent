import assert from "assert";
import R from "ramda";
import defineState from "../lib/state";

describe("state", () => {
  const initialState = { counter: 0 };

  const apply = (state, event) =>
    R.evolve({ counter: R.inc }, state);

  const state = defineState(apply, initialState);

  it("applies the history of event on top of a initial state", () => {
    const events = [
      { type: "counterIncremented" },
      { type: "counterIncremented" },
      { type: "counterIncremented" }
    ];

    assert.deepEqual(
      state(events),
      { counter: 3 }
    );
  });
});


