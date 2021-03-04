<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Auth.updatePassword(
    "existingPassword",
    "newPassword",
    () -> Log.i("AuthQuickstart", "Updated password successfully"),
    error -> Log.e("AuthQuickstart", error.toString())
);
```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

```kotlin
Amplify.Auth.updatePassword("existingPassword", "newPassword",
    { Log.i("AuthQuickstart", "Updated password successfully") },
    { Log.e("AuthQuickstart", "Password update failed", it) }
)
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

```kotlin
try {
    Amplify.Auth.updatePassword("existingPassword", "newPassword")
    Log.i("AuthQuickstart", "Updated password successfully")
} catch (error: AuthException) {
    Log.e("AuthQuickstart", "Password update failed", error)
}
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.Auth.updatePassword("existingPassword", "newPassword")
    .subscribe(
        () -> Log.i("AuthQuickstart", "Updated password successfully"),
        error -> Log.e("AuthQuickstart", error.toString())
    );
```

</amplify-block>
</amplify-block-switcher>
