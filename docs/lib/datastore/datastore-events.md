---
title: DataStore Events
description: Listening to DataStore events
---

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

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/datastore-events.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/datastore-events.md"></inline-fragment>
