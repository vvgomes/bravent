import Validation from "data.validation";
import {
  curry, toPairs, length, pipe, head, last, reduce, ifElse, isEmpty, append, always
} from "ramda";

const Success = Validation.Success;
const Failure = Validation.Failure;

const messageAndPredicatePairs = toPairs
const message = head;
const predicate = last;

const validate = (command, validations) => {
  const runValidation = (errors, validation) =>
    predicate(validation)(command) ? errors : append(message(validation), errors);

  const wrapResults = errors =>
    isEmpty(errors) ? Success(command) : Failure(errors);

  return pipe(
    messageAndPredicatePairs,
    reduce(runValidation, []),
    wrapResults
  )(validations);
};

export {
  validate,
  Success,
  Failure
};


