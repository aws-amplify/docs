There are three ways of getting data that was previously uploaded:

### Download data

You can download to in-memory buffer [Data](https://developer.apple.com/documentation/foundation/data) object with `Amplify.Storage.downloadData`:

<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
Amplify.Storage.downloadData(
    key: "myKey", 
    progressListener: { progress in
        print("Progress: \(progress)")
    }, resultListener: { (event) in
        switch event {
        case let .success(data):
            print("Completed: \(data)")
        case let .failure(storageError):
            print("Failed: \(storageError.errorDescription). \(storageError.recoverySuggestion)")
    }
})
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
let storageOperation = Amplify.Storage.downloadData(key: "myKey")
let progressSink = storageOperation.progressPublisher.sink { progress in print("Progress: \(progress)") }
let resultSink = storageOperation.resultPublisher.sink {
    if case let .failure(storageError) = $0 {
        print("Failed: \(storageError.errorDescription). \(storageError.recoverySuggestion)")
    }
}
receiveValue: { data in
    print("Completed: \(data)")
}
```

</amplify-block>

</amplify-block-switcher>

### Download to file

You can download to a file [URL](https://developer.apple.com/documentation/foundation/url) with `Amplify.Storage.downloadFile`:

<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
let downloadToFileName = FileManager.default.urls(for: .documentDirectory,
                                                  in: .userDomainMask)[0]
    .appendingPathComponent("myFile.txt")

Amplify.Storage.downloadFile(
    key: "myKey",
    local: downloadToFileName,
    progressListener: { progress in
        print("Progress: \(progress)")
    }, resultListener: { event in
        switch event {
        case .success:
            print("Completed")
        case .failure(let storageError):
            print("Failed: \(storageError.errorDescription). \(storageError.recoverySuggestion)")
        }
    })
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
let downloadToFileName = FileManager.default.urls(for: .documentDirectory,
                                                  in: .userDomainMask)[0]
    .appendingPathComponent("myFile.txt")
let storageOperation = Amplify.Storage.downloadFile(key: "myKey", local: downloadToFileName)
let progressSink = storageOperation.progressPublisher.sink { progress in print("Progress: \(progress)") }
let resultSink = storageOperation.resultPublisher.sink {
    if case let .failure(storageError) = $0 {
        print("Failed: \(storageError.errorDescription). \(storageError.recoverySuggestion)")
    }
}
receiveValue: {
    print("Completed")
}
```

</amplify-block>

</amplify-block-switcher>

### Generate a download URL

You can also retrieve a URL for the object in storage:

<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
Amplify.Storage.getURL(key: "myKey") { event in
    switch event {
    case let .success(url):
        print("Completed: \(url)")
    case let .failure(storageError):
        print("Failed: \(storageError.errorDescription). \(storageError.recoverySuggestion)")
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
let sink = Amplify.Storage.getURL(key: "myKey")
    .resultPublisher
    .sink {
        if case let .failure(storageError) = $0 {
            print("Failed: \(storageError.errorDescription). \(storageError.recoverySuggestion)")
        }
    }
    receiveValue: { url in
        print("Completed: \(url)")
    }
```

</amplify-block>

</amplify-block-switcher>
