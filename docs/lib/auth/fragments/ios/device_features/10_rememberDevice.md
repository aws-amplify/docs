<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func rememberDevice() {
    Amplify.Auth.rememberDevice() { result in
        switch result {
        case .success:
            print("Remember device succeeded")
        case .failure(let error):
            print("Remember device failed with error \(error)")
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
func rememberDevice() -> AnyCancellable {
    Amplify.Auth.rememberDevice()
        .resultPublisher
        .sink {
            if case let .failure(authError) = $0 {
                print("Remember device failed with error \(authError)")
            }
        }
        receiveValue: {
            print("Remember device succeeded")
        }
}
```

</amplify-block>

</amplify-block-switcher>
