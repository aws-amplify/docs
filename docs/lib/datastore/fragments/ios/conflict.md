DataStore has a few optional configurations, such as the ability to specify a custom handler for error messages that take place in any part of the system. You can also specify a custom conflict handler that runs if a mutation is rejected by AWS AppSync during one of the conflict resolution strategies.

Finally you can configure the number of records to sync as an upper bound on items (per-Model) which will be stored locally on the device, as well as a custom interval in minutes which is an override of the default 24 hour "base query" which runs as part of the Delta Sync process.

### Example

<amplify-callout>

**Note:** this API is under development and it is not generally available yet.

</amplify-callout>

The code below illustrates a conflict resolution handler for the `Post` model that retries a mutation with the same title, but the most recent remote data for all other fields. The conflict resolution handler discards conflicts for all other models (by passing `.discard` to the `resolve` function).

```swift
// custom conflict resolution configuration
Amplify.add(plugin: AWSDataStorePlugin(schema: schema, configuration: .custom(
    conflictHandler: { (data, resolve) in
        let (local, remote) = data

        guard let localPost = local as? Post, let remotePost as? Post {
            .resolve(.discard)
        }

        // always favor the title from the local post
        let mergedModel = Post(title: localPost.title,
                               rating: remotePost.rating,
                               status: remotePost.status)
        resolve(.new(mergedModel))
    },
    errorHandler: { error in
        Amplify.Logging.error(error: error)
    },
    syncInterval: 1_440,
    syncMaxRecords: 10_000,
    syncPageSize: 1_000
)))
```
