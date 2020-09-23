<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Auth.fetchUserAttributes(
    result -> Log.i("Fetch user attributes succeeded", "Result: " + result.toString()),
    error -> Log.e("Fetch user attributes failed", error.toString())
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.Auth.fetchUserAttributes(
    { result-> Log.i("Fetch user attributes succeeded", "Result: " + result.toString()) },
    { error-> Log.e("Fetch user attributes failed", error.toString()) }
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