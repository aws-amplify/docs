You can make a call to the specific client using the friendly name:

<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.API.mutate(
    "friendly_name_API_KEY",
    request,
    response -> Log.i("MyAmplifyApp", "Mutation successful"),
    error -> Log.e("MyAmplifyApp", "Failed to mutate model.", error)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.API.mutate(
    "friendly_name_API_KEY",
    request,
    { Log.i("MyAmplifyApp", "Mutation successful") },
    { Log.e("MyAmplifyApp","Failed to mutate model.", it) }
)
```

</amplify-block>
</amplify-block-switcher>
