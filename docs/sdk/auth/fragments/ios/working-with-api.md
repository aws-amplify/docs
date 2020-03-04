## SignUp

Creates a new user in your User Pool:

```swift
AWSMobileClient.default().signUp(username: "your_username",
                                        password: "Abc@123!",
                                        userAttributes: ["email":"john@doe.com", "phone_number": "+1973123456"]) { (signUpResult, error) in
    if let signUpResult = signUpResult {
        switch(signUpResult.signUpConfirmationState) {
        case .confirmed:
            print("User is signed up and confirmed.")
        case .unconfirmed:
            print("User is not confirmed and needs verification via \(signUpResult.codeDeliveryDetails!.deliveryMedium) sent at \(signUpResult.codeDeliveryDetails!.destination!)")
        case .unknown:
            print("Unexpected case")
        }
    } else if let error = error {
        if let error = error as? AWSMobileClientError {
            switch(error) {
            case .usernameExists(let message):
                print(message)
            default:
                break
            }
        }
        print("\(error.localizedDescription)")
    }
}
```

## User Attributes

You can provide custom user attributes in the `signUp()` method by passing them into the `userAttributes` argument as key-value pairs. For instance if you had a `nickname` or a `badge_number` in your Cognito User Pool:

```swift
AWSMobileClient.default().signUp(
    username: "your_username",
    password: "Abc@123!",
    userAttributes: ["nickname":"Johnny", "badge_number": "ABC123XYZ"]) { (signUpResult, error) in
    //Use results as before
}
```

## Confirm SignUp

Confirms a new user after signing up in a User Pool:

```swift
AWSMobileClient.default().confirmSignUp(username: "your_username", confirmationCode: signUpCodeTextField.text!) { (signUpResult, error) in
    if let signUpResult = signUpResult {
        switch(signUpResult.signUpConfirmationState) {
        case .confirmed:
            print("User is signed up and confirmed.")
        case .unconfirmed:
            print("User is not confirmed and needs verification via \(signUpResult.codeDeliveryDetails!.deliveryMedium) sent at \(signUpResult.codeDeliveryDetails!.destination!)")
        case .unknown:
            print("Unexpected case")
        }
    } else if let error = error {
        print("\(error.localizedDescription)")
    }
}
```

## Re-send Confirmation Code

```swift
AWSMobileClient.default().resendSignUpCode(username: "your_username", completionHandler: { (result, error) in
    if let signUpResult = result {
        print("A verification code has been sent via \(signUpResult.codeDeliveryDetails!.deliveryMedium) at \(signUpResult.codeDeliveryDetails!.destination!)")
    } else if let error = error {
        print("\(error.localizedDescription)")
    }
})
```

## SignIn

Sign in with user credentials:

```swift
AWSMobileClient.default().signIn(username: "your_username", password: "Abc@123!") { (signInResult, error) in
    if let error = error  {
        print("\(error.localizedDescription)")
    } else if let signInResult = signInResult {
        switch (signInResult.signInState) {
        case .signedIn:
            print("User is signed in.")
        case .smsMFA:
            print("SMS message sent to \(signInResult.codeDetails!.destination!)")
        default:
            print("Sign In needs info which is not et supported.")
        }
    }
}
```

## Confirm SignIn

```swift
AWSMobileClient.default().confirmSignIn(challengeResponse: "code_here") { (signInResult, error) in
    if let error = error  {
        print("\(error.localizedDescription)")
    } else if let signInResult = signInResult {
        switch (signInResult.signInState) {
        case .signedIn:
            print("User is signed in.")
        default:
            print("\(signInResult.signInState.rawValue)")
        }
    }
}
```

## Force Change Password

If a user is required to change their password on first login, there is a `newPasswordRequired` state returned when `signIn` is called. You need to provide a new password given by the user in that case. It can be done using `confirmSignIn` with the new password.

```swift
AWSMobileClient.default().signIn(username: "abc123", password: "Abc123!@") { (signInResult, error) in
    if let signInResult = signInResult {
        switch(signInResult.signInState) {
        case .signedIn:
            print("User signed in successfully.")
        case .smsMFA:
            print("Code was sent via SMS to \(signInResult.codeDetails!.destination!)")
        case .newPasswordRequired:
            print("A change of password is needed. Please provide a new password.")
        default:
            print("Other signIn state: \(signInResult.signInState)")
        }
    } else if let error = error {
        print("Error occurred: \(error.localizedDescription)")
    }
}

AWSMobileClient.default().confirmSignIn(challengeResponse: "NEW_PASSWORD_HERE") { (signInResult, error) in
    if let signInResult = signInResult {
        switch(signInResult.signInState) {
        case .signedIn:
            print("User signed in successfully.")
        case .smsMFA:
            print("Code was sent via SMS to \(signInResult.codeDetails!.destination!)")
        default:
            print("Other signIn state: \(signInResult.signInState)")
        }
    } else if let error = error {
        print("Error occurred: \(error.localizedDescription)")
    }
}
```

## SignOut

```swift
AWSMobileClient.default().signOut()
```

## Global SignOut

Using global signout, you can signout a user from all active login sessions. By doing this, you are revoking all the OIDC tokens(id token, access token and refresh token) which means the user is signed out from all the devices. However, although the tokens are revoked, the AWS credentials will remain valid until they expire (which by default is 1 hour).

```swift
AWSMobileClient.default().signOut(options: SignOutOptions(signOutGlobally: true)) { (error) in
    print("Error: \(error.debugDescription)")
}
```

## Forgot Password

Forgot password is a 2 step process. You need to first call `forgotPassword()` method which would send a confirmation code to user via email or phone number. The details of how the code was sent are included in the response of `forgotPassword()`. Once the code is given by the user, you need to call `confirmForgotPassword()` with the confirmation code to confirm the change of password.

```swift
AWSMobileClient.default().forgotPassword(username: "my_username") { (forgotPasswordResult, error) in
    if let forgotPasswordResult = forgotPasswordResult {
        switch(forgotPasswordResult.forgotPasswordState) {
        case .confirmationCodeSent:
            print("Confirmation code sent via \(forgotPasswordResult.codeDeliveryDetails!.deliveryMedium) to: \(forgotPasswordResult.codeDeliveryDetails!.destination!)")
        default:
            print("Error: Invalid case.")
        }
    } else if let error = error {
        print("Error occurred: \(error.localizedDescription)")
    }
}
```

```swift
AWSMobileClient.default().confirmForgotPassword(username: "my_username", newPassword: "MyNewPassword123!!", confirmationCode: "ConfirmationCode") { (forgotPasswordResult, error) in
    if let forgotPasswordResult = forgotPasswordResult {
        switch(forgotPasswordResult.forgotPasswordState) {
        case .done:
            print("Password changed successfully")
        default:
            print("Error: Could not change password.")
        }
    } else if let error = error {
        print("Error occurred: \(error.localizedDescription)")
    }
}
```

## Utility Properties

The `AWSMobileClient` provides several property "helpers" that are automatically cached locally for you to use in your application.

```swift
AWSMobileClient.default().username       //String
AWSMobileClient.default().isSignedIn     //Boolean
AWSMobileClient.default().identityId     //String
```

> Note: The property `username` is available only when using username-password based auth. The property `identityId` is available only when federation is enabled in `CognitoIdentityPool`.

## Managing Security Tokens

**When using Authentication with `AWSMobileClient`, you don’t need to refresh Amazon Cognito tokens manually. The tokens are automatically refreshed by the library when necessary.**

### OIDC Tokens

```swift
AWSMobileClient.default().getTokens { (tokens, error) in
    if let error = error {
        print("Error getting token \(error.localizedDescription)")
    } else if let tokens = tokens {
        print(tokens.accessToken!.tokenString!)
    }
}
```

### AWS Credentials

```swift
AWSMobileClient.default().getAWSCredentials { (credentials, error) in
    if let error = error {
        print("\(error.localizedDescription)")
    } else if let credentials = credentials {
        print(credentials.accessKey)
    }
}
```