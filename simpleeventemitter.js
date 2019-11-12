export class SimpleEventEmitter {
    constructor () {
        /**
         * Internal storage for the event listeners, keyed by event name
         * @type {Map}
         * @private
         */
        this._events = new Map();
    }

    /**
     * Call to start listening to the specified event on this object.
     * When it occurs, call the specified listener function.
     * @param {string} eventName - The name of the event to listen to
     * @param {Function} listener - The function to call when the event occurs
     * @returns {Function} - A self-contained function to stop listening to this event
     */
    on (eventName, listener) {
        let events = this._events.get(eventName);

        if (events == null) {
            // if the event doesn't already exist, add one.
            events = [];
            this._events.set(eventName, events);
        }

        // add the specified listener function to the listeners for this event.
        events.push(listener);

        // return a self-contained function to remove the subscription.
        return () => {
            // filter out this event when the return function is called.
            this.off(eventName, listener);
        }
    }

    /**
     * Call to stop listening to the specified event with the specified listener function.
     * @param {string} eventName - The name of the event to stop listening to
     * @param {Function} listener - The function reference used to listen to the event
     */
    off (eventName, listener) {
        // filter out this event when the return function is called.
        const events = this._events.get(eventName);
        if (events == null) {
            return;
        }

        /**
         * The index of the listener function in the event listeners array
         * @type {number}
         */
        let index = events.indexOf(listener);

        if (index > -1) {
            // we have found the listener - remove it in-place
            events.splice(index, 1);
        }
    }

    /**
     * Call to trigger the listener functions that are subscribed for the specified event
     * @param {string} eventName
     * @param {Array} args - Array of arguments
     */
    triggerEvent (eventName, args) {
        // get any array of listener functions for the specified event
        const listeners = this._events.get(eventName);

        if (listeners == null) {
            // we can't assume that anything is actually listening for this event...
            return;
        }

        // keep an array of results in case it is needed by the emitter
        const results = [];

        // call each listener, in turn, with the data provided
        listeners.forEach((listener) => {
            // call each listener function, passing in the specified arguments array as arguments
            results.push(listener.apply(null, args || []));
        });

        return results;
    }

    /**
     * Call to trigger the listener functions subscribed for the specified event with any other arguments passed
     * @param {string} eventName - The name of the event to trigger
     * @returns {Array} - Array of results from all listeners
     */
    emit (eventName) {
        // remove the event name from the arguments and any other parameters passed to this function will be passed
        // to the event listener functions as an Array.
        const args = Array.prototype.slice.call(arguments, 1);

        // call the method to trigger the listeners for this event.
        return this.triggerEvent(eventName, args);
    }
}