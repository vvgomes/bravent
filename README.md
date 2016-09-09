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
    decrementCounter: (state, command) => [{ type: "counterDecremented" }],
  }
});

events = []; // any event store

const counter = Counter.of(events);
console.log(counter.state()); // => 0

const newCounter =
  counter
    .dispatch({ type: "incrementCounter" })
    .dispatch({ type: "decrementCounter" })
    .dispatch({ type: "incrementCounter" })
    .dispatch({ type: "incrementCounter" });
  
console.log(newCounter.state()); // => 2

```

For a complete running example, see [bravent-todo](https://github.com/vvgomes/bravent-todo). More documentation coming soon.

## License

Feel free to use this code as you please.
