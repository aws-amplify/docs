```swift
    func confirmAttribute() {
        _ = Amplify.Auth.confirm(userAttribute: .email, confirmationCode: "390739") { result in
            switch result {
            case .success:
                print("Attribute verified")
            case .failure(let error):
                print("Update attribute failed with error \(error)")
            }
        }
    }
```