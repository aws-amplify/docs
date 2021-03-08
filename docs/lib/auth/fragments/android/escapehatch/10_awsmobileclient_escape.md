<amplify-block-switcher>
<amplify-block name="Java">

```java
AWSMobileClient mobileClient = (AWSMobileClient) Amplify.Auth.getPlugin("awsCognitoAuthPlugin").getEscapeHatch();
```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

```kotlin
val cognitoAuthPlugin = Amplify.Auth.getPlugin("awsCognitoAuthPlugin")
val mobileClient = cognitoAuthPlugin.escapeHatch as AWSMobileClient
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

```kotlin
val cognitoAuthPlugin = Amplify.Auth.getPlugin("awsCognitoAuthPlugin")
val mobileClient = cognitoAuthPlugin.escapeHatch as AWSMobileClient
```

</amplify-block>
<amplify-block name="RxJava">

```java
AWSMobileClient mobileClient =
    (AWSMobileClient) RxAmplify.Auth.getPlugin("awsCognitoAuthPlugin").getEscapeHatch();
```

</amplify-block>
</amplify-block-switcher>

You can use the escape hatch to `federatedSignIn` with a valid token from other social providers. Find more details [here](https://docs.amplify.aws/sdk/auth/federated-identities/q/platform/android)

```java
mobileClient.federatedSignIn(IdentityProvider.FACEBOOK.toString(), "<FACEBOOK_TOKEN_HERE>", new Callback<UserStateDetails>() {
    @Override
    public void onResult(final UserStateDetails userStateDetails) {
        //Handle the result
    }

    @Override
    public void onError(Exception e) {
        Log.e(TAG, "sign-in error", e);
    }
});
```
