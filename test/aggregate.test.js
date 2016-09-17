import defineAggregate from "../lib/aggregate";
import Validation from "data.validation";
import assert from "assert";
import { stub, spy } from "sinon";
import { propOr, always } from "ramda";

const Success = Validation.Success;
const Failure = Validation.Failure;

describe("Aggregate{}", () => {

  const config = {
    initialState: 0,
    eventHandlers: {
      counterIncremented: (state, _event) => state + 1
    },
    commandHandlers: {
      incrementCounter: (_state, _command) => Success([{ type: "counterIncremented" }])
    }
  };

  const defineApply = stub()
    .withArgs(config.eventHandlers)
    .returns((state, event) => propOr(
      always(state),
      event.type,
      config.eventHandlers
    )(state, event));

  const defineHandle = stub()
    .withArgs(config.commandHandlers)
    .returns((state, command) => propOr(
      always(Failure(["Error"])),
      command.type,
      config.commandHandlers
    )(state, command));

  const Counter = defineAggregate(config, defineApply, defineHandle);

  describe("#state()", () => {

    it("rebuilds state by applying existing events", () => {
      const events = [
        { type: "counterIncremented" },
        { type: "counterIncremented" }
      ];

      assert.equal(Counter.of(events).state(), 2);
    });
  });

  describe("#dispatch()", () => {

    describe("when successful", () => {

      it("creates a new aggregate with additional events", () => {
        const command = { type: "incrementCounter" };

        assert.deepEqual(
          Counter.of([]).dispatch(command),
          Counter.of([{ type: "counterIncremented" }])
        );
      });

      it("runs the success callback", () => {
        const command = { type: "incrementCounter" };
        const onSuccess = spy();
        const onFailure = spy();

        Counter.of([]).dispatch(command, onSuccess);

        assert(onSuccess.calledWith([{ type: "counterIncremented" }]));
        assert(!onFailure.called);
      });
    });

    describe("when failed", () => {

      it("keeps the same aggregate", () => {
        const command = { type: "unknown" };

        assert.deepEqual(
          Counter.of([]).dispatch(command),
          Counter.of([])
        );
      });

      it("runs the failure callback", () => {
        const command = { type: "unknown" };
        const onSuccess = spy();
        const onFailure = spy();

        Counter.of([]).dispatch(command, onSuccess, onFailure);

        assert(onFailure.calledWith(["Error"]));
        assert(!onSuccess.called);
      });
    });
  });
});
