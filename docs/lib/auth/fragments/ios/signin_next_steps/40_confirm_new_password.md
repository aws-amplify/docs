If you receive `confirmSignInWithNewPassword`, the next step is to provide a new password for the user. You should ask the user for a new passowrd and invoke `confirmSignIn` api with the new password:

<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func confirmSignIn() {
    Amplify.Auth.confirmSignIn(challengeResponse: "<new password>") { result in
        switch result {
        case .success(let signInResult):
            print("Confirm sign in succeeded. Next step: \(signInResult.nextStep)")
        case .failure(let error):
            print("Confirm sign in failed \(error)")
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
func confirmSignIn() -> AnyCancellable {
    Amplify.Auth.confirmSignIn(challengeResponse: "<new password>")
        .resultPublisher
        .sink {
            if case let .failure(authError) = $0 {
                print("Confirm sign in failed \(authError)")
            }
        }
        receiveValue: { signInResult in
            print("Confirm sign in succeeded. Next step: \(signInResult.nextStep)")
        }
}
```

</amplify-block>

</amplify-block-switcher>