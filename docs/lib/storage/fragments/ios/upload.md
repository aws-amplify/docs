To upload to S3 from a data object, specify the `key` and the `data` object to be uploaded.

<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
let dataString = "My Data"
let data = dataString.data(using: .utf8)!
Amplify.Storage.uploadData(
    key: "ExampleKey",
    data: data,
    progressListener: { progress in
        print("Progress: \(progress)")
    }, resultListener: { event in
        switch event {
        case .success(let data):
            print("Completed: \(data)")
        case .failure(let storageError):
            print("Failed: \(storageError.errorDescription). \(storageError.recoverySuggestion)")
        }
    }
)
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
let dataString = "My Data"
let data = dataString.data(using: .utf8)!
let storageOperation = Amplify.Storage.uploadData(key: "ExampleKey", data: data)
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

When you have a file that you want to upload, you can specify the url to the file in the `local` parameter.

<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
let dataString = "My Data"
let fileNameKey = "myFile.txt"
let filename = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
    .appendingPathComponent(fileNameKey)
do {
    try dataString.write(to: filename, atomically: true, encoding: String.Encoding.utf8)
} catch {
    print("Failed to write to file \(error)")
}

Amplify.Storage.uploadFile(
    key: fileNameKey,
    local: filename,
    progressListener: { progress in
        print("Progress: \(progress)")
    }, resultListener: { event in
        switch event {
        case let .success(data):
            print("Completed: \(data)")
        case let .failure(storageError):
            print("Failed: \(storageError.errorDescription). \(storageError.recoverySuggestion)")
        }
    }
)
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
let dataString = "My Data"
let fileNameKey = "myFile.txt"
let filename = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
    .appendingPathComponent(fileNameKey)
do {
    try dataString.write(to: filename, atomically: true, encoding: String.Encoding.utf8)
} catch {
    print("Failed to write to file \(error)")
}

let storageOperation = Amplify.Storage.uploadFile(key: fileNameKey, local: filename)
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
