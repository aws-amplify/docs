```swift
func signIn(username: String, password: String) {
    _ = Amplify.Auth.signIn(username: username, password: password) { result in
        switch result {
        case .success(_):
            print("Sign in succeeded")
        case .failure(let error):
            print("Sign in failed \(error)")
        }
    }
}
```
