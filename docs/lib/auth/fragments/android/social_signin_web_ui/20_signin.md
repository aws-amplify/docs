For now, just add this method to the `onCreate` method of MainActivity with whatever provider you're using (shown with Facebook below):

<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Auth.signInWithSocialWebUI(AuthProvider.facebook(), this,
    result -> Log.i("AuthQuickstart", result.toString()),
    error -> Log.e("AuthQuickstart", error.toString())
);
```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

```kotlin
Amplify.Auth.signInWithSocialWebUI(AuthProvider.facebook(), this,
    { Log.i("AuthQuickstart", "Sign in OK: $it") },
    { Log.e("AuthQuickstart", "Sign in failed", it) }
)
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

```kotlin
try {
    val result = Amplify.Auth.signInWithSocialWebUI(AuthProvider.facebook(), this)
    Log.i("AuthQuickstart", "Sign in OK: $result")
} catch (error: AuthException) {
    Log.e("AuthQuickstart", "Sign in failed", error)
}
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.Auth.signInWithSocialWebUI(AuthProvider.facebook(), this)
    .subscribe(
        result -> Log.i("AuthQuickstart", result.toString()),
        error -> Log.e("AuthQuickstart", error.toString())
    );
```

</amplify-block>
</amplify-block-switcher>
