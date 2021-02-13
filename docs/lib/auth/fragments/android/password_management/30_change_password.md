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
<amplify-block name="Kotlin">

```kotlin
try {
    Amplify.Auth.updatePassword("existingPassword", "newPassword")
    Log.i("AuthQuickstart", "Updated password successfully")
} catch (error: AuthException) {
    Log.e("AuthQuickstart", error.toString())
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
