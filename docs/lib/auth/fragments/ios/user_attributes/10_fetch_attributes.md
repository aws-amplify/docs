<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func fetchAttributes() {
    Amplify.Auth.fetchUserAttributes() { result in
        switch result {
        case .success(let attributes):
            print("User attributes - \(attributes)")
        case .failure(let error):
            print("Fetching user attributes failed with error \(error)")
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
func fetchAttributes() -> AnyCancellable {
    Amplify.Auth.fetchUserAttributes()
        .resultPublisher
        .sink {
            if case let .failure(authError) = $0 {
                print("Fetch user attributes failed with error \(authError)")
            }
        }
        receiveValue: { attributes in
            print("User attributes - \(attributes)")
        }
}
```

</amplify-block>

</amplify-block-switcher>
