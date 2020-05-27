```swift
func changePassword(oldPassword: String, newPassword: String) {

    _ = Amplify.Auth.update(oldPassword: oldPassword, to: newPassword) { result in
        switch result {
        case .success:
            print("Change password succeeded")
        case .failure(let error):
            print("Change password failed with error \(error)")
        }
    }
}
```