```js
const subscription = DataStore.observe(Post).subscribe(msg => {
  console.log(msg.model, msg.opType, msg.element);
});
```

<amplify-callout>

The `observe` function is asynchronous; however, you should use `await` like the other DataStore API methods since it is a long running task and you should make it non-blocking (i.e. code after the `DataStore.observe()` call should not wait for its execution to finish).

</amplify-callout>
