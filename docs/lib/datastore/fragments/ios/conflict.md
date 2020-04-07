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

<amplify-callout>

**Note:** this API is under development and it is not generally available yet.

</amplify-callout>
