For testing purposes, you can run this from your MainActivity's `onCreate` method.

<amplify-block-switcher>
 <amplify-block name="Java">

 ```java
Amplify.Auth.fetchAuthSession(
        result -> Log.i("AmplifyQuickstart", result.toString()),
        error -> Log.e("AmplifyQuickstart", error.toString())
);
```

 </amplify-block>
 <amplify-block name="Kotlin">

 ```kotlin
Amplify.Auth.fetchAuthSession(
        { result -> Log.i("AmplifyQuickstart", result.toString()) },
        { error -> Log.e("AmplifyQuickstart", error.toString()) }
)
```

 </amplify-block>
 <amplify-block name="RxJava">

 ```java
RxAmplify.Auth.fetchAuthSession()
    .subscribe(
        result -> Log.i("AmplifyQuickstart", result.toString()),
        error -> Log.e("AmplifyQuickstart", error.toString())
    );
```

 </amplify-block>
</amplify-block-switcher>
