If you receive `resetPassword`, authentication flow could not proceed without resetting the password. The next step is to invoke `resetPassword` api and follow the reset password flow.

<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func resetPassword() {
    Amplify.Auth.resetPassword(for: "<user name>") { result in
        switch result {
        case .success(let resetPasswordResult):
            print("Reset password succeeded. Next step: \(resetPasswordResult.nextStep)")
        case .failure(let error):
            print("Reset password  failed \(error)")
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
func resetPassword() -> AnyCancellable {
    Amplify.Auth.resetPassword(for: "<user name>")
        .resultPublisher
        .sink {
            if case let .failure(authError) = $0 {
                print("Reset password  failed \(authError)")
            }
        }
        receiveValue: { resetPasswordResult in
            print("Reset password succeeded. Next step: \(resetPasswordResult.nextStep)")
        }
}
```

</amplify-block>

</amplify-block-switcher>