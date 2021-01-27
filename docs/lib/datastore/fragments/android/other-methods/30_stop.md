<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.DataStore.stop(
    () -> Log.i("MyAmplifyApp", "DataStore stopped"),
    error -> Log.e("MyAmplifyApp", "Error stopped DataStore", error)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.DataStore.stop(
    { Log.i("MyAmplifyApp", "DataStore stopped") },
    { Log.e("MyAmplifyApp", "Error stopping DataStore", it) }
)
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
