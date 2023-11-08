```js
// Create listener
const listener = Hub.listen('datastore', async hubData => {
  const  { event, data } = hubData.payload;
  if (event === 'networkStatus') {
    console.log(`User has a network connection: ${data.active}`)
  }
})

// Remove listener
listener();
```

To wait for the entire sync process to finish, you can listen for the `ready` event:

```js
// Create listener
const listener = Hub.listen("datastore", async hubData => {
  const  { event, data } = hubData.payload;
  if (event === "ready") {
    // do something here once the data is synced from the cloud
  }
})

// Remove listener
listener();
```

Here is an illustrative sample of events and payloads that happen when you start from an empty DataStore and start a sync. If you do:

```js
await DataStore.clear();
await DataStore.start();
```

This gets logged:

```bash
Event:  {"channel":"datastore","payload":{"event":"storageSubscribed"},"source":"","patternInfo":[]}

Event:  {"channel":"datastore","payload":{"event":"networkStatus","data":{"active":true}},"source":"","patternInfo":[]}

Event:  {"channel":"datastore","payload":{"event":"outboxStatus","data":{"isEmpty":true}},"source":"","patternInfo":[]}

Event:  {"channel":"datastore","payload":{"event":"subscriptionsEstablished"},"source":"","patternInfo":[]}

Event:  {"channel":"datastore","payload":{"event":"syncQueriesStarted","data":{"models":["ModelX","ModelY","ModelLala"]}},"source":"","patternInfo":[]}

Event:  {"channel":"datastore","payload":{"event":"modelSynced","data":{"isFullSync":true,"isDeltaSync":false,"counts":{"new":5,"updated":0,"deleted":2}}},"source":"","patternInfo":[]}

Event:  {"channel":"datastore","payload":{"event":"modelSynced","data":{"isFullSync":true,"isDeltaSync":false,"counts":{"new":296,"updated":0,"deleted":2}}},"source":"","patternInfo":[]}

Event:  {"channel":"datastore","payload":{"event":"modelSynced","data":{"isFullSync":true,"isDeltaSync":false,"counts":{"new":8155,"updated":0,"deleted":0}}},"source":"","patternInfo":[]}

Event:  {"channel":"datastore","payload":{"event":"syncQueriesReady"},"source":"","patternInfo":[]}

Event:  {"channel":"datastore","payload":{"event":"ready"},"source":"","patternInfo":[]}
```
