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
Amplify.Auth.signOut(
    { Log.i("AuthQuickstart", "Signed out successfully") },
    { error -> Log.e("AuthQuickstart", error.toString()) }
)
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