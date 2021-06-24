<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Auth.fetchAuthSession(
    result -> Log.i("AuthQuickstart", result.isSignedIn() ? "User is signed in" : "User is signed out"),
    error -> Log.e("AuthQuickstart", "Failed to fetch AuthSession" + error.toString())
);
```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

```kotlin
Amplify.Auth.fetchAuthSession(
    { result ->
        if (result.isSignedIn) {
            Log.i("AuthQuickstart", "User is signed in")
        } else {
            Log.i("AuthQuickstart", "User is signed out")
        }
    },
    { Log.e("AuthQuickstart", "Failed to fetch AuthSession", it) }
)
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

```kotlin
try {
    val result = Amplify.Auth.fetchAuthSession()
    if (result.isSignedIn) {
        Log.i("AuthQuickstart", "User is signed in")
    } else {
        Log.i("AuthQuickstart", "User is signed out")
    }
} catch (error: AuthException) {
    Log.e("AuthQuickstart", "Failed to fetch AuthSession", error)
}
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.Auth.fetchAuthSession()
    .subscribe(
        result -> Log.i("AuthQuickstart", result.isSignedIn() ? "User is signed in" : "User is signed out"),
        error -> Log.e("AuthQuickstart", "Failed to fetch AuthSession" + error.toString())
    );
```

</amplify-block>
</amplify-block-switcher>
