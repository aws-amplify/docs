<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Auth.resetPassword(
   "username",
   result -> Log.i("AuthQuickstart", result.toString()),
   error -> Log.e("AuthQuickstart", error.toString())
);
```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

```kotlin
Amplify.Auth.resetPassword("username",
    { Log.i("AuthQuickstart", "Password reset OK: $it") },
    { Log.e("AuthQuickstart", "Password reset failed", error) }
)
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

```kotlin
try {
    val result = Amplify.Auth.resetPassword("username")
    Log.i("AuthQuickstart", "Password reset OK: $result")
} catch (error: AuthException) {
    Log.e("AuthQuickstart", "Password reset failed", error)
}
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.Auth.resetPassword("username")
    .subscribe(
        result -> Log.i("AuthQuickstart", result.toString()),
        error -> Log.e("AuthQuickstart", error.toString())
    );
```

</amplify-block>
</amplify-block-switcher>
