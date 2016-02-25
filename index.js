'use strict';

/**
 * @param {function|undefined} cbAfterTimedOut (optional) called when original
 *     callback is called after already timed out.
 *     Use cbAfterTimedOut for logging purpose only.
 */
function makeCallback(timeoutMs, callback, cbAfterTimedOut) {
    var called = false;
    var timedOut = false;

    if(typeof timeoutMs === 'function'){
        cbAfterTimedOut = callback;
        callback = timeoutMs;
        timeoutMs = 30 * 1000;
    }
    cbAfterTimedOut = cbAfterTimedOut || function () {};

    var timer = setTimeout(function onTimeout() {
        if (called)
            return;

        timedOut = true;
        timer = undefined;

        callback(new Error('callback timeout'));
    }, timeoutMs);

    return function cbWrapper() {
        if (called)
            return;

        called = true;

        if(timedOut) {
            cbAfterTimedOut.apply(this, arguments);
            return;
        }

        clearTimeout(timer);
        timer = undefined;

        callback.apply(this, arguments);
    };
}

module.exports = makeCallback;
