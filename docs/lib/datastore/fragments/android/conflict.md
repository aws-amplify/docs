DataStore has a few optional configurations, such as the ability to specify a custom handler for error messages that take place in any part of the system. You can also specify a custom conflict handler that runs if a mutation is rejected by AWS AppSync during one of the conflict resolution strategies.

Finally you can configure the number of records to sync as an upper bound on items (per-Model) which will be stored locally on the device, as well as a custom interval in minutes which is an override of the default 24 hour "base query" which runs as part of the Delta Sync process.

### Example

The code below illustrates a conflict resolution handler for the `Post` model that retries a mutation with the same title, but the most recent remote data for all other fields. The conflict resolution handler discards conflicts for all other models (by passing `.applyRemote` to the `resolve` function).

<amplify-block-switcher>
<amplify-block name="Java">

```java
DataStoreConfiguration config = DataStoreConfiguration.builder()
    .dataStoreErrorHandler(error -> Log.e("YourApp", "Error.", error))
    .dataStoreConflictHandler((conflictData, onDecision) -> {
        if (conflictData.getRemote().getModel() instanceof Post) {
            Post remote = (Post) conflictData.getRemote().getModel();
            Post local = (Post) conflictData.getLocal().getModel();
            Post patched = remote.copyOfBuilder()
                .title(local.getTitle())
                .build();
            onDecision.accept(ConflictResolutionDecision.retry(patched));
        } else {
            onDecision.accept(ConflictResolutionDecision.applyRemote());
        }
    })
    .syncIntervalInMinutes(TimeUnit.DAYS.toMinutes(1))
    .syncMaxRecords(10_000)
    .syncPageSize(1_000)
    .build();
AWSDataStorePlugin dataStorePlugin = new AWSDataStorePlugin(config);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
val config = DataStoreConfiguration.builder()
    .dataStoreErrorHandler { Log.e("YourApp", "Error.", it) }
    .dataStoreConflictHandler { conflictData, onDecision ->
        if (conflictData.remote.model is Post) {
            val updatedPost = (conflictData.remote.model as Post)
                .copyOfBuilder()
                .title((conflictData.local.model as Post).title)
                .build()
            onDecision.accept(ConflictResolutionDecision.retry(updatedPost))
        } else {
            onDecision.accept(ConflictResolutionDecision.applyRemote())
        }
    }
    .syncIntervalInMinutes(TimeUnit.DAYS.toMinutes(1))
    .syncMaxRecords(10_000)
    .syncPageSize(1_000)
    .build()
val dataStorePlugin = AWSDataStorePlugin(config)
```

</amplify-block>
</amplify-block-switcher>

