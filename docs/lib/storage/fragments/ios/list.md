You can list all of the objects uploaded:

```swift
_ = Amplify.Storage.list { event in
    switch event {
    case let .success(listResult):
        print("Completed")
        listResult.items.forEach { item in
            print("Key: \(item.key)")
        }
    case let .failure(storageError):
        print("Failed: \(storageError.errorDescription). \(storageError.recoverySuggestion)")
    }
}
```
