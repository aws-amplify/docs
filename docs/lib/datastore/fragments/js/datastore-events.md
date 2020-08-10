Amplify uses `Hub` for different categories to communicate with one another when specific events occur. DataStore emits `Hub` messages for the following events:

```
storageSubscribed
subscriptionsEstablished
syncQueriesStarted
syncQueriesReady
modelSynced
outboxMutationEnqueued
outboxMutationProcessed
outboxStatus
networkStatus
ready
```

For instance, to listen to see if the network status is active, you could set up the following listener:

```js
// Create listener
listener = Hub.listen('datastore', async hubData => {
  const  { event, data } = hubData.payload;
  if (event === 'networkStatus') {
    console.log(`User has a network connection? ${data.active}`)
  }
})

// Remove listener
listener();
```

To wait for the entire sync process to finish, you can listen for the `ready` event:

```js
// Create listener
listener = Hub.listen("datastore", async hubData => {
  const  { event, data } = hubData.payload;
  if (event === "ready") {
    // do something here once the data is synced from the cloud
  }
})

// Remove listener
listener();
```