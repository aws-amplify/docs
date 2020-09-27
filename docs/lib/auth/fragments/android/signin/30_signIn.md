<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Auth.signIn(
    "username",
    "password",
    result -> Log.i("AuthQuickstart", result.isSignInComplete() ? "Sign in succeeded" : "Sign in not complete"),
    error -> Log.e("AuthQuickstart", error.toString())
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.Auth.signIn(
    "username",
    "password",
    { result -> Log.i("AuthQuickstart", if (result.isSignInComplete) "Sign in succeeded" else "Sign in not complete") },
    { error -> Log.e("AuthQuickstart", error.toString()) }
)
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.Auth.signIn("username", "password")
    .subscribe(
        result -> Log.i("AuthQuickstart", result.isSignInComplete() ? "Sign in succeeded" : "Sign in not complete"),
        error -> Log.e("AuthQuickstart", error.toString())
    );
```

</amplify-block>
</amplify-block-switcher>