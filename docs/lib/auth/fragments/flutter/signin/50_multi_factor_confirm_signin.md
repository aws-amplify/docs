```dart
SignInResult res = await Amplify.Auth.confirmSignIn(
  request: ConfirmSignInRequest(
    userKey: "myusername",
    confirmationValue: "123456"
  ), 
);
```