# Bravent 🏂

[![Build Status](https://travis-ci.org/vvgomes/bravent.svg?branch=master)](https://travis-ci.org/vvgomes/bravent)

Bravest is an [Event Sourcing](http://martinfowler.com/eaaDev/EventSourcing.html) micro framework for Javascript. It is inspired on the [Functional Data](https://vimeo.com/131636650) idea by @gregoryyoung. The goal is to define the abstractions needed for an event sourced application in terms of pure functions and immutable data structures.

## Getting Started

```
$ npm install bravent
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
console.log("current state:", counter.state()); // => 0

counter
  .dispatch({ type: "incrementCounter" })
  .dispatch({ type: "decrementCounter" })
  .dispatch({ type: "incrementCounter" })
  .dispatch({ type: "incrementCounter" });
  
console.log("current state:", counter.state()); // => 2

```

More description to come soon.
