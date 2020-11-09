Add the following code to your app:

<amplify-block-switcher>
<amplify-block name="Java">

```java
ApiAuthProviders authProviders = ApiAuthProviders.builder()
    .oidcAuthProvider(() -> {
        // TODO: Amplify.Auth.fetchAuthSession
    })
    .build();
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
val authProviders = ApiAuthProviders.builder()
    .oidcAuthProvider { 
        // TODO: Amplify.Auth.fetchAuthSession
     }
    .build()
```

</amplify-block>
</amplify-block-switcher>
