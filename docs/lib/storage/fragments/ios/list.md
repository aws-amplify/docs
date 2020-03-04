You can list all of the objects uploaded.
```swift
func list() {
  Amplify.Storage.list { (event) in
      switch event {
      case .completed(let listResult):
          print("Completed")
          listResult.items.forEach { (item) in
              print("Key: \(item.key)")
          }
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
