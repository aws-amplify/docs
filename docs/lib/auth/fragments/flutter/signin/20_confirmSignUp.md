```java
SignUpResult res = await Amplify.Auth.confirmSignUp(
  request: ConfirmSignUpRequest(
    userKey: usernameController.text.trim(),
    confirmationCode: confirmationCodeController.text.trim(),
  ), 
  success: (res) => print("success callback! " + res.toString())
  error: (res) => print("error callback! " + res.toString())
);
```

