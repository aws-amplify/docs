```dart
SignInResult res = await Amplify.Auth.signIn(
  request: SignInRequest(
    username: usernameController.text.trim(),
    password: passwordController.text.trim(),
  )
);
```


