<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func signOutLocally() {
    Amplify.Auth.signOut() { result in
        switch result {
        case .success:
            print("Successfully signed out")
        case .failure(let error):
            print("Sign out failed with error \(error)")
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
func signOutLocally() -> AnyCancellable {
    Amplify.Auth.signOut()
        .resultPublisher
        .sink {
            if case let .failure(authError) = $0 {
                print("Sign out failed with error \(authError)")
            }
        }
        receiveValue: {
            print("Successfully signed out")
        }
}
```

</amplify-block>

</amplify-block-switcher>
