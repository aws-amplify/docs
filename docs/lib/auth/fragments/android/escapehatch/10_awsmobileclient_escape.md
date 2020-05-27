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
