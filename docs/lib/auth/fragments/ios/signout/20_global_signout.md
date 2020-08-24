<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func signOutGlobally() {
    Amplify.Auth.signOut(options: .init(globalSignOut: true)) { result in
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
func signOutGlobally() -> AnyCancellable {
    let sink = Amplify.Auth.signOut(options: .init(globalSignOut: true))
        .resultPublisher
        .sink {
            if case let .failure(authError) = $0 {
                print("Sign out failed with error \(authError)")
            }
        }
        receiveValue: {
            print("Successfully signed out")
        }
    return sink
}
```

</amplify-block>

</amplify-block-switcher>
