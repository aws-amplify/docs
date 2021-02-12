If the next step is `confirmSignInWithCustomChallenge`, Amplify Auth is awaiting completion of a custom authentication challenge. The challenge is based on the Lambda trigger you setup when you configured a [custom sign in flow](~/lib/auth/signin_with_custom_flow.md). To complete this step, you should prompt the user for the custom challenge answer, and pass the answer to the `confirmSignIn` API.

<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func confirmSignIn() {
    Amplify.Auth.confirmSignIn(challengeResponse: "<custom challenge answer>") { result in
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
    Amplify.Auth.confirmSignIn(challengeResponse: "<custom challenge answer>")
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
