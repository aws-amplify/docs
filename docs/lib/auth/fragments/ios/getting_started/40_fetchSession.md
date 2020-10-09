<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func fetchCurrentAuthSession() {
    _ = Amplify.Auth.fetchAuthSession { result in
        switch result {
        case .success(let session):
            print("Is user signed in - \(session.isSignedIn)")
        case .failure(let error):
            print("Fetch session failed with error \(error)")
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
func fetchCurrentAuthSession() -> AnyCancellable {
    Amplify.Auth.fetchAuthSession().resultPublisher
        .sink {
            if case let .failure(authError) = $0 {
                print("Fetch session failed with error \(authError)")
            }
        }
        receiveValue: { session in
            print("Is user signed in - \(session.isSignedIn)")
        }
}
```

</amplify-block>

</amplify-block-switcher>
