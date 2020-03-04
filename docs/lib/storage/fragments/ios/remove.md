Delete an object uploaded to S3 by using `Amplify.Storage.remove` and specify the key

```swift
func remove() {
  Amplify.Storage.remove(key: "myKey") { (event) in
      switch event {
      case .completed(let data):
          print("Completed: Deleted \(data)")
      case .failed(let storageError):
          print("Failed: \(storageError.errorDescription). \(storageError.recoverySuggestion)")
      case .inProcess(let progress):
          print("Progress: \(progress)")
      default:
          break
      }
  }
}
```
