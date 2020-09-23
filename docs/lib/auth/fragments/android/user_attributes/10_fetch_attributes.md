<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Auth.fetchUserAttributes(
    attributes -> Log.i("AuthDemo", "User attributes = " + attributes.toString()),
    error -> Log.e("AuthDemo", "Failed to fetch user attributes.", error)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.Auth.fetchUserAttributes(
    { Log.i("AuthDemo", "User attributes = $it") },
    { Log.e("AuthDemo", "Failed to fetch user attributes.", $it) }
)
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.Auth.fetchUserAttributes()
    .subscribe(
        result -> Log.i("Fetch user attributes succeeded", "Result: " + result.toString()),
        error -> Log.e("Fetch user attributes failed", error.toString())
    );
```

</amplify-block>
</amplify-block-switcher>
