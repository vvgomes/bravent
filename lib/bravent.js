import defineAggregate from "./aggregate";
import validate from "./validate";
import Validation from "data.validation";

const Success = Validation.Success;
const Failure = Validation.Failure;

export { defineAggregate, validate, Success, Failure };
