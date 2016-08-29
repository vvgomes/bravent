import R from "ramda";

const defineState = (apply, initialState) =>
  (events) => R.reduce(apply, initialState, events);

export default defineState;


