Sweet! You're now ready to launch sign in with web UI. For now, just add this method to the `onCreate` method of MainActivity:

<amplify-block-switcher>
 <amplify-block name="Java">

```java
Amplify.Auth.signInWithWebUI(
    this,
    result -> Log.i("AuthQuickStart", result.toString()),
    error -> Log.e("AuthQuickStart", error.toString())
);
```

 </amplify-block>
 <amplify-block name="Kotlin">

```kotlin
Amplify.Auth.signInWithWebUI(
    this,
    { result -> Log.i("AuthQuickStart", result.toString()) },
    { error -> Log.e("AuthQuickStart", error.toString()) }
)
```

 </amplify-block>
</amplify-block-switcher>


