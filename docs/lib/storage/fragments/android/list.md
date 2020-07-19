You can list all of the objects uploaded under a given prefix. This will list all public files:

<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Storage.list(
        "/",
        result -> {
            for (StorageItem item : result.getItems()) {
                Log.i("MyAmplifyApp", "Item: " + item.getKey());
            }
        },
        error -> Log.e("MyAmplifyApp", "List failure", error)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.Storage.list(
    "/",
    { result ->
        result.getItems().forEach { item ->
            Log.i("MyAmplifyApp", "Item: " + item.getKey())
        }
    },
    { error -> Log.e("MyAmplifyApp", "List failure", error) }
)
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
<amplify-block name="Kotlin">

```kotlin
val options = StorageListOptions.builder()
            .accessLevel(StorageAccessLevel.PROTECTED)
            .targetIdentityId("otherUserID")
            .build()

Amplify.Storage.list(
    "/",
    options,
    { result ->
        result.getItems().forEach { item ->
            Log.i("AmplifyApplication", "Item: " + item)
        }
    },
    { error -> Log.e("MyAmplifyApp", "List failure", error) }
)
```

</amplify-block>
</amplify-block-switcher>
