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
<amplify-block name="Kotlin">

 ```kotlin
Amplify.Auth.signOut(
    AuthSignOutOptions.builder().globalSignOut(true).build(),
    { Log.i("AuthQuickstart", "Signed out globally") },
    { error -> Log.e("AuthQuickstart", error.toString()) }
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
