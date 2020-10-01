Making use of Amplify’s `Hub` category, DataStore publishes events to the `datastore` channel notifying its internal state and providing a payload with additional data pertaining the event being notified. So that customers listen for events on `datastore` channel, and react to those events.

DataStore events can tell what internal state your App is at: 
* The client device goes offline / comes back online
* Data is synchronized
* There are outgoing changes not yet synchronized

There are following nine DataStore events:

## networkStatus

Dispatched when DataStore starts and every time network status changes

HubPayload `NetworkStatusEvent` contains:
- `active` (Bool): a boolean value to notify network status

## subscriptionsEstablished

Dispatched when DataStore has finished establishing its subscriptions to all models

HubPayload: `N/A`

## syncQueriesStarted

Dispatched when DataStore is about to start sync queries

HubPayload `syncQueriesStartedEvent` contains: an array of each model's `name`
- `models` ([String]): an array of each model's `name`

## modelSynced

Dispatched once for each model after the model instances have been synced from the cloud.

HubPayload `modelSyncedEvent` contains:
- `modelName` (String): the name of the model that was synced
- `isFullSync` (Bool): `true` if the model was synced with a "full" query to retrieve all models
- `isDeltaSync` (Bool): `true` if the model was synced with a "delta" query to retrieve only changes since the last sync
- `create` (Int): the number of new model instances added to the local store
- `update` (Int): the number of existing model instances updated in the local store
- `delete` (Int): the number of model instances deleted from the local stor

## syncQueriesReady

Dispatched when all models have been synced from the cloud

HubPayload: `N/A`

## ready

Dispatched when DataStore as a whole is ready, at this point all data is available

HubPayload: `N/A`

## outboxMutationEnqueued

Dispatched when a local mutation is enqueued into the outgoing mutation queue `outbox`

HubPayload `outboxMutationEvent` contains:
- `modelName` (String): the model name of the mutation that was enqueued,
- `element`: 
    - `model` (Model): the instance of your model


## outboxMutationProcessed

Dispatched when a mutation from outgoing mutation queue `outbox` is sent to backend and updated locally.

HubPayload `outboxMutationEvent` contains: the name and instance of the model
- `modelName` (String): the model name of the mutation that was enqueued,
- `element`: 
    - `model` (Model): the instance of your model
    - `_version` (Int): version of the model instance
    - `_lastChangedAt` (Int): last change time of model instance (epoch time)
    - `_deleted` (Bool): whether the model instance is deleted or not

## outboxStatus

Dispatched when:
- the DataStore starts
- each time a local mutation is enqueued into the outbox
- each time a local mutation is finished processing

HubPayload `OutboxStatusEvent` contains: 
- `isEmpty` (Bool): a boolean value to notify if there are mutations in the outbox

## Usage
For instance, to see if the network status is active, you could set up the following listener: