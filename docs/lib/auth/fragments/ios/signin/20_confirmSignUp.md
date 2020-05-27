```swift
func confirmSignUp(for username: String, with confirmationCode: String) {
    _ = Amplify.Auth.confirmSignUp(for: username, confirmationCode: confirmationCode) { result in
        switch result {
        case .success(_):
                print("Confirm signUp succeeded")
        case .failure(let error):
            print("An error occured while registering a user \(error)")
        }
    }
}
```