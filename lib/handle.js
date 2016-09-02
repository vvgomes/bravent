import { flip, apply } from "ramda";
import Maybe from "data.maybe"
import Validation from "data.validation"

const defineHandle = (commandHandlers) =>
 (state, command) =>
    Maybe
      .fromNullable(commandHandlers[command.type])
      .map(flip(apply)([state, command]))
      .getOrElse(Validation.Failure([`Cannot handle command of type '${command.type}'.`]));

export default defineHandle;
