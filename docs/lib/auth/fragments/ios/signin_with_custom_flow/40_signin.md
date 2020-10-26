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
        receiveValue: { _ in
            print("Sign in succeeded")
        }
}
```

</amplify-block>

</amplify-block-switcher>
