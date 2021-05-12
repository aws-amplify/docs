---
title: DataStore Events
description: Listening to DataStore events
---

DataStore periodically publishes state notifications onto Amplify's Hub. You can subscribe to the Hub to gain insight into the internal state of the DataStore. Events are published when:
* Your device loses or regains network connectivity;
* Data is synchronized with the Cloud;
* There are new, pending changes that have not yet been synchronized.

The following nine DataStore events are defined:

## networkStatus

Dispatched when DataStore starts and every time network status changes

HubPayload `NetworkStatusEvent` contains:
- `active` (Bool): true if the DataStore is on a network that can connect the Cloud; false, otherwise

## subscriptionsEstablished

Dispatched when DataStore has finished establishing its subscriptions to all models

HubPayload: N/A

## syncQueriesStarted

Dispatched when DataStore is about to perform its initial sync queries

HubPayload `syncQueriesStartedEvent` contains:
- `models` ([String]): an array of each model's `name`

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/datastore-events/model-synced.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/native_common/datastore-events/model-synced.md"></inline-fragment>
<inline-fragment platform="flutter" src="~/lib/datastore/fragments/native_common/datastore-events/model-synced.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/native_common/datastore-events/model-synced.md"></inline-fragment>

## syncQueriesReady

Dispatched when all models have been synced from the cloud

HubPayload: N/A

## ready

Dispatched when DataStore as a whole is ready, at this point all data is available

HubPayload: N/A

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/datastore-events/outbox-mutation-enqueued.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/native_common/datastore-events/outbox-mutation-enqueued.md"></inline-fragment>
<inline-fragment platform="flutter" src="~/lib/datastore/fragments/native_common/datastore-events/outbox-mutation-enqueued.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/native_common/datastore-events/outbox-mutation-enqueued.md"></inline-fragment>

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/datastore-events/outbox-mutation-processed.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/native_common/datastore-events/outbox-mutation-processed.md"></inline-fragment>
<inline-fragment platform="flutter" src="~/lib/datastore/fragments/native_common/datastore-events/outbox-mutation-processed.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/native_common/datastore-events/outbox-mutation-processed.md"></inline-fragment>

## outboxStatus

Dispatched when:
- the DataStore starts
- each time a local mutation is enqueued into the outbox
- each time a local mutation is finished processing

HubPayload `OutboxStatusEvent` contains: 
- `isEmpty` (Bool): a boolean value indicating that there are no local changes still pending upload to the Cloud

## Usage
To see if the network status is active, you could set up the following listener:

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/datastore-events.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/datastore-events.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/datastore-events.md"></inline-fragment>
<inline-fragment platform="flutter" src="~/lib/datastore/fragments/flutter/datastore-events.md"></inline-fragment>
