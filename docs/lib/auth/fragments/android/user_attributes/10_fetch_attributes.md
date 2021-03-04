<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Auth.fetchUserAttributes(
    attributes -> Log.i("AuthDemo", "User attributes = " + attributes.toString()),
    error -> Log.e("AuthDemo", "Failed to fetch user attributes.", error)
);
```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

```kotlin
Amplify.Auth.fetchUserAttributes(
    { Log.i("AuthDemo", "User attributes = $attributes") },
    { Log.e("AuthDemo", "Failed to fetch user attributes", it) }
)
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

```kotlin
try {
    val attributes = Amplify.Auth.fetchUserAttributes()
    Log.i("AuthDemo", "User attributes = $attributes")
} catch (error: AuthException) {
    Log.e("AuthDemo", "Failed to fetch user attributes", error)
}
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.Auth.fetchUserAttributes()
    .doOnSubscribe(() -> Log.i("AuthDemo", "Attributes:"))
    .flatMapObservable(Observable::fromIterable)
    .subscribe(
        eachAttribute -> Log.i("AuthDemo", eachAttribute.toString()),
        error -> Log.e("AuthDemo", "Failed to fetch attributes.", error)
    );
```

</amplify-block>
</amplify-block-switcher>
