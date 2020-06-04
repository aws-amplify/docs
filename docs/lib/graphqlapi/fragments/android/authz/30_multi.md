When you have configured multiple APIs, you can specify the name of the API as a parameter as the target for an operation:

<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.API.mutate(
    "[FRIENDLY-NAME-API-WITH-API-KEY]",
    request,
    response -> Log.i("MyAmplifyApp", "Mutation successful"),
    error -> Log.e("MyAmplifyApp", "Failed to mutate model.", error)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.API.mutate(
    "[FRIENDLY-NAME-API-WITH-API-KEY]",
    request,
    { Log.i("MyAmplifyApp", "Mutation successful") },
    { Log.e("MyAmplifyApp", "Failed to mutate model.", it) }
)
```

</amplify-block>
</amplify-block-switcher>
