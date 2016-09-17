# Bravent 🏂

[![build status](https://travis-ci.org/vvgomes/bravent.svg?branch=master)](https://travis-ci.org/vvgomes/bravent)
[![npm version](https://img.shields.io/npm/v/bravent.svg)](https://www.npmjs.com/package/bravent)

Bravent is an [Event Sourcing](http://martinfowler.com/eaaDev/EventSourcing.html) micro framework for Javascript. It is inspired by the [Functional Data](https://vimeo.com/131636650) idea by Greg Young. The goal is to define the abstractions needed for an event sourced application in terms of pure functions and immutable data structures.

## Getting Started

```
$ npm install bravent --save
```

```javascript
import { defineAggregate } from "bravent";

const Counter = defineAggregate({
  initialState: 0,
  eventHandlers: {
    counterIncremented: (state, event) => state + 1,
    counterDecremented: (state, event) => state - 1
  },
  commandHandlers: {
    incrementCounter: (state, command) => [{ type: "counterIncremented" }],
    decrementCounter: (state, command) => [{ type: "counterDecremented" }]
  }
});

// Bravent doesn't impose how you store your events.
let events = [];

// An aggregate instance is a container, like a functor.
const counter = Counter.of(events);
console.log(counter.state()); // => 0

// Dispatching a command returns a new aggregate instance.
// There are no side effects on the original aggregate.
const newCounter =
  counter
    .dispatch({ type: "incrementCounter" })
    .dispatch({ type: "decrementCounter" })
    .dispatch({ type: "incrementCounter" })
    .dispatch({ type: "incrementCounter" });

console.log(newCounter.state()); // => 2

// You can pass callbacks when dispatching commands.
const onSuccess = (newEvents) => console.log("New events:", newEvents);
const onFailure = (errors) => console.log("Errors:", errors);

newCounter.dispatch({ type: "incrementCounter" }, onSuccess, onFailure);
// => New events: [{ type:"counterIncremented" }]

```

For a complete running example, see [bravent-todo](https://github.com/vvgomes/bravent-todo). More documentation coming soon.

## License

Feel free to use this code as you please.
