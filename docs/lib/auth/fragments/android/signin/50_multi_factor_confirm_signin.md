<amplify-block-switcher>
 <amplify-block name="Java">

```java
Amplify.Auth.confirmSignIn(
    "confirmation code received via SMS",
    result -> Log.i("AuthQuickstart", result.toString()),
    error -> Log.e("AuthQuickstart", error.toString())
);
```

 </amplify-block>
 <amplify-block name="Kotlin">

 ```kotlin
Amplify.Auth.confirmSignIn(
    "confirmation code received via SMS",
    { result: AuthSignInResult -> Log.i("AuthQuickstart", result.toString()) },
    { error: AuthException -> Log.e("AuthQuickstart", error.toString()) }
)
```

 </amplify-block>
</amplify-block-switcher>
