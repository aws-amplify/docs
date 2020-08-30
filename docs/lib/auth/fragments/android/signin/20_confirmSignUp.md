<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Auth.confirmSignUp(
    "username",
    "the code you received via email",
    result -> Log.i("AuthQuickstart", result.isSignUpComplete() ? "Confirm signUp succeeded" : "Confirm sign up not complete"),
    error -> Log.e("AuthQuickstart", error.toString())
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.Auth.confirmSignUp(
    "username",
    "the code you received via email",
    { result -> Log.i("AuthQuickstart", if (result.isSignUpComplete) "Confirm signUp succeeded" else "Confirm sign up not complete") },
    { error -> Log.e("AuthQuickstart", error.toString()) }
)
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.Auth.confirmSignUp("username", "the code you received via email")
    .subscribe(
        result -> Log.i("AuthQuickstart", result.isSignUpComplete() ? "Confirm signUp succeeded" : "Confirm sign up not complete"),
        error -> Log.e("AuthQuickstart", error.toString())
    );
```

</amplify-block>
</amplify-block-switcher>