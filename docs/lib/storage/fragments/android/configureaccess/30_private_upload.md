<amplify-block-switcher>
<amplify-block name="Java">

```java
private void uploadFile(String key, File file) {
    StorageUploadFileOptions options = StorageUploadFileOptions.builder()
        .accessLevel(StorageAccessLevel.PRIVATE)
        .build();

    Amplify.Storage.uploadFile(key, file, options,
        result -> Log.i("MyAmplifyApp", "Successfully uploaded: " + key),
        error -> Log.e("MyAmplifyApp", "Upload failed", error)
    );
}
```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

```kotlin
private fun uploadFile(key: String, file: File) {
    val options = StorageUploadFileOptions.builder()
        .accessLevel(StorageAccessLevel.PRIVATE)
        .build()
    
    Amplify.Storage.uploadFile(key, file, options,
        { Log.i("MyAmplifyApp", "Successfully uploaded: $key") },
        { error -> Log.e("MyAmplifyApp", "Upload failed", error) }
    )
}
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

```kotlin
private suspend fun uploadFile(key: String, file: File) {
    val options = StorageUploadFileOptions.builder()
        .accessLevel(StorageAccessLevel.PRIVATE)
        .build()

    val upload = Amplify.Storage.uploadFile(key, file, options)
    
    try {
        upload.result()
        Log.i("MyAmplifyApp", "Successfully uploaded: $key")
    } catch (error: StorageException) {
        Log.e("MyAmplifyApp", "Upload failed", error)
    }
}
```

</amplify-block>
</amplify-block-switcher>
