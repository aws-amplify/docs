```dart
try {
  SignInResult res = await Amplify.Auth.signIn(
    request: SignInRequest(
      username: usernameController.text.trim(),
      password: passwordController.text.trim(),
    )
  );
  setState(() {
    isSignedIn = res.isSignedIn;
  });
} on AuthError catch (e) {
  print(e);
}
```


