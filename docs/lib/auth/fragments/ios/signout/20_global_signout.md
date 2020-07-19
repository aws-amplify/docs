```swift
let options = AuthSignOutRequest.Options(globalSignOut: true)
_ = Amplify.Auth.signOut(options: options) { result in
    switch result {
    case .success:
        print("Successfully signed out")
    case .failure(let error):
        print("Sign out failed with error \(error)")
    }
}
```