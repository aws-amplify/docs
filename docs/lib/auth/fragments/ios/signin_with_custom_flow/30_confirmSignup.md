<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func confirmSignUp(for username: String, with confirmationCode: String) {
    Amplify.Auth.confirmSignUp(for: username, confirmationCode: confirmationCode) { result in
        switch result {
        case .success:
            print("Confirm signUp succeeded")
        case .failure(let error):
            print("An error occurred while confirming sign up \(error)")
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
                print("An error occurred while confirming sign up \(authError)")
            }
        }
        receiveValue: { _ in
            print("Confirm signUp succeeded")
        }
}
```

</amplify-block>

</amplify-block-switcher>

You will know the sign up flow is complete if you see the following in your console window:

```console
Confirm signUp succeeded
```
