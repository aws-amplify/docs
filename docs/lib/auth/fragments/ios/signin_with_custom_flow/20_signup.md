<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func signUp(username: String, email: String) {
    let userAttributes = [AuthUserAttribute(.email, value: email)]
    let options = AuthSignUpRequest.Options(userAttributes: userAttributes)
    Amplify.Auth.signUp(username: username, password: UUID().uuidString, options: options) { result in
        switch result {
        case .success(let signUpResult):
            if case let .confirmUser(deliveryDetails, _) = signUpResult.nextStep {
                print("Delivery details \(String(describing: deliveryDetails))")
            } else {
                print("Signup Complete")
            }
        case .failure(let error):
            print("An error occurred while registering a user \(error)")
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
func signUp(username: String, password: String, email: String) -> AnyCancellable {
    let userAttributes = [AuthUserAttribute(.email, value: email)]
    let options = AuthSignUpRequest.Options(userAttributes: userAttributes)
    let sink = Amplify.Auth.signUp(username: username, password: password, options: options)
        .resultPublisher
        .sink {
            if case let .failure(authError) = $0 {
                print("An error occurred while registering a user \(authError)")
            }
        }
        receiveValue: { signUpResult in
            if case let .confirmUser(deliveryDetails, _) = signUpResult.nextStep {
                print("Delivery details \(String(describing: deliveryDetails))")
            } else {
                print("Signup Complete")
            }

        }
    return sink
}
```

</amplify-block>

</amplify-block-switcher>