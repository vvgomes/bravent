import assert from "assert";
import R from "ramda";
import Validation from "data.validation";
import defineAggregate from "../lib/aggregate";

const Success = Validation.Success;
const Failure = Validation.Failure;

describe("Aggregate", () => {

  const apply = (state, event) =>
    R.equals("incremented", event.type) ? state + 1 : state;

  const handle = (state, command) =>
    R.equals("increment", command.type) ?
      Success([{ type: "incremented" }]) : Failure(["Error"]);

  const Aggregate = defineAggregate(apply, handle, 0);

  describe("#state", () => {

    it("defaults to the initial state", () => {
      assert.deepEqual(Aggregate.of([]).state(), 0);
    });

    it("rebuilds state based on events", () => {
      const events = [
        { type: "incremented" },
        { type: "incremented" },
        { type: "incremented" }
      ];
      
      assert.deepEqual(Aggregate.of(events).state(), 3);
    });
  });

  describe("#dispatch", () => {

    describe("when successful", () => {
      it("creates a new aggregate with additional events", () => {
        const command = { type: "increment" };

        assert.deepEqual(
          Aggregate.of([]).dispatch(command),
          Aggregate.of([{ type: "incremented" }])
        );
      });

      it("runs the success callback", () => {
        const command = { type: "increment" };

        let result; // to be called with a mock fw
        const onSuccess = (newEvents) => result = newEvents;

        Aggregate.of([]).dispatch(command, onSuccess);

        assert.deepEqual(
          result,
          [{ type: "incremented" }]
        );
      });

      it("accepts further commands", () => {
        const command = { type: "increment" };

        const resultingAggregate =
          Aggregate.of([])
            .dispatch(command)
            .dispatch(command)
            .dispatch(command)

        assert.deepEqual(
          resultingAggregate,
          Aggregate.of([
            { type: "incremented" },
            { type: "incremented" },
            { type: "incremented" }
          ])
        );
      });
    });

    describe("when failed", () => {

      it("keeps the same aggregate", () => {
        const command = { type: "decrement" };

        assert.deepEqual(
          Aggregate.of([]).dispatch(command),
          Aggregate.of([])
        );
      });

      it("runs the failure callback", () => {
        const command = { type: "decrement" };

        let result; // to be called with a mock fw
        const onSuccess = () => {};
        const onFailure = (errors) => result = errors;

        Aggregate.of([]).dispatch(command, onSuccess, onFailure);

        assert.deepEqual(result, [ "Error" ]);
      });
    });
  });
});

