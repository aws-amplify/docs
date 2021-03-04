<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Auth.signOut(
    AuthSignOutOptions.builder().globalSignOut(true).build(),
    () -> Log.i("AuthQuickstart", "Signed out globally"),
    error -> Log.e("AuthQuickstart", error.toString())
);
```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

```kotlin
val options = AuthSignOutOptions.builder()
    .globalSignOut(true)
    .build()
Amplify.Auth.signOut(options,
    { Log.i("AuthQuickstart", "Signed out globally") },
    { Log.e("AuthQuickstart", "Sign out failed", it) }
)
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

```kotlin
val options = AuthSignOutOptions.builder()
    .globalSignOut(true)
    .build()
try {
    Amplify.Auth.signOut(options)
    Log.i("AuthQuickstart", "Signed out globally") 
} catch (error: AuthException) {
    Log.e("AuthQuickstart", "Sign out failed", error)
)
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.Auth.signOut(AuthSignOutOptions.builder().globalSignOut(true).build())
    .subscribe(
        () -> Log.i("AuthQuickstart", "Signed out globally"),
        error -> Log.e("AuthQuickstart", error.toString())
    );
```

</amplify-block>
</amplify-block-switcher> 
