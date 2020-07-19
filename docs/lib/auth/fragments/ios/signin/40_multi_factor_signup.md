```swift
func signUp(username: String, password: String, email: String, phonenumber: String) {
    let userAttributes = [AuthUserAttribute(.email, value: email), AuthUserAttribute(.phoneNumber, value: phonenumber)]
    let options = AuthSignUpRequest.Options(userAttributes: userAttributes)
    _ = Amplify.Auth.signUp(username: username, password: password, options: options) { result in
        switch result {
        case .success(let signUpResult):
            if case let .confirmUser(deliveryDetails, _) = signUpResult.nextStep {
                print("Delivery details \(String(describing: deliveryDetails))")
            } else {
                print("SignUp Complete")
            }
        case .failure(let error):
            print("An error occurred while registering a user \(error)")
        }
    }
}
```