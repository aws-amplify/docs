<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func confirmSignUp() {
    _ = Amplify.Auth.confirmSignIn(challengeResponse: "<confirmation code received via SMS>") { result in
        switch result {
        case .success(_):
            print("Sign in succeeded")
        case .failure(let error):
            print("Sign in failed \(error)")
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
func confirmSignUp() -> AnyCancellable {
    Amplify.Auth.confirmSignIn(challengeResponse: "<confirmation code received via SMS>")
        .resultPublisher
        .sink {
            if case let .failure(authError) = $0 {
                print("Fetch session failed with error \(authError)")
            }
        }
        receiveValue: { signInResult in
            switch signInResult {
            case .success:
                print("Sign in succeeded")
            case .failure(let error):
                print("Sign in failed \(error)")
            }
        }
}
```

</amplify-block>

</amplify-block-switcher>
