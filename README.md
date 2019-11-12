# SimpleEventEmitter

A simple class to extend any object to support simple events.

#API
##Exenting a class with SimpleEventEmitter

To make any class support simple events, `extend` the class with `SimpleEventEmitter`:

```
class ClassObject extends SimpleEventEmitter {
    constructor () {
        super();
    }
}
```

Any instance that is created from `ClassObject` will support the methods and features of SimpleEventEmitter. 

##on
```classObject.on('eventName', listenerFunction);```

Use to subscribe to an emitted event, specifying event name and a listener function.

This will return a function that, if executed, will automatically unsubscribe the listener!

```
let unsubscribe = classObject.on('eventName', listenerFunction);

// do things here...

unsubscribe();  // the listener is released!
```

##off
```classObject.off('eventName', listenerFunction);```

Explicitly unsubscribe to a listened event that triggers the `listenerFunction`.

##emit
This method is the mechanism for the class object to raise events to any listeners. It takes any number of parameters, but the first one must be the event name being triggered.

```
class ClassObject extends SimpleEventEmitter {
    constructor () {
        super();
    }

    doTheThing () {
        // do the thing...

        // raise the event that we did the thing.
        this.emit('didTheThing', 'data1', 'data2', 'more data');
    }
}
```