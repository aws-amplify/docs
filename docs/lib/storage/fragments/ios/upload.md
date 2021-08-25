To upload to S3 from a data object, specify the `key` and the `data` object to be uploaded.

<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
let dataString = "My Data"
let data = dataString.data(using: .utf8)!
let storageOperation = Amplify.Storage.uploadData(
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

let storageOperation = Amplify.Storage.uploadFile(
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

## Cancel, Pause, Resume

Calls to `uploadData` or `uploadFile` return a reference to the operation that is actually performing the upload.

To cancel the upload (for example, in response to the user pressing a **Cancel** button), you simply call `cancel()` on the upload operation.

```swift
func cancelUpload() {
    storageOperation.cancel()
}
```

You can also pause then resume the operation.

```swift
storageOperation.pause()
storageOperation.resume()
```

## MultiPart upload

The upload will automatically perform a S3 multipart upload for files larger than 5MB. For more information about S3's multipart upload, see [Uploading and copying objects using multipart upload
](https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html)
