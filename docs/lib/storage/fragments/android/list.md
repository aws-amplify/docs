You can list all of the objects uploaded under a given prefix. This will list all public files:

<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Storage.list("/",
    result -> {
        for (StorageItem item : result.getItems()) {
            Log.i("MyAmplifyApp", "Item: " + item.getKey());
        }
    },
    error -> Log.e("MyAmplifyApp", "List failure", error)
);
```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

```kotlin
Amplify.Storage.list("/",
    { result ->
        result.items.forEach { item ->
            Log.i("MyAmplifyApp", "Item: ${item.key}")
        }
    },
    { Log.e("MyAmplifyApp", "List failure", it) }
)
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

```kotlin
try {
    Amplify.Storage.list("/").items.forEach {
        Log.i("MyAmplifyApp", "Item: ${it.key}")
    }
} catch (error: StorageException) {
    Log.e("MyAmplifyApp", "List failure", error)
}
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.Storage.list("/")
    .subscribe(
        result -> {
            for (StorageItem item : result.getItems()) {
                Log.i("MyAmplifyApp", "Item: " + item.getKey());
            }
        },
        error -> Log.e("MyAmplifyApp", "List failure", error)
    );
```

</amplify-block>
</amplify-block-switcher>

You can also list private or protected files by passing options. For example, to list all protected files owned by a user identified by the ID `otherUserID`:

<amplify-block-switcher>
<amplify-block name="Java">

```java
StorageListOptions options = StorageListOptions.builder()
    .accessLevel(StorageAccessLevel.PROTECTED)
    .targetIdentityId("otherUserID")
    .build();

Amplify.Storage.list(
    "/",
    options,
    result -> {
        for (StorageItem item : result.getItems()) {
            Log.i("MyAmplifyApp", "Item: " + item.getKey());
        }
    },
    error -> Log.e("MyAmplifyApp", "List failure", error)
);
```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

```kotlin
val options = StorageListOptions.builder()
    .accessLevel(StorageAccessLevel.PROTECTED)
    .targetIdentityId("otherUserID")
    .build()

Amplify.Storage.list("/", options,
    { result ->
        result.items.forEach { item ->
            Log.i("MyAmplifyApp", "Item: ${item.key}")
        }
    },
    { Log.e("MyAmplifyApp", "List failure", it) }
)
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

```kotlin
val options = StorageListOptions.builder()
    .accessLevel(StorageAccessLevel.PROTECTED)
    .targetIdentityId("otherUserID")
    .build()

try {
    Amplify.Storage.list("/", options).items.forEach {
        Log.i("AmplifyApplication", "Item: $it")
    }
} catch (error: StorageException) {
    Log.e("MyAmplifyApp", "List failure", error)
}
```

</amplify-block>
<amplify-block name="RxJava">

```java
StorageListOptions options = StorageListOptions.builder()
        .accessLevel(StorageAccessLevel.PROTECTED)
        .targetIdentityId("otherUserID")
        .build();

RxAmplify.Storage.list("/", options)
        .subscribe(
            result -> {
                for (StorageItem item : result.getItems()) {
                    Log.i("MyAmplifyApp", "Item: " + item.getKey());
                }
            },
            error -> Log.e("MyAmplifyApp", "List failure", error)
        );
```

</amplify-block>
</amplify-block-switcher>
