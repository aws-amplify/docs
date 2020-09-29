Amplify uses `Hub` for different categories to communicate with one another when specific events occur. DataStore emits `Hub` messages for the following events:

```
/// Dispatched when DataStore starts and every time network status changes
/// HubPayload `NetworkStatusEvent` contains a boolean value `active` to notify network status
networkStatus

/// Dispatched when DataStore has finished establishing its subscriptions to all sync-able models
subscriptionsEstablished

/// Dispatched when DataStore is about to start sync queries
/// HubPayload `syncQueriesStartedEvent` contains an array of each model's `name`
syncQueriesStarted

/// Dispatched once for each model after the model instances have been synced from the cloud.
/// HubPayload `modelSyncedEvent` contains:
/// - `modelName` (String): the name of the model that was synced
/// - `isFullSync` (Bool): `true` if the model was synced with a "full" query to retrieve all models
/// - `isDeltaSync` (Bool): `true` if the model was synced with a "delta" query to retrieve only changes since the last sync
/// - `createCount` (Int): the number of new model instances added to the local store
/// - `updateCount` (Int): the number of existing model instances updated in the local store
/// - `deleteCount` (Int): the number of model instances deleted from the local store
modelSynced

/// Dispatched when all models have been synced
syncQueriesReady

/// Dispatched when DataStore as a whole is ready, at this point all data is available
ready

/// Dispatched when a local mutation is enqueued into the outgoing mutation queue `outbox`
/// HubPayload `outboxMutationEvent` contains the name and instance of the model
outboxMutationEnqueued

/// Dispatched when a mutation from outgoing mutation queue `outbox` is sent to backend and updated locally.
/// HubPayload `outboxMutationEvent` contains the name and instance of the model
outboxMutationProcessed

/// Dispatched when:
/// - the DataStore starts
/// - each time a local mutation is enqueued into the outbox
/// - each time a local mutation is finished processing
/// HubPayload `OutboxStatusEvent` contains a boolean value `isEmpty` to notify if there are mutations in the outbox
outboxStatus
```