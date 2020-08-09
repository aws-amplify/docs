```dart
  void _fetchSession() async {
    try {
      AuthSession res = await Amplify.Auth.fetchAuthSession(
        request: AuthSessionRequest(
          options: CognitoSessionOptions(getAWSCredentials: true)
        )
      );    } on AuthError catch (e) {
      print(e);
    }
  }
```