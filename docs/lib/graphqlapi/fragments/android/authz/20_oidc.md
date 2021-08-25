Add the following code to your app:

<amplify-block-switcher>
<amplify-block name="Java">

```java
ApiAuthProviders authProviders = ApiAuthProviders.builder()
    .oidcAuthProvider(() -> "[OPEN-ID-CONNECT-TOKEN]")
    .build();
AWSApiPlugin plugin = AWSApiPlugin.builder()
    .apiAuthProviders(authProviders)
    .build();
Amplify.addPlugin(plugin);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
val authProviders = ApiAuthProviders.builder()
    .oidcAuthProvider { "[OPEN-ID-CONNECT-TOKEN]" }
    .build()
val plugin = AWSApiPlugin.builder()
    .apiAuthProviders(authProviders)
    .build()
Amplify.addPlugin(plugin)
```

</amplify-block>
</amplify-block-switcher>
