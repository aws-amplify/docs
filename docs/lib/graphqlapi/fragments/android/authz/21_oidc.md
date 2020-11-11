Implement your class which conforms to `OidcAuthProvider`:

<amplify-block-switcher>
<amplify-block name="Java">

```java
public final class MyOidcAuthProvider implements OidcAuthProvider {
    @Override
    public synchronized String getLatestAuthToken() throws ApiException {
        final Semaphore semaphore = new Semaphore(0);
        final AtomicReference<String> authToken = new AtomicReference<>();
        final AtomicReference<AuthException> authError = new AtomicReference<>();
        Amplify.Auth.fetchAuthSession(
            session -> {
                String token = ((AWSCognitoAuthSession) session)
                        .getUserPoolTokens()
                        .getValue()
                        .getIdToken();
                authToken.set(token);
                semaphore.release();
            },
            error -> {
                authError.set(error);
                semaphore.release();
            }
        );

        try {
            semaphore.acquire();
        } catch (Exception exception) {
            throw new ApiException(
                "Error fetching ID token.",
                "Please try this operation again."
            );
        }
        if (authError.get() != null) {
            throw new ApiException(
                "Error fetching ID token.",
                authError.get(),
                "Please try this operation again."
            );
        }
        return authToken.get();
    }
}
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
class MyOidcAuthProvider : OidcAuthProvider {
    @Synchronized
    @Throws(ApiException::class)
    override fun getLatestAuthToken(): String {
        val semaphore = Semaphore(0)
        val authToken = AtomicReference<String>()
        val authError = AtomicReference<AuthException?>()
        Amplify.Auth.fetchAuthSession(
            {
                val token = (it as AWSCognitoAuthSession)
                        .userPoolTokens
                        .value
                        ?.idToken
                authToken.set(token)
                semaphore.release()
            },
            {
                authError.set(it)
                semaphore.release()
            }
        )

        try {
            semaphore.acquire()
        } catch (exception: Exception) {
            throw ApiException(
                "Error fetching ID token.",
                "Please try this operation again."
            )
        }
        authError.get()?.let {
            throw ApiException(
                "Error fetching ID token.", it,
                "Please try this operation again."
            )
        }
        return authToken.get()
    }
}
```

</amplify-block>
</amplify-block-switcher>

Add the following code to your app to initialize API plugin with custom OIDC auth provider:

<amplify-block-switcher>
<amplify-block name="Java">

```java
ApiAuthProviders authProviders = ApiAuthProviders.builder()
    .oidcAuthProvider(new MyOidcAuthProvider())
    .build();
Amplify.addPlugin(new AWSApiPlugin(authProviders));
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
val authProviders = ApiAuthProviders.builder()
    .oidcAuthProvider { MyOidcAuthProvider() }
    .build()
Amplify.addPlugin(AWSApiPlugin(authProviders))
```

</amplify-block>
</amplify-block-switcher>
