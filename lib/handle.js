import Maybe from "data.maybe";
import Validation from "data.validation";
import { when, complement, is } from "ramda";

const Success = Validation.Success;
const Failure = Validation.Failure;

const defineHandle = commandHandlers =>
 (state, command) =>
    Maybe
      .fromNullable(commandHandlers[command.type])
      .map(handler => handler(state, command))
      .map(when(complement(is)(Validation), Success))
      .getOrElse(Failure([`Cannot handle command of type '${command.type}'.`]));

export default defineHandle;
