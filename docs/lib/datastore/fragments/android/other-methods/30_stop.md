<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.DataStore.stop(
    () -> Log.i("MyAmplifyApp", "DataStore stopped"),
    error -> Log.e("MyAmplifyApp", "Error stopped DataStore", error)
);
```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

```kotlin
Amplify.DataStore.stop(
    { Log.i("MyAmplifyApp", "DataStore stopped") },
    { Log.e("MyAmplifyApp", "Error stopped DataStore", it) }
)
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

```kotlin
try {
    Amplify.DataStore.stop()
    Log.i("MyAmplifyApp", "DataStore stopped")
} catch (error: DataStoreException) {
    Log.e("MyAmplifyApp", "Error stopping DataStore", error)
}
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.DataStore.stop()
    .subscribe(
        () -> Log.i("MyAmplifyApp", "DataStore stopped"),
        error -> Log.e("MyAmplifyApp", "Error stopping DataStore", error)
    );
}
```

</amplify-block>
</amplify-block-switcher>
