```swift
_ = Amplify.Auth.forgetDevice() { result in
    switch result {
    case .success:
        print("Forget device succeeded")
    case .failure(let error):
        print("Forget device failed with error \(error)")
    }
}
```