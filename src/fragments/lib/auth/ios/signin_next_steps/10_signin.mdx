
When called successfully, the signin APIs will return an `AuthSignInResult`. Inspect the `nextStep` property in the result to see if additional signin steps are required.

```swift
func signIn(username: String, password: String) {
    Amplify.Auth.signIn(username: username, password: password) { result in
        do {
                let signinResult = try result.get()
                switch signinResult.nextStep {
                case .confirmSignInWithSMSMFACode(let deliveryDetails, let info):
                    print("SMS code send to \(deliveryDetails.destination)")
                    print("Additional info \(info)")

                    // Prompt the user to enter the SMSMFA code they received
                    // Then invoke `confirmSignIn` api with the code
                
                case .confirmSignInWithCustomChallenge(let info):
                    print("Custom challenge, additional info \(info)")
                    
                    // Prompt the user to enter custom challenge answer
                    // Then invoke `confirmSignIn` api with the answer
                
                case .confirmSignInWithNewPassword(let info):
                    print("New password additional info \(info)")
                    
                    // Prompt the user to enter a new password
                    // Then invoke `confirmSignIn` api with new password
                
                case .resetPassword(let info):
                    print("Reset password additional info \(info)")
                    
                    // User needs to reset their password.
                    // Invoke `resetPassword` api to start the reset password
                    // flow, and once reset password flow completes, invoke
                    // `signIn` api to trigger signin flow again.
                
                case .confirmSignUp(let info):
                    print("Confirm signup additional info \(info)")
                    
                    // User was not confirmed during the signup process.
                    // Invoke `confirmSignUp` api to confirm the user if
                    // they have the confirmation code. If they do not have the
                    // confirmation code, invoke `resendSignUpCode` to send the
                    // code again.
                    // After the user is confirmed, invoke the `signIn` api again.
                case .done:
                    
                    // Use has successfully signed in to the app
                    print("Signin complete")
                }
            } catch {
                print ("Sign in failed \(error)")
            }
    }
}
```

The `nextStep` property is of enum type `AuthSignInStep`. Depending on its value, your code should take one of the following actions:
