
The signin apis if it succeeds you will get back an associated value of type `AuthSignInResult`, and you can access the next step through the property `nextStep` of `AuthSignInResult`. 

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