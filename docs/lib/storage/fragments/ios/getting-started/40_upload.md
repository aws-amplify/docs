<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func uploadData() {
    let dataString = "Example file contents"
    let data = dataString.data(using: .utf8)!
    Amplify.Storage.uploadData(key: "ExampleKey", data: data, 
        progressListener: { progress in
            print("Progress: \(progress)")
        }, resultListener: { (event) in
            switch event {
            case .success(let data):
                print("Completed: \(data)")
            case .failure(let storageError):
                print("Failed: \(storageError.errorDescription). \(storageError.recoverySuggestion)")
        }
    })
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
// In your type's instance variables
var resultSink: AnyCancellable?
var progressSink: AnyCancellable?

// ...

func uploadData() {
    let dataString = "Example file contents"
    let data = dataString.data(using: .utf8)!
    let storageOperation = Amplify.Storage.uploadData(key: "ExampleKey", data: data)
    progressSink = storageOperation
        .progressPublisher
        .sink { progress in print("Progress: \(progress)") }

    resultSink = storageOperation
        .resultPublisher
        .sink {
            if case let .failure(storageError) = $0 {
                print("Failed: \(storageError.errorDescription). \(storageError.recoverySuggestion)")
            }
        }
        receiveValue: { data in
            print("Completed: \(data)")
        }
}
```

</amplify-block>

</amplify-block-switcher>
