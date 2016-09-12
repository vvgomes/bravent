import defineAggregate from "../lib/aggregate";
import Validation from "data.validation";
import assert from "assert";
import sinon from "sinon";
import { equals, evolve, inc, propOr } from "ramda";

const Success = Validation.Success;
const Failure = Validation.Failure;

describe("Aggregate", () => {

  const apply = (state, event) => propOr(state, event.type, {
    counterIncremented: evolve({ counter: inc }, state)
  });

  const handle = (state, command) => propOr(Failure(["Error"]), command.type, {
    incrementCounter: Success([{ type: "counterIncremented" }]) 
  });

  const Counter = defineAggregate(apply, handle, { counter: 0 });

  describe("#state()", () => {

    it("defaults to the initial state", () => {
      assert.deepEqual(
        Counter.of([]).state(),
        { counter: 0 }
      );
    });

    it("rebuilds state based on events", () => {
      const events = [
        { type: "counterIncremented" },
        { type: "counterIncremented" },
        { type: "counterIncremented" }
      ];
      
      assert.deepEqual(
        Counter.of(events).state(),
        { counter: 3 }
      );
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
        const onSuccess = sinon.spy();
        const onFailure = sinon.spy();

        Counter.of([]).dispatch(command, onSuccess);

        assert(onSuccess.calledWith([{ type: "counterIncremented" }]));
        assert(!onFailure.called);
      });

      it("accepts further commands", () => {
        const command = { type: "incrementCounter" };

        const resultingAggregate =
          Counter.of([])
            .dispatch(command)
            .dispatch(command)
            .dispatch(command)

        assert.deepEqual(
          resultingAggregate,
          Counter.of([
            { type: "counterIncremented" },
            { type: "counterIncremented" },
            { type: "counterIncremented" }
          ])
        );
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
        const onSuccess = sinon.spy();
        const onFailure = sinon.spy();

        Counter.of([]).dispatch(command, onSuccess, onFailure);

        assert(onFailure.calledWith(["Error"]));
        assert(!onSuccess.called);
      });
    });
  });
});

