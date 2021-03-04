<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Auth.forgetDevice(
    () -> Log.i("AuthQuickStart", "Forget device succeeded"),
    error -> Log.e("AuthQuickStart", "Forget device failed with error " + error.toString())
);
```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

```kotlin
Amplify.Auth.forgetDevice(
    { Log.i("AuthQuickStart", "Forget device succeeded") },
    { Log.e("AuthQuickStart", "Forget device failed with error", it) }
)
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

```kotlin
try {
    Amplify.Auth.forgetDevice()
    Log.i("AuthQuickStart", "Forget device succeeded") 
} catch (error: AuthException) {
    Log.e("AuthQuickStart", "Forget device failed with error", error)
}
```

</amplify-block>
<amplify-block name="RxJava">

```java
Amplify.Auth.forgetDevice()
    .subscribe(
      () -> Log.i("AuthQuickStart", "Forget device succeeded"),
      error -> Log.e("AuthQuickStart", "Forget device failed with error " + error.toString())
    );
```

</amplify-block>
</amplify-block-switcher>
