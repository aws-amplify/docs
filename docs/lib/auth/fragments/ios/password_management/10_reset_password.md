<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func resetPassword(username: String) {
    Amplify.Auth.resetPassword(for: username) { result in
        do {
            let resetResult = try result.get()
            switch resetResult.nextStep {
            case .confirmResetPasswordWithCode(let deliveryDetails, let info):
                print("Confirm reset password with code send to - \(deliveryDetails) \(info)")
            case .done:
                print("Reset completed")
            }
        } catch {
            print("Reset password failed with error \(error)")
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
func resetPassword(username: String) -> AnyCancellable {
    Amplify.Auth.resetPassword(for: username)
        .resultPublisher
        .sink {
            if case let .failure(authError) = $0 {
                print("Reset password failed with error \(authError)")
            }
        }
        receiveValue: { resetResult in
            switch resetResult.nextStep {
            case .confirmResetPasswordWithCode(let deliveryDetails, let info):
                print("Confirm reset password with code send to - \(deliveryDetails) \(info)")
            case .done:
                print("Reset completed")
            }
        }
}
```

</amplify-block>

</amplify-block-switcher>

Usually resetting the password require you to verify that it is the actual user that tried to reset the password. So the next step above will be `.confirmResetPasswordWithCode`.