If the next step is `confirmSignInWithNewPassword`, Amplify Auth requires a new password for the user before they can proceed. Prompt the user for a new password and pass it to the `confirmSignIn` API.

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
