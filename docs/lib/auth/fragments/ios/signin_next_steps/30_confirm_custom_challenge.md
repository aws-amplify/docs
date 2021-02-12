If you receive `confirmSignInWithCustomChallenge`, the next step is to verify the user through custom authentication challenge. The challenge is based on the lambda trigger you have setup for a [custom sign in flow](~/lib/auth/signin_with_custom_flow.md). You should get the custom challenge answer from the user and invoke the `confirmSignIn` api with the custom challenge answer

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