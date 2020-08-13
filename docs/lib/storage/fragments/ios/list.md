You can list all of the objects uploaded:

<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
Amplify.Storage.list { event in
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

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
let sink = Amplify.Storage.list()
    .resultPublisher
    .sink {
        if case let .failure(storageError) = $0 {
            print("Failed: \(storageError.errorDescription). \(storageError.recoverySuggestion)")
        }
    }
    receiveValue: { listResult in
        print("Completed")
        listResult.items.forEach { item in
            print("Key: \(item.key)")
        }
    }
```

</amplify-block>

</amplify-block-switcher>
