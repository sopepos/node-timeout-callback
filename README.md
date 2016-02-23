Forked from https://github.com/jakubknejzlik/node-timeout-callback

---
###changes
* support additional callback argument (optional) : (timeoutMs, callback, **cbAfterTimedOut**)
  * **cbAfterTimedOut** is called when original callback is called after already timed out.

----
When working with socket.io emitted message with callback, if the socket disconnect before answering (or doesn't answer at all) the callback function hangs up forever. In these situations you need to timeout this callback.

This wrapper makes this task easy. Just do:

	var timeoutCallback = require('cb-timeout');

	socket.emit('message-expecting-answer', timeoutCallback(function(err,arg1,arg2) {
		console.log('this log is always displayed!');
	}, function(err) {
		console.log('this log will be displayed when original callback is called after already timed out.');
	}));



By default timeout is set to 30 seconds, you can change this interval by specifying timeout as first argument (in milliseconds)

	timeoutCallback(60*1000, myCallbackFunction);

If the timeout is reached, the callback is called with error ```new Error('callback timeout')``` as the first argument.