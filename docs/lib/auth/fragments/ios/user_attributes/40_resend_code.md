<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func resendCode() {
    Amplify.Auth.resendConfirmationCode(for: .email) { result in
        switch result {
        case .success(let deliveryDetails):
            print("Resend code send to - \(deliveryDetails)")
        case .failure(let error):
            print("Resend code failed with error \(error)")
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
func resendCode() -> AnyCancellable {
    Amplify.Auth.resendConfirmationCode(for: .email)
        .resultPublisher
        .sink {
            if case let .failure(authError) = $0 {
                print("Resend code failed with error \(authError)")
            }
        }
        receiveValue: { deliveryDetails in
            print("Resend code sent to - \(deliveryDetails)")
        }
}
```

</amplify-block>

</amplify-block-switcher>
