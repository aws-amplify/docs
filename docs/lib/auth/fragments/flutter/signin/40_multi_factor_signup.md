```dart
try {
  Map<String, dynamic> userAttributes = {
    "email": "email@testdomain.com",
    "phone_number": "+15551234",
  };
  SignUpResult res = await Amplify.Auth.signUp(
    request: SignUpRequest(
      username: "myusername",
      password: "mysupersecurepassword",
      options: CognitoSignUpOptions(
        userAttributes: userAttributes
      )
    )
  );
  setState(() {
    isSignUpComplete = res.isSignUpComplete;
  });
} on AuthError catch (e) {
  print(e);
}
```


