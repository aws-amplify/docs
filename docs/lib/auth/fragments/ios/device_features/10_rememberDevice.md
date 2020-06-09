```swift
_ = Amplify.Auth.rememberDevice() { result in
    switch result {
        case .success:
            print("Remeber device succeeded")
        case .failure(let error):
            print("Remeber device failed with error \(error)")
        }
    }
```