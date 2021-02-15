<amplify-block-switcher>
<amplify-block name="Java">

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

</amplify-block>
<amplify-block name="Kotlin">

 ```kotlin
val attributes: ArrayList<AuthUserAttribute> = ArrayList()
attributes.add(AuthUserAttribute(AuthUserAttributeKey.email(), "my@email.com"))
attributes.add(AuthUserAttribute(AuthUserAttributeKey.phoneNumber(), "+15551234567"))

Amplify.Auth.signUp(
    "username",
    "Password123",
    AuthSignUpOptions.builder().userAttributes(attributes).build(),
    { result: AuthSignUpResult -> Log.i("TAG", result.toString()) },
    { error: AuthException -> Log.e("TAG", error.toString()) }
)
```

</amplify-block>
<amplify-block name="RxJava">

```java
ArrayList<AuthUserAttribute> attributes = new ArrayList<>();
attributes.add(new AuthUserAttribute(AuthUserAttributeKey.email(), "my@email.com"));
attributes.add(new AuthUserAttribute(AuthUserAttributeKey.phoneNumber(), "+15551234567"));

RxAmplify.Auth.signUp(
    "username",
    "Password123",
    AuthSignUpOptions.builder().userAttributes(attributes).build())
    .subscribe(
        result -> Log.i("TAG", result.toString()),
        error -> Log.e("TAG", error.toString())
    );
```

</amplify-block>
</amplify-block-switcher>
