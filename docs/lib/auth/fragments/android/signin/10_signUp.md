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
Amplify.Auth.signUp(
        "username",
        "Password123",
        AuthSignUpOptions.builder().userAttribute(AuthUserAttributeKey.email(), "my@email.com").build(),
        { result -> Log.i("AuthQuickStart", "Result: $result") },
        { error -> Log.e("AuthQuickStart", "Sign up failed", error) }
)
```

 </amplify-block>
</amplify-block-switcher>