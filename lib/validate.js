import Validation from "data.validation";
import { curryN, reduce, keys, toPairs, length, head, last } from "ramda";

const Success = Validation.Success;
const Failure = Validation.Failure;

const message = head;
const predicate = last;
const messageAndPredicatePairs = toPairs;

const validate = (command, validations) => {
  const run = validation =>
    predicate(validation)(command) ?
      Success(command) : Failure([message(validation)]);

  return reduce(
    (result, validation) => result.ap(run(validation)),
    Success(curryN(length(keys(validations)), () => command)),
    messageAndPredicatePairs(validations));
};

export default validate;
