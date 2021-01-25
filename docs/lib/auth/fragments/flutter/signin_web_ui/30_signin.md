Sweet! You're now ready to launch sign in with web UI. 

```dart
try {
  SignInResult res = await Amplify.Auth.signInWithWebUI();
} on AuthError catch (e) {
  print(e);
}
```

You can also specify a provider with the `provider` attribute:

```dart
try {
  SignInResult res = await Amplify.Auth.signInWithWebUI(provider:  AuthProvider.google);
} on AuthError catch (e) {
  print(e);
}
```

Amplify Flutter currently supports the following social sign-in providers: 
  * Google
  * Facebook
  * Login With Amazon
