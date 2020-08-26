<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func changePassword(oldPassword: String, newPassword: String) {
    Amplify.Auth.update(oldPassword: oldPassword, to: newPassword) { result in
        switch result {
        case .success:
            print("Change password succeeded")
        case .failure(let error):
            print("Change password failed with error \(error)")
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
func changePassword(oldPassword: String, newPassword: String) -> AnyCancellable {
    Amplify.Auth.update(oldPassword: oldPassword, to: newPassword)
        .resultPublisher
        .sink {
            if case let .failure(authError) = $0 {
                print("Change password failed with error \(authError)")
            }
        }
        receiveValue: {
            print("Change password succeeded")
        }
}
```

</amplify-block>

</amplify-block-switcher>
