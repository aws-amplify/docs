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
<amplify-block name="Kotlin - Callbacks">

```kotlin
Amplify.Auth.signIn("username", "password",
    { result ->
        if (result.isSignInComplete) {
            Log.i("AuthQuickstart", "Sign in succeeded")
        } else {
            Log.i("AuthQuickstart", "Sign in not complete")
        }
    },
    { Log.e("AuthQuickstart", "Failed to sign in", it) }
)
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

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
