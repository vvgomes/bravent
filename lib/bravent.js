import defineHandle from "./handle";
import defineApply from "./apply";
import defineAggregate from "./aggregate";
import { validate, Success, Failure } from "./validate";
import { propOr } from "ramda";

const defineAggregateFromConfig = (config = {}) => {
  const commandHandlers = propOr({}, "commandHandlers", config);
  const eventHandlers = propOr({}, "eventHandlers", config);
  const initialState = propOr({}, "initialState", config);

  const handle = defineHandle(commandHandlers);
  const apply = defineApply(eventHandlers);

  return defineAggregate(apply, handle, initialState);
};

export {
  defineAggregateFromConfig as defineAggregate,
  validate, Success, Failure
};

