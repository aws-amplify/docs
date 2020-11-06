<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func signIn(username: String) {
    Amplify.Auth.signIn(username: username) { result in
        switch result {
        case .success:
            if case .confirmSignInWithCustomChallenge(_) = result.nextStep {
                // Ask the user to enter the custom challenge.
            } else {
                print("Sign in succeeded")   
            }
        case .failure(let error):
            print("Sign in failed \(error)")
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
func signIn(username: String, password: String) -> AnyCancellable {
    Amplify.Auth.signIn(username: username, password: password)
        .resultPublisher
        .sink {
            if case let .failure(authError) = $0 {
                print("Sign in failed \(authError)")
            }
        }
        receiveValue: { result in
            if case .confirmSignInWithCustomChallenge(_) = result.nextStep {
                // Ask the user to enter the custom challenge.
            } else {
                print("Sign in succeeded")
            }
        }
}
```

</amplify-block>

</amplify-block-switcher>

Since this is a custom authentication flow with a challenge, the result of the signin process has a next step `.confirmSignInWithCustomChallenge`. Implement a UI to allow the user to enter the custom challenge.