import R from "ramda";
import Validation from "data.validation";
import defineHandle from "./handle";
import defineApply from "./apply";
import defineAggregate from "./aggregate";

const Bravent = {
  Success: Validation.Success,
  Failure: Validation.Failure,

  defineAggregate: (config = {}) => {
    const commandHandlers = R.propOr({}, "commandHandlers", config);
    const eventHandlers = R.propOr({}, "eventHandlers", config);
    const initialState = R.propOr({}, "initialState", config);

    const handle = defineHandle(commandHandlers);
    const apply = defineApply(eventHandlers);

    return defineAggregate(apply, handle, initialState);
  }
};

export default Bravent;

