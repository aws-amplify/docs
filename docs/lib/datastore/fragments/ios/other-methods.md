## Clear

To clear local data from DataStore, use the `clear` method:

```swift
Amplify.DataStore.clear { (result) in
    switch(result){
    case .success:
        print("DataStore cleared")
    case .failure(let error):
        print("Error clearing DataStore:  \(error)")
    }
}
```
<amplify-callout>

If your app has authentication implemented, it is recommended to call `DataStore.clear()` on signin/signout to remove any user-specific data. This method is often important to use for shared device scenarios or where you need to purge the local on-device storage of records for security/privacy concerns.

</amplify-callout>

## Start

Synchronization starts automatically whenever you run any DataStore operation (`query()`, `save()`, `delete()`, `observe()`) however you can explicitly begin the process with `DataStore.start()`:

```swift
Amplify.DataStore.start { (result) in
    switch(result) {
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
