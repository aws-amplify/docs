<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Auth.signOut(
    () -> Log.i("AuthQuickstart", "Signed out successfully"),
    error -> Log.e("AuthQuickstart", error.toString())
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
try {
    Amplify.Auth.signOut()
    Log.i("AuthQuickstart", "Signed out successfully")
} catch (error: AuthException) {
    Log.e("AuthQuickstart", "Sign out failed", error)
}
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.Auth.signOut()
    .subscribe(
        () -> Log.i("AuthQuickstart", "Signed out successfully"),
        error -> Log.e("AuthQuickstart", error.toString())
    );
```

</amplify-block>
</amplify-block-switcher>
