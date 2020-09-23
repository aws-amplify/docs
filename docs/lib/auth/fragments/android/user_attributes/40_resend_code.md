<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Auth.resendUserAttributeConfirmationCode(AuthUserAttributeKey.email(),
    result -> Log.i("AuthDemo", "Code was sent again: " + result.toString()),
    error -> Log.e("AuthDemo", "Failed to resend code.", error)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.Auth.resendUserAttributeConfirmationCode(AuthUserAttributeKey.email(),
    { Log.i("AuthDemo", "Code was resent: $it.") },
    { Log.e("AuthDemo", "Failed to resend code.", $it) }
)
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.Auth.resendUserAttributeConfirmationCode(AuthUserAttributeKey.email())
    .subscribe(
        result -> Log.i("AuthDemo", "Code was resent: " + result.toString()),
        error -> Log.e("AuthDemo", "Failed to resend code.", error)
    );
```

</amplify-block>
</amplify-block-switcher>
