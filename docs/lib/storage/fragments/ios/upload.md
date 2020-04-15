To upload to S3 from a data object, specify the `key` and the `data` object to be uploaded.

```swift
let dataString = "My Data"
let data = dataString.data(using: .utf8)!
Amplify.Storage.uploadData(key: "myKey", data: data) { event in
    switch event {
    case let .completed(data):
        print("Completed: \(data)")
    case let .failed(storageError):
        print("Failed: \(storageError.errorDescription). \(storageError.recoverySuggestion)")
    case let .inProcess(progress):
        print("Progress: \(progress)")
    default:
        break
    }
}
```

When you have a file that you want to upload, you can specify the url to the file in the `local` parameter.

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

_ = Amplify.Storage.uploadFile(key: fileNameKey, local: filename) { event in
    switch event {
    case let .completed(data):
        print("Completed: \(data)")
    case let .failed(storageError):
        print("Failed: \(storageError.errorDescription). \(storageError.recoverySuggestion)")
    case let .inProcess(progress):
        print("Progress: \(progress)")
    default:
        break
    }
}
```
