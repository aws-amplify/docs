For now, just add this method to the `onCreate` method of MainActivity with whatever provider you're using (shown with Facebook below):

<amplify-block-switcher>
 <amplify-block name="Java">

```java
Amplify.Auth.signInWithSocialWebUI(
        AuthProvider.facebook(),
        this,
        result -> Log.i("AuthQuickstart", result.toString()),
        error -> Log.e("AuthQuickstart", error.toString())
);
```

 </amplify-block>
 <amplify-block name="Kotlin">

 ```kotlin
Amplify.Auth.signInWithSocialWebUI(
        AuthProvider.facebook(),
        this,
        { result -> Log.i("AuthQuickstart", result.toString()) },
        { error -> Log.e("AuthQuickstart", error.toString()) }
)
```

 </amplify-block>
</amplify-block-switcher>
