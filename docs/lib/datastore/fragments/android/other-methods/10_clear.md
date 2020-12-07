<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.DataStore.clear(
    () -> Log.i("MyAmplifyApp", "DataStore cleared"),
    error -> Log.e("MyAmplifyApp", "Error clearing DataStore", error)
);

```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.DataStore.clear(
    { Log.i("MyAmplifyApp", "DataStore cleared") },
    { Log.e("MyAmplifyApp", "Error clearing DataStore", it) }
)

```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.DataStore.clear()
    .subscribe(
        () -> Log.i("MyAmplifyApp", "DataStore cleared"),
        error -> Log.e("MyAmplifyApp", "Error clearing DataStore", error)
    );
}
```

</amplify-block>
</amplify-block-switcher>
