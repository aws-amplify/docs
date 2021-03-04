<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.DataStore.start(
    () -> Log.i("MyAmplifyApp", "DataStore started"),
    error -> Log.e("MyAmplifyApp", "Error starting DataStore", error)
);
```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

```kotlin
Amplify.DataStore.start(
    { Log.i("MyAmplifyApp", "DataStore started") },
    { Log.e("MyAmplifyApp", "Error starting DataStore", it) }
)
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

```kotlin
try {
    Amplify.DataStore.start()
    Log.i("MyAmplifyApp", "DataStore started") 
} catch (error: DataStoreException) {
    Log.e("MyAmplifyApp", "Error starting DataStore", error)
}
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.DataStore.start()
    .subscribe(
        () -> Log.i("MyAmplifyApp", "DataStore started"),
        error -> Log.e("MyAmplifyApp", "Error starting DataStore", error)
    );
}
```

</amplify-block>
</amplify-block-switcher>
