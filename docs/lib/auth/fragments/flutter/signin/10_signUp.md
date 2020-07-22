 ```dart
Map<String, dynamic> userAttributes = {
  "email": emailController.text,
  "phone_number": phoneController.text,
  // additional attributes as needed
};
SignUpResult res = await Amplify.Auth.signUp(
  request: SignUpRequest(
    username: usernameController.text.trim(),
    password: passwordController.text.trim(),
    // optional, if your UserPool is configured to use an email/phone number as a username
    provider: CognitoSignUpRequestProvider(usernameAttribute: "email"),
    options: SignUpOptions(
        userAttributes: userAttributes,
    )
  ), 
  success: (res) => print("success callback! " + res.toString())
  error: (res) => print("error callback! " + res.toString())
);
```

