```swift
_ = Amplify.Auth.signOut() { result in
    switch result {
    case .success:
        print("Successfully signed out")
    case .failure(let error):
        print("Sign out failed with error \(error)")
    }
}
```