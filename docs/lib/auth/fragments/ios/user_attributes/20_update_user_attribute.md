```swift
    func updateAttribute() {
        _ = Amplify.Auth.update(userAttribute: AuthUserAttribute(.phoneNumber, value: "+2223334444")) { result in

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