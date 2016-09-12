import defineApply from "../lib/apply";
import assert from "assert";
import { stub } from "sinon";

describe("apply()", () => {
  const apply = defineApply({
    counterIncremented: stub().returns(1)
  });
 
  it("calls appropriate handler for event and state", () => {
    const state = 0;
    const event = { type: "counterIncremented" };
    assert.equal(apply(state, event), 1);
  });
 
  it("returns unchanged state when no handler is found", () => {
    const state = 0;
    const event = { type: "unknown" };
    assert.equal(apply(state, event), 0);
  });
 
  it("returns unchanged state when event has no type", () => {
    const state = 0;
    const event = {};
    assert.equal(apply(state, event), 0);
  });
});

