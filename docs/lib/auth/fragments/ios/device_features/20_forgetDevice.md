<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func forgetDevice() {
    Amplify.Auth.forgetDevice() { result in
        switch result {
        case .success:
            print("Forget device succeeded")
        case .failure(let error):
            print("Forget device failed with error \(error)")
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
func forgetDevice() -> AnyCancellable {
    Amplify.Auth.forgetDevice()
        .resultPublisher
        .sink {
            if case let .failure(authError) = $0 {
                print("Forget device failed with error \(authError)")
            }
        }
        receiveValue: {
            print("Forget device succeeded")
        }
}
```

</amplify-block>

</amplify-block-switcher>
