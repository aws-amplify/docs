```swift
_ = Amplify.Auth.rememberDevice() { result in
    switch result {
        case .success:
            print("Remember device succeeded")
        case .failure(let error):
            print("Remember device failed with error \(error)")
        }
    }
```
