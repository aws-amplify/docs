There are three ways of getting data that was previously uploaded:

### Download data

You can download to in-memory buffer [Data](https://developer.apple.com/documentation/foundation/data) object with `Amplify.Storage.downloadData`:

```swift
_ = Amplify.Storage.downloadData(key: "myKey", 
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

### Download to file

You can download to a file [URL](https://developer.apple.com/documentation/foundation/url) with `Amplify.Storage.downloadFile`:

```swift
let downloadToFileName = FileManager.default.urls(for: .documentDirectory,
                                                  in: .userDomainMask)[0]
    .appendingPathComponent("myFile.txt")
_ = Amplify.Storage.downloadFile(key: "myKey", local: downloadToFileName, 
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

### Generate a download URL

You can also retrieve a URL for the object in storage:

```swift
_ = Amplify.Storage.getURL(key: "myKey") { event in
    switch event {
    case let .success(url):
        print("Completed: \(url)")
    case let .failure(storageError):
        print("Failed: \(storageError.errorDescription). \(storageError.recoverySuggestion)")
    }
}
```
