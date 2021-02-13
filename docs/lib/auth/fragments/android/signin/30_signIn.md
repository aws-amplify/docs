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
try {
    val result = Amplify.Auth.signIn("username", "password")
    if (result.isSignInComplete) {
        Log.i("AuthQuickstart", "Sign in succeeded")
    } else {
        Log.e("AuthQuickstart", "Sign in not complete")
    }
} catch (error: AuthException) {
    Log.e("AuthQuickstart", "Sign in failed", error)
}
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
