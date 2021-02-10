<amplify-callout>
```dart
try {
  SignInResult res = await Amplify.Auth.fetchUserAttributes();
} on AuthException catch (e) {
  print(e.message);
}
```
</amplify-callout>
