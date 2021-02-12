
When called successfully, the signin APIs will return an `AuthSignInResult`. Inspect the `nextStep` property in the result to see if additional signin steps are required.

```swift
func signIn(username: String, password: String) {
    Amplify.Auth.signIn(username: username, password: password) { result in
        switch result {
        case .success(signinResult):
            print("Next step = ")
        case .failure(let error):
            print("Sign in failed \(error)")
        }
    }
}
```

The next step property is an enum of type `AuthSignInStep`, based on the value you can perform the following steps:
