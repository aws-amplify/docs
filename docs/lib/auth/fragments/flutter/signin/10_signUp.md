 ```dart
try {
  Map<String, dynamic> userAttributes = {
    "email": emailController.text,
    "phone_number": phoneController.text,
    // additional attributes as needed
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

