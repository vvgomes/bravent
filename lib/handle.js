import Maybe from "data.maybe"
import Validation from "data.validation"
import { flip, apply } from "ramda";

const Failure = Validation.Failure;

const defineHandle = commandHandlers =>
 (state, command) =>
    Maybe
      .fromNullable(commandHandlers[command.type])
      .map(handler => handler(state, command))
      .getOrElse(Failure([`Cannot handle command of type '${command.type}'.`]));

export default defineHandle;
