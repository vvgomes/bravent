import assert from "assert";
import defineHandle from "../lib/handle";
import Validation from "data.validation";

const Failure = Validation.Failure;

describe("handle()", () => {
  const commandHandlers = {
    incrementCounter: (state, command) =>
      [{ type: "counterIncremented" }]
  };

  const handle = defineHandle(commandHandlers);

  it("calls appropriate handler for command and state", () => {
    const state = { counter: 0 };
    const command = { type: "incrementCounter" };

    assert.deepEqual(
      handle(state, command),
      [{ type: "counterIncremented" }]
    );
  });

  it("results in failure when no handler is found", () => {
    const state = { counter: 0 };
    const command = { type: "unknown" };

    assert.deepEqual(
      handle(state, command),
      Failure(["Cannot handle command of type 'unknown'."])
    );
  });

  it("results in failure when event has no type", () => {
    const state = { counter: 0 };
    const command = {};

    assert.deepEqual(
      handle(state, command),
      Failure(["Cannot handle command of type 'undefined'."])
    );
  });
});

