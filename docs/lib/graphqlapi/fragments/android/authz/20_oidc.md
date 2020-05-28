Add the following code to your app:

<amplify-block-switcher>
<amplify-block name="Java">

```java
ApiAuthProviders authProviders = ApiAuthProviders.builder()
    .oidcAuthProvider(() -> "{my-open-id-connect-token}")
    .build();
Amplify.addPlugin(new AWSApiPlugin(authProviders));
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
val authProviders = ApiAuthProviders.builder()
    .oidcAuthProvider { "{my-open-id-connect-token}" }
    .build()
Amplify.addPlugin(AWSApiPlugin(authProviders))
```

</amplify-block>
</amplify-block-switcher>
