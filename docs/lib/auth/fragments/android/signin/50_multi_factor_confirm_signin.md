<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Auth.confirmSignIn(
    "confirmation code received via SMS",
    result -> Log.i("AuthQuickstart", result.toString()),
    error -> Log.e("AuthQuickstart", error.toString())
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
try {
    val result = Amplify.Auth.confirmSignIn("code received via SMS")
    Log.i("AuthQuickstart", "Confirmed signin: $result") 
} catch (error: AuthException) {
    Log.e("AuthQuickstart", "Failed to confirm signin", error)
}
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.Auth.confirmSignIn("confirmation code received via SMS")
    .subscribe(
        result -> Log.i("AuthQuickstart", result.toString()),
        error -> Log.e("AuthQuickstart", error.toString())
    );
```

</amplify-block>
</amplify-block-switcher>
