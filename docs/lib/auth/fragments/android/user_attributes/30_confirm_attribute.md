<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Auth.confirmUserAttribute(AuthUserAttributeKey.email(), "344299",
    () -> Log.i("AuthDemo", "Confirmed user attribute with correct code."),
    error -> Log.e("AuthDemo", "Failed to confirm user attribute. Bad code?", error)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.Auth.confirmUserAttribute(AuthUserAttributeKey.email(), "344299",
    { Log.i("AuthDemo", "Confirmed user attribute with correct code.") },
    { Log.e("AuthDemo", "Failed to confirm user attribute. Bade code?", $it) }
)
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.Auth.confirmUserAttribute(AuthUserAttributeKey.email(), "344299")
    .subscribe(
        () -> Log.i("AuthDemo", "Confirmed user attribute using correct code."),
        error -> Log.e("AuthDemo", "Failed to confirm user attribute. Bad code?", error)
    );
```

</amplify-block>
</amplify-block-switcher>
