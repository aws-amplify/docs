```swift
func confirmResetPassword(username: String,
                            newPassword: String,
                            confirmationCode: String) {

    _ = Amplify.Auth.confirmResetPassword(
        for: username,
        with: newPassword,
        confirmationCode: confirmationCode) { result in
            switch result {
            case .success:
                print("Password reset confirmed")
            case .failure(let error):
                print("Reset password failed with error \(error)")
            }
    }
}
```