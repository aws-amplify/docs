```dart
try {
  Map<String, dynamic> userAttributes = {
    "email": "email@domain.com",
    // Note: phone_number requires country code
    "phone_number": "+15551234",
  };
  SignUpResult res = await Amplify.Auth.signUp(
    username: "myusername",
    password: "mysupersecurepassword",
    options: CognitoSignUpOptions(
      userAttributes: userAttributes
    )
  );
  setState(() {
    isSignUpComplete = res.isSignUpComplete;
  });
} on AuthError catch (e) {
  print(e);
}
```


