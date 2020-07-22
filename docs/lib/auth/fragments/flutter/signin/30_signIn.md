```java
SignInResult res = await Amplify.Auth.signIn(
  request: SignInRequest(
    username: usernameController.text.trim(),
    password: passwordController.text.trim(),
  ), 
  success: (res) => print("success callback! " + res.toString())
  error: (res) => print("error callback! " + res.toString())
);
```


