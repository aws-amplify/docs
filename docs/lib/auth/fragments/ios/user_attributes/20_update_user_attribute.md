<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func updateAttribute() {
    Amplify.Auth.update(userAttribute: AuthUserAttribute(.phoneNumber, value: "+2223334444")) { result in
        do {
            let updateResult = try result.get()
            switch updateResult.nextStep {
            case .confirmAttributeWithCode(let deliveryDetails, let info):
                print("Confirm the attribute with details send to - \(deliveryDetails) \(info)")
            case .done:
                print("Update completed")
            }
        } catch {
            print("Update attribute failed with error \(error)")
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
func updateAttribute() -> AnyCancellable {
    Amplify.Auth.update(userAttribute: AuthUserAttribute(.phoneNumber, value: "+2223334444"))
        .resultPublisher
        .sink {
            if case let .failure(authError) = $0 {
                print("Update attribute failed with error \(authError)")
            }
        }
        receiveValue: { updateResult in
            switch updateResult.nextStep {
            case .confirmAttributeWithCode(let deliveryDetails, let info):
                print("Confirm the attribute with details send to - \(deliveryDetails) \(info)")
            case .done:
                print("Update completed")
            }
        }
}
```

</amplify-block>

</amplify-block-switcher>
