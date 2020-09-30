Amplify uses `Hub` for different categories to communicate with one another when specific events occur. DataStore emits `Hub` messages for the following events:

## networkStatus

Dispatched when DataStore starts and every time network status changes

HubPayload `NetworkStatusEvent` contains a boolean value `active` to notify network status
```
{ active: true }
```

## subscriptionsEstablished

Dispatched when DataStore has finished establishing its subscriptions to all sync-able models

HubPayload: `N/A`

## syncQueriesStarted

Dispatched when DataStore is about to start sync queries

HubPayload `syncQueriesStartedEvent` contains an array of each model's `name`
```
{ "models": ["Post", "Comment"] }
```

## modelSynced

Dispatched once for each model after the model instances have been synced from the cloud.

HubPayload `modelSyncedEvent` contains:
- `modelName` (String): the name of the model that was synced
- `isFullSync` (Bool): `true` if the model was synced with a "full" query to retrieve all models
- `isDeltaSync` (Bool): `true` if the model was synced with a "delta" query to retrieve only changes since the last sync
- `create` (Int): the number of new model instances added to the local store
- `update` (Int): the number of existing model instances updated in the local store
- `delete` (Int): the number of model instances deleted from the local stor
```
{
    "modelName": "Note",
    "isFullSync": false,
    "isDeltaSync": true,
    "create": 20,
    "update": 6,
    "delete": 2
}
```

## syncQueriesReady

Dispatched when all models have been synced from the cloud

HubPayload: `N/A`

## ready

Dispatched when DataStore as a whole is ready, at this point all data is available

HubPayload: `N/A`

## outboxMutationEnqueued

Dispatched when a local mutation is enqueued into the outgoing mutation queue `outbox`

HubPayload `outboxMutationEvent` contains the name and instance of the model
```
{
    "modelName": "Note",
    "element": {
        "model": Model
    }
}
```

## outboxMutationProcessed

Dispatched when a mutation from outgoing mutation queue `outbox` is sent to backend and updated locally.

HubPayload `outboxMutationEvent` contains the name and instance of the model
```
{
    "modelName": "Note",
    "element":{
        "model": Model
        "_version": 1,
        "_lastChangedAt": 1594938571692,
        "_deleted": null
    }
}
```

## outboxStatus

Dispatched when:
- the DataStore starts
- each time a local mutation is enqueued into the outbox
- each time a local mutation is finished processing

HubPayload `OutboxStatusEvent` contains a boolean value `isEmpty` to notify if there are mutations in the outbox
```
{ isEmpty: true }
```