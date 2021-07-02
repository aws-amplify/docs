Sign up users normally with the chosen `Username` type and password. Certain attributes may be required in the `userAttributes` map depending on the options chosen above:

- `"email"` is **required** if:
    - One of the following are true:
        - Email verification is enabled (default)
        - Email was marked as a required attribute (default)
    - **and** users sign up with a chosen username or phone number
- `"phone_number"` is **required** if:
    - One of the following are true:
        - MFA is ON, or manually enabled for the user
        - Phone number verification is enabled
        - Phone number was marked as a required attribute
    - **and** users sign up with a chosen username or email

```dart
await Amplify.Auth.signUp(
    username: username,
    password: password,
    options: CognitoSignUpOptions(
        userAttributes: {
            // ... if required
            'email': 'test@example.com',
            'phone_number': '+18885551234',
        },
    ),
);
```

Verification of user accounts is done via the `confirmSignUp` method with the OTP sent to their phone or email.

```dart
await Amplify.Auth.confirmSignUp(
    username: username,
    confirmationCode: otpCode,
);
```