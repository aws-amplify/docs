```dart
try {
  SignInResult res = await Amplify.Auth.confirmSignIn(
    request: ConfirmSignInRequest(
      userKey: "myusername",
      confirmationValue: "123456"
    ), 
  );
} on AuthError catch (e) {
  print(e);
}
```