You may cancel any `put`, `get`, or `copy` requests made by the Storage API by keeping a
reference to the promise returned.

```javascript
const promise = Storage.get('key');

Storage.cancel(promise, "my message for cancellation");

try {
	await promise;
} catch (error) {
	console.error(error);
	// We can confirm the error is thrown by the cancellation here
	if (Storage.isCancelError(error)) {
		console.error(error.message); // "my message for cancellation"
	}
}
```

## Caveat
Since the cancellation requires original reference of the promise, you need to
make sure the return value of the request has not been modified. Usually `async` function
wraps the promise being returned into another promise. For example
```javascript
async function makeRequest() {
	return Storage.get('key');
}
const promise = makeRequest();

// This won't cancel the request
Storage.cancel(promise);
```
