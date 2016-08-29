import R from "ramda";
import Maybe from "data.maybe"
import Validation from "data.validation"

import defineHandle from "./handle";
import defineApply from "./apply";
import defineState from "./state";
import defineCreateApp from "./createApp";

const Bravent = {
  createApp: defineCreateApp(defineHandle, defineApply, defineState)
};

export default Bravent;

