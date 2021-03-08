When using a 3rd party OIDC auth provider, you are required to provide an instance of `ApiAuthProviders` containing an implementation of the `OidcAuthProvider` interface. The responsibility of the `OidcAuthProvider` is to return the JWT token that was provided by your OIDC provider. To do this:

* Pass your `ApiAuthProviders` to the `AWSApiPlugin` constructor, and then call `Amplify.configure(...)`

<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.addPlugin(new AWSApiPlugin(ApiAuthProviders.builder()
    .oidcAuthProvider(() -> "token-from-your-oidc-provider")
    .build()));
Amplify.addPlugin(new AWSDataStorePlugin());
Amplify.configure(getApplicationContext());
```

</amplify-block>

<amplify-block name="Kotlin">

```kotlin
Amplify.addPlugin(AWSApiPlugin(ApiAuthProviders.builder()
    .oidcAuthProvider { "token-from-your-oidc-provider" }
    .build()))
Amplify.addPlugin(AWSDataStorePlugin());
Amplify.configure(getApplicationContext());
```

</amplify-block>
</amplify-block-switcher>
