<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func confirmAttribute() {
    Amplify.Auth.confirm(userAttribute: .email, confirmationCode: "390739") { result in
        switch result {
        case .success:
            print("Attribute verified")
        case .failure(let error):
            print("Update attribute failed with error \(error)")
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
func confirmAttribute() -> AnyCancellable {
    Amplify.Auth.confirm(userAttribute: .email, confirmationCode: "390739")
        .resultPublisher
        .sink {
            if case let .failure(authError) = $0 {
                print("Update attribute failed with error \(authError)")
            }
        }
        receiveValue: { _ in
            print("Attribute verified")
        }
}
```

</amplify-block>

</amplify-block-switcher>
