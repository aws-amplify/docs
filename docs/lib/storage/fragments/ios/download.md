There are three ways of getting data that was previously uploaded:

### Download data

You can download to in-memory buffer [Data](https://developer.apple.com/documentation/foundation/data) object with `Amplify.Storage.downloadData`:

```swift
Amplify.Storage.downloadData(key: "myKey") { event in
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

### Download to file

You can download to a file [URL](https://developer.apple.com/documentation/foundation/url) with `Amplify.Storage.downloadFile`:

```swift
let downloadToFileName = FileManager.default.urls(for: .documentDirectory,
                                                  in: .userDomainMask)[0]
    .appendingPathComponent("myFile.txt")
Amplify.Storage.downloadFile(key: "myKey", local: downloadToFileName) { event in
    switch event {
    case .completed:
        print("Completed")
    case let .failed(storageError):
        print("Failed: \(storageError.errorDescription). \(storageError.recoverySuggestion)")
    case let .inProcess(progress):
        print("Progress: \(progress)")
    default:
        break
    }
}
```

### Generate a download URL

You can also retrieve a URL for the object in storage:

```swift
Amplify.Storage.getURL(key: "myKey") { event in
    switch event {
    case let .completed(url):
        print("Completed: \(url)")
    case let .failed(storageError):
        print("Failed: \(storageError.errorDescription). \(storageError.recoverySuggestion)")
    default:
        break
    }
}
```
