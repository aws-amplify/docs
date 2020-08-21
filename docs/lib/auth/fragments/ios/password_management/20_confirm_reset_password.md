<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func confirmResetPassword(
    username: String,
    newPassword: String,
    confirmationCode: String
) {
    Amplify.Auth.confirmResetPassword(
        for: username,
        with: newPassword,
        confirmationCode: confirmationCode
    ) { result in
        switch result {
        case .success:
            print("Password reset confirmed")
        case .failure(let error):
            print("Reset password failed with error \(error)")
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
func confirmResetPassword(
    username: String,
    newPassword: String,
    confirmationCode: String
) -> AnyCancellable {
    Amplify.Auth.confirmResetPassword(
        for: username,
        with: newPassword,
        confirmationCode: confirmationCode
    ).resultPublisher
    .sink {
        if case let .failure(authError) = $0 {
            print("Reset password failed with error \(authError)")
        }
    }
    receiveValue: {
        print("Password reset confirmed")
    }
}
```

</amplify-block>

</amplify-block-switcher>
