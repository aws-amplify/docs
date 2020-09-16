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