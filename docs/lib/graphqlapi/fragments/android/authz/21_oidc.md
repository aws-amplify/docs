Add the following code to your app to initialize API plugin with OIDC auth provider:

<amplify-block-switcher>
<amplify-block name="Java">

This implementation uses `CompletableFuture<T>`, which requires `minSdkVersion >= 24`.

```java
ApiAuthProviders authProviders = ApiAuthProviders.builder()
    .oidcAuthProvider(() -> {
        CompletableFuture<String> future = new CompletableFuture<>();
        Amplify.Auth.fetchAuthSession(
            session -> future.complete(((AWSCognitoAuthSession) session)
                .getUserPoolTokens()
                .getValue()
                .getIdToken()),
            future::completeExceptionally
        );
        try {
            return future.get();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    })
    .build();
AWSApiPlugin plugin = AWSApiPlugin.builder()
    .apiAuthProviders(authProviders)
    .build();
Amplify.addPlugin(plugin);
```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

This implementation uses `CompletableFuture<T>`, which requires `minSdkVersion >= 24`.

```kotlin
val authProviders = ApiAuthProviders.builder()
    .oidcAuthProvider {
        val future = CompletableFuture<String>()
        Amplify.Auth.fetchAuthSession(
            { future.complete((it as AWSCognitoAuthSession).userPoolTokens.value?.idToken) },
            { future.completeExceptionally(it) }
        )
        future.get()
    }
    .build()
val plugin = AWSApiPlugin.builder()
    .apiAuthProviders(authProviders)
    .build()
Amplify.addPlugin(plugin)
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

This implementation uses `CompletableFuture<T>`, which requires `minSdkVersion >= 24`.

```kotlin
val authProviders = ApiAuthProviders.builder()
    .oidcAuthProvider {
        val session = runBlocking { Amplify.Auth.fetchAuthSession() }
        return (session as AWSCognitoAuthSession).userPoolTokens.value?.idToken
    }
    .build()
val plugin = AWSApiPlugin.builder()
    .apiAuthProviders(authProviders)
    .build()
Amplify.addPlugin(plugin)
```

</amplify-block>
<amplify-block name="RxJava">

Using the `rxbindings` module can simplify this further.

```groovy
dependencies {
    // other dependencies...
    implementation 'com.amplifyframework:rxbindings:1.27.0'
}
```

```java
ApiAuthProviders authProviders = ApiAuthProviders.builder()
    .oidcAuthProvider(() -> RxAmplify.Auth.fetchAuthSession()
        .map(session -> ((AWSCognitoAuthSession) session)
            .getUserPoolTokens()
            .getValue()
            .getIdToken())
        .blockingGet())
    .build();
AWSApiPlugin plugin = AWSApiPlugin.builder()
    .apiAuthProviders(authProviders)
    .build();
Amplify.addPlugin(plugin);
```

</amplify-block>
<amplify-block name="Kotlin (with RxJava)">

Using the `rxbindings` module can simplify this further.

```groovy
dependencies {
    // other dependencies...
    implementation 'com.amplifyframework:rxbindings:1.27.0'
}
```

```kotlin
val authProviders = ApiAuthProviders.builder()
    .oidcAuthProvider { RxAmplify.Auth.fetchAuthSession()
        .map { (it as AWSCognitoAuthSession)
            .userPoolTokens
            .value
            ?.idToken }
        .blockingGet() }
    .build()
val plugin = AWSApiPlugin.builder()
    .apiAuthProviders(authProviders)
    .build()
Amplify.addPlugin(plugin)
```

</amplify-block>
</amplify-block-switcher>
