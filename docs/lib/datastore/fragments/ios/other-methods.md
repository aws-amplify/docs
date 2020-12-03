## Clear

To clear local data from DataStore, use the `clear` method:

```swift
Amplify.DataStore.clear { result in
    switch result {
    case .success:
        print("DataStore cleared")
    case .failure(let error):
        print("Error clearing DataStore:  \(error)")
    }
}
<amplify-callout>

If your app uses authentication, it is recommended to call `DataStore.clear()` on sign-in or sign-out to remove any user-specific data. In scenarios where a mobile device can be shared by several users, calling `DataStore.clear()` will ensure that data does not leak from one user to another.

</amplify-callout>

## Start

Synchronization starts automatically whenever you run any DataStore operation (`query()`, `save()`, `delete()`, `observe()`.) You can also explicitly begin the process with `DataStore.start()`:

```swift
Amplify.DataStore.start { result in
    switch result {
    case .success:
        print("DataStore started")
    case .failure(let error):
        print("Error starting DataStore: \(error)")
    }
}
```

## Stop

To stop the DataStore sync process, you can use `DataStore.stop()`.  This ensures the real time subscription connection is closed when your app is no longer interested in updates, such as when you application is closed.  This can also be used to modify [DataStore sync expressions](~/lib/datastore/sync.md) at runtime by calling `stop()`, then `start()` to force your sync expressions to be re-evaluated.

```swift
Amplify.DataStore.stop { result in
    switch result {
    case .success:
        print("DataStore stopped")
    case .failure(let error):
        print("Error stopping DataStore: \(error)")
    }
}
```
