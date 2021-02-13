<amplify-block-switcher>
<amplify-block name="Java">

 ```java
Amplify.Auth.signUp(
        "username",
        "Password123",
        AuthSignUpOptions.builder().userAttribute(AuthUserAttributeKey.email(), "my@email.com").build(),
        result -> Log.i("AuthQuickStart", "Result: " + result.toString()),
        error -> Log.e("AuthQuickStart", "Sign up failed", error)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
val options = AuthSignUpOptions.builder()
    .userAttribute(AuthUserAttributeKey.email(), "my@email.com")
    .build()
try {
    val result = Amplify.Auth.signUp("username", "Password123", options)
    Log.i("AuthQuickStart", "Result: $result") 
} catch (error: AuthException) {
    Log.e("AuthQuickStart", "Sign up failed", error)
}
```

</amplify-block>
<amplify-block name="RxJava">

 ```java
RxAmplify.Auth.signUp(
    "username",
    "Password123",
    AuthSignUpOptions.builder().userAttribute(AuthUserAttributeKey.email(), "my@email.com").build())
    .subscribe(
        result -> Log.i("AuthQuickStart", "Result: " + result.toString()),
        error -> Log.e("AuthQuickStart", "Sign up failed", error)
    );
```

</amplify-block>
</amplify-block-switcher>
