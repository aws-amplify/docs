## Clear

To clear local data from DataStore, use the `clear` method:

<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.DataStore.clear(
    () -> Log.i("MyAmplifyApp", "DataStore cleared"),
    error -> Log.e("MyAmplifyApp", "Error clearing DataStore: ", error)
);

```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.DataStore.clear(
    { Log.i("MyAmplifyApp", "DataStore cleared") },
    { error: DataStoreException? -> Log.e("MyAmplifyApp", "Error clearing DataStore", error) }
)

```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.DataStore.clear()
    .subscribe(
        () -> Log.i("MyAmplifyApp", "DataStore cleared"),
        error -> Log.e("MyAmplifyApp", "Error clearing DataStore: ", error)
    );
}
```

</amplify-block>
</amplify-block-switcher>

<amplify-callout>

If your app has authentication implemented, it is recommended to call `DataStore.clear()` on signin/signout to remove any user-specific data. This method is often important to use for shared device scenarios or where you need to purge the local on-device storage of records for security/privacy concerns.

</amplify-callout>

## Start

Synchronization starts automatically whenever you run any DataStore operation (`query()`, `save()`, `delete()`, `observe()`) however you can explicitly begin the process with `DataStore.start()`:

<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.DataStore.start(
    () -> Log.i("MyAmplifyApp", "DataStore started"),
    error -> Log.e("MyAmplifyApp", "Error starting DataStore: ", error)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.DataStore.start(
    { Log.i("MyAmplifyApp", "DataStore started") },
    { error: DataStoreException? -> Log.e("MyAmplifyApp", "Error starting DataStore", error) }
)
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.DataStore.start()
    .subscribe(
        () -> Log.i("MyAmplifyApp", "DataStore started"),
        error -> Log.e("MyAmplifyApp", "Error starting DataStore: ", error)
    );
}
```

</amplify-block>
</amplify-block-switcher>

## Stop

To stop the DataStore sync process, you can use `DataStore.stop()`.  This ensures the real time subscription connection is closed when your app is no longer interested in updates, such as when you application is closed.  This can also be used to modify [DataStore sync expressions](~/lib/datastore/sync.md) at runtime by calling `stop()`, then `start()` to force your sync expressions to be re-evaluated.

<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.DataStore.stop(
    () -> Log.i("MyAmplifyApp", "DataStore stopped"),
    error -> Log.e("MyAmplifyApp", "Error stopped DataStore: ", error)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.DataStore.stop(
    { Log.i("MyAmplifyApp", "DataStore stopped") },
    { error: DataStoreException? -> Log.e("MyAmplifyApp", "Error stopping DataStore", error) }
)
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.DataStore.stop()
    .subscribe(
        () -> Log.i("MyAmplifyApp", "DataStore stopped"),
        error -> Log.e("MyAmplifyApp", "Error stopping DataStore: ", error)
    );
}
```

</amplify-block>
</amplify-block-switcher>

