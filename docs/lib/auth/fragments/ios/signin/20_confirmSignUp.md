<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func confirmSignUp(for username: String, with confirmationCode: String) {
    _ = Amplify.Auth.confirmSignUp(for: username, confirmationCode: confirmationCode) { result in
        switch result {
        case .success(_):
                print("Confirm signUp succeeded")
        case .failure(let error):
            print("An error occurred while registering a user \(error)")
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
func confirmSignUp(for username: String, with confirmationCode: String) -> AnyCancellable {
    Amplify.Auth.confirmSignUp(for: username, confirmationCode: confirmationCode)
        .resultPublisher
        .sink {
            if case let .failure(authError) = $0 {
                print("An error occurred while registering a user \(authError)")
            }
        }
        receiveValue: { _ in
            print("Confirm signUp succeeded")
        }
    
}
```

</amplify-block>

</amplify-block-switcher>
