If the next step is `confirmSignInWithCustomChallenge`, Amplify Auth is awaiting completion of a custom authentication challenge. The challenge is based on the Lambda trigger you setup when you configured a [custom sign in flow](~/lib/auth/signin_with_custom_flow.md). To complete this step, you should prompt the user for the custom challenge answer, and pass the answer to the `confirmSignIn` API.

<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func confirmSignIn(challengeAnswerFromUser: String) {
    Amplify.Auth.confirmSignIn(challengeResponse: challengeAnswerFromUser) { result in
        switch result {
        case .success(let signInResult):
            if signInResult.isSignedIn {
                print("Confirm sign in succeeded. The user is signed in.")
            } else {
                print("Confirm sign in succeeded.")
                print("Next step: \(signInResult.nextStep)")
                // Switch on the next step to take appropriate actions. 
                // If `signInResult.isSignedIn` is true, the next step 
                // is 'done', and the user is now signed in.
            }
        case .failure(let error):
            print("Confirm sign in failed \(error)")
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
func confirmSignIn(challengeAnswerFromUser: String) -> AnyCancellable {
    Amplify.Auth.confirmSignIn(challengeResponse: challengeAnswerFromUser)
        .resultPublisher
        .sink {
            if case let .failure(authError) = $0 {
                print("Confirm sign in failed \(authError)")
            }
        }
        receiveValue: { signInResult in
            if signInResult.isSignedIn {
                print("Confirm sign in succeeded. The user is signed in.")
            } else {
                print("Confirm sign in succeeded.")
                print("Next step: \(signInResult.nextStep)")
                // Switch on the next step to take appropriate actions. 
                // If `signInResult.isSignedIn` is true, the next step 
                // is 'done', and the user is now signed in.
            }
        }
}
```

</amplify-block>

</amplify-block-switcher>
