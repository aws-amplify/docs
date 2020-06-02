```swift
_ = Amplify.Auth.confirmSignIn(challengeResponse: "<confirmation code received via SMS>") { result in
    switch result {
    case .success(_):
        print("Sign in succeeded")
    case .failure(let error):
        print("Sign in failed \(error)")
    }
}
```
