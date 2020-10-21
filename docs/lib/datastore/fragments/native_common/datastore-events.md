DataStore periodically publishes state notifications onto Amplify's Hub. You can subscribe to the Hub to gain insight into the internal state of the DataStore. Events are published when:
* Your device loses or regains network connectivity;
* Data is synchronized with the Cloud;
* There are new, pending changes that are have not yet been synchronized.
The following nine DataStore events are defined:

## networkStatus

Dispatched when DataStore starts and every time network status changes

HubPayload `NetworkStatusEvent` contains:
- `active` (Bool): true if the DataStore is on a network that can connect the Cloud; false, otherwise

## subscriptionsEstablished

Dispatched when DataStore has finished establishing its subscriptions to all models

HubPayload: `N/A`

## syncQueriesStarted

Dispatched when DataStore is about to perform its initial sync queries

HubPayload `syncQueriesStartedEvent` contains:
- `models` ([String]): an array of each model's `name`

## modelSynced

Dispatched once for each model after the model instances have been synced from the cloud

HubPayload `modelSyncedEvent` contains:
- `modelName` (String): the name of the model that was synced
- `isFullSync` (Bool): `true` if the model was synced with a "full" query to retrieve all models
- `isDeltaSync` (Bool): `true` if the model was synced with a "delta" query to retrieve only changes since the last sync
- `added` (Int): the number of new model instances added to the local store
- `updated` (Int): the number of existing model instances updated in the local store
- `deleted` (Int): the number of model instances deleted from the local stor

## syncQueriesReady

Dispatched when all models have been synced from the cloud

HubPayload: `N/A`

## ready

Dispatched when DataStore as a whole is ready, at this point all data is available

HubPayload: `N/A`

## outboxMutationEnqueued

Dispatched when a local change has been newly staged for synchronization with the Cloud

HubPayload `outboxMutationEvent` contains:
- `modelName` (String): the name of the model that is awaiting publication to the Cloud
- `element`: 
    - `model` (Model): the model instance that will be published


## outboxMutationProcessed

Dispatched when a local change has finished synchronization with the Cloud and is updated locally

HubPayload `outboxMutationEvent` contains:
- `modelName` (String): the name of the model that has finished processing
- `element`: 
    - `model` (Model): the model instance that is processed
    - `_version` (Int): version of the model instance
    - `_lastChangedAt` (Int): last change time of model instance (unix time)
    - `_deleted` (Bool): true if the model instance has been deleted in Cloud

## outboxStatus

Dispatched when:
- the DataStore starts
- each time a local mutation is enqueued into the outbox
- each time a local mutation is finished processing

HubPayload `OutboxStatusEvent` contains: 
- `isEmpty` (Bool): a boolean value indicating that there are no local changes still pending upload to the Cloud

## Usage
To see if the network status is active, you could set up the following listener: