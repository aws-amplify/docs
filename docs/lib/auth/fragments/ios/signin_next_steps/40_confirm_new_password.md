If the next step is `confirmSignInWithNewPassword`, Amplify Auth requires a new password for the user before they can proceed. Prompt the user for a new password and pass it to the `confirmSignIn` API.

<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func confirmSignIn(newPasswordFromUser: String) {
    Amplify.Auth.confirmSignIn(challengeResponse: newPasswordFromUser) { result in
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
func confirmSignIn(newPasswordFromUser: String) -> AnyCancellable {
    Amplify.Auth.confirmSignIn(challengeResponse: newPasswordFromUser)
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
