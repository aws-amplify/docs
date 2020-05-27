```java
ArrayList<AuthUserAttribute> attributes = new ArrayList<>();
attributes.add(new AuthUserAttribute(AuthUserAttributeKey.email(), "my@email.com"));
attributes.add(new AuthUserAttribute(AuthUserAttributeKey.phoneNumber(), "+15551234567"));

Amplify.Auth.signUp(
        "username",
        "Password123",
        AuthSignUpOptions.builder().userAttributes(attributes).build(),
        result -> Log.i("TAG", result.toString()),
        error -> Log.e("TAG", error.toString())
);
```
