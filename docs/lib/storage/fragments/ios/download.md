If you uploaded the data at key `myKey` like in the previous example, you can retrieve the data using `Amplify.Storage.downloadData` or download to file with `Amplify.Storage.downloadFile`

```swift
func download() {
  Amplify.Storage.downloadData(key: "myKey") { (event) in
      switch event {
      case .completed(let data):
          print("Completed: \(data)")
      case .failed(let storageError):
          print("Failed: \(storageError.errorDescription). \(storageError.recoverySuggestion)")
      case .inProcess(let progress):
          print("Progress: \(progress)")
      default:
          break
      }
  }

  let downloadToFileName = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0].appendingPathComponent("myFile.txt")
  Amplify.Storage.downloadFile(key: "myFile.txt", local: downloadToFileName) { (event) in
      switch event {
      case .completed:
          print("Completed")
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
