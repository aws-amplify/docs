<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Auth.confirmSignUp(
    "username",
    "the code you received via email",
    result -> Log.i("AuthQuickstart", result.isSignUpComplete() ? "Confirm signUp succeeded" : "Confirm signUp not complete"),
    error -> Log.e("AuthQuickstart", error.toString())
);
```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

```kotlin
    Amplify.Auth.signIn("username", "old password",
        { result ->
            Log.i("AuthQuickstart", result.nextStep.toString())
            if (result.nextStep.signInStep == AuthSignInStep.CONFIRM_SIGN_IN_WITH_NEW_PASSWORD) {
                val newPassword = "new password"
                Amplify.Auth.confirmSignIn(newPassword,
                    { Log.i("AuthQuickstart", "Confirmed signin: $it") },
                    { Log.e("AuthQuickstart", "Failed to confirm signin", it) }
                )
            }
        },
        { Log.e("AuthQuickstart", "Failed to sign in", it) }
    )
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

```kotlin
try {
        val signInResult = Amplify.Auth.signIn("username", "old password")
        if(signInResult.nextStep.signInStep == AuthSignInStep.CONFIRM_SIGN_IN_WITH_NEW_PASSWORD){
            val newPassword = "new password"
            val confirmSignInResult = Amplify.Auth.confirmSignIn(newPassword)
            if (confirmSignInResult.isSignInComplete) {
                Log.i("AuthQuickstart", "Signup confirmed")
            } else {
                Log.i("AuthQuickstart", "Signup confirmation not yet complete")
            }
        }
    } catch (error: AuthException) {
        Log.e("AuthQuickstart", "Failed to confirm signup", error)
    }
```

</amplify-block>
<amplify-block name="RxJava">

```java
 RxAmplify.Auth.signIn("username", "password")
            .subscribe(
                result -> {
                    if(result.getNextStep().getSignInStep()== AuthSignInStep.CONFIRM_SIGN_IN_WITH_NEW_PASSWORD){
                        Log.i("AuthQuickstart", "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD");
                        RxAmplify.Auth.confirmSignIn("new password")
                                .subscribe(
                                        confirmSignInResult -> Log.i("AuthQuickstart", confirmSignInResult.toString()),
                                        error -> Log.e("AuthQuickstart", error.toString())
                                );
                    } },
                error -> Log.e("AuthQuickstart", error.toString())
            ); }

```

</amplify-block>
</amplify-block-switcher>
