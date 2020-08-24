Delete an object uploaded to S3 by using `Amplify.Storage.remove` and specify the key:

<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
Amplify.Storage.remove(key: "myKey") { event in
    switch event {
    case let .success(data):
        print("Completed: Deleted \(data)")
    case let .failure(storageError):
        print("Failed: \(storageError.errorDescription). \(storageError.recoverySuggestion)")
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
let sink = Amplify.Storage.remove(key: "myKey")
    .resultPublisher
    .sink {
        if case let .failure(storageError) = $0 {
            print("Failed: \(storageError.errorDescription). \(storageError.recoverySuggestion)")
        }
    }
    receiveValue: { data in
        print("Completed: Deleted \(data)")
    }
```

</amplify-block>

</amplify-block-switcher>
