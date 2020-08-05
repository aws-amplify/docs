```dart
try {
  SignInResult res = await Amplify.Auth.signIn(
    request: SignInRequest(
      username: usernameController.text.trim(),
      password: passwordController.text.trim(),
    )
  );
} on AuthError catch (e) {
  print(e);
}
```


