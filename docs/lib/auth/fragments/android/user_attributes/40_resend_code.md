<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Auth.resendUserAttributeConfirmationCode(AuthUserAttributeKey.email(),
    result -> Log.i("AuthDemo", "Code was sent again: " + result.toString()),
    error -> Log.e("AuthDemo", "Failed to resend code.", error)
);
```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

```kotlin
Amplify.Auth.resendUserAttributeConfirmationCode(
    AuthUserAttributeKey.email(),
    { Log.i("AuthDemo", "Code was sent again: $it") },
    { Log.e("AuthDemo", "Failed to resend code", it) }
)
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

```kotlin
try {
    val attr = AuthUserAttributeKey.email()
    val result = Amplify.Auth.resendUserAttributeConfirmationCode(attr)
    Log.i("AuthDemo", "Code was sent again: $result."),
} catch (error: AuthException) {
    Log.e("AuthDemo", "Failed to resend code.", error)
}
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
