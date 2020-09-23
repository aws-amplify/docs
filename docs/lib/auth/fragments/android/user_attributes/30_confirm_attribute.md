<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Auth.confirmUserAttribute(
    AuthUserAttributeKey.email(),
    "344299",
    () -> Log.i("User attribute is confirmed", "Code is correct"),
    error -> Log.e("User attribute is not confirmed", error.toString())
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.Auth.confirmUserAttribute(
    AuthUserAttributeKey.email(),
    "344299",
    { Log.i("User attribute is confirmed", "Code is correct") },
    { error-> Log.e("User attribute is not confirmed", error.toString()) }
)
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.Auth.confirmUserAttribute(AuthUserAttributeKey.email(), "344299")
    .subscribe(
        () -> Log.i("User attribute is confirmed", "Code is correct"),
        error -> Log.e("User attribute is not confirmed", error.toString())
    );
```

</amplify-block>
</amplify-block-switcher>