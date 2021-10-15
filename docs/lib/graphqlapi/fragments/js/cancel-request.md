## CANCEL API requests

You may cancel any query or mutation request made through API category by keeping a reference to the promise returned.

```javascript
const promise = API.graphql(graphqlOperation(...));

try {
    await promise;
} catch (error) {
    console.log(error); 
    // If the error is because the request was cancelled we can confirm here.
    if(API.isCancel(error)) {
        console.log(error.message); // "my message for cancellation"
        // handle user cancellation logic
    }
}

...

// To cancel the above request
API.cancel(promise, "my message for cancellation");
```

You need to ensure that the promise returned from `API.graphql()` has not been modified. Typically async functions wrap the promise being returned into another promise. For example, the following will not work

```javascript
async function makeAPICall() {
    return API.graphql(graphqlOperation(...));
}
const promise = makeAPICall();


// The following will NOT cancel the request.
API.cancel(promise, "my error message");
```
