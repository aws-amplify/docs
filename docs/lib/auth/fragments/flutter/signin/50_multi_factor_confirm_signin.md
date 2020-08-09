```dart
try {
  SignInResult res = await Amplify.Auth.confirmSignIn(
    request: ConfirmSignInRequest(
      userKey: "myusername",
      confirmationValue: "123456"
    ), 
  );
  setState(() {
    isSignedIn = res.isSignedIn;
  });
} on AuthError catch (e) {
  print(e);
}
```