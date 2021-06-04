To delete an object uploaded to S3, use `Amplify.Storage.remove` and specify the key:

<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Storage.remove(
    "myUploadedFileName.txt",
    result -> Log.i("MyAmplifyApp", "Successfully removed: " + result.getKey()),
    error -> Log.e("MyAmplifyApp", "Remove failure", error)
);
```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

```kotlin
Amplify.Storage.remove("myUploadedFileName.txt",
    { Log.i("MyAmplifyApp", "Successfully removed: ${it.key}") },
    { Log.e("MyAmplifyApp", "Remove failure", it) }
)
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

```kotlin
try {
    val result = Amplify.Storage.remove("myUploadedFileName.txt")
    Log.i("MyAmplifyApp", "Successfully removed: ${result.key}")
} catch (error: StorageException) {
    Log.e("MyAmplifyApp", "Remove failure", error)
}
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.Storage.remove("myUploadedFileName.txt")
        .subscribe(
            result -> Log.i("MyAmplifyApp", "Successfully removed: " + result.getKey()),
            error -> Log.e("MyAmplifyApp", "Remove failure", error)
        );
```

</amplify-block>
</amplify-block-switcher>
