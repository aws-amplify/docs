<amplify-block-switcher>
 <amplify-block name="Java">

```java
AWSMobileClient mobileClient = (AWSMobileClient) Amplify.Auth.getPlugin("awsCognitoAuthPlugin").getEscapeHatch();
```

 </amplify-block>
 <amplify-block name="Kotlin">

 ```kotlin
val mobileClient = Amplify.Auth.getPlugin("awsCognitoAuthPlugin").escapeHatch as AWSMobileClient?
```

 </amplify-block>
</amplify-block-switcher>

You can use the escape hatch to `federatedSignIn` with a valid token from other social providers. Find more details [here](https://docs.amplify.aws/sdk/auth/federated-identities/q/platform/android)