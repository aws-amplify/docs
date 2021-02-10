```dart
try {
  SignInResult res = await Amplify.Auth.signIn(
    username: usernameController.text.trim(),
    password: passwordController.text.trim(),
  );
  setState(() {
    isSignedIn = res.isSignedIn;
  });
} on AuthException catch (e) {
  print(e.message);
}
```


