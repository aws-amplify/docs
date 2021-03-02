<amplify-block-switcher>
<amplify-block name="Java">

```java
private void uploadFile(String key, File file) {
    StorageUploadFileOptions options =
            StorageUploadFileOptions.builder()
                    .accessLevel(StorageAccessLevel.PROTECTED)
                    .build();

    Amplify.Storage.uploadFile(
            key,
            file,
            options,
            result -> Log.i("MyAmplifyApp", "Successfully uploaded: " + key),
            error -> Log.e("MyAmplifyApp", "Upload failed", error)
    );
}
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
private fun uploadFile(key: String, file: File) {
    val options = StorageUploadFileOptions.builder()
        .accessLevel(StorageAccessLevel.PROTECTED)
        .build()
    
    Amplify.Storage.uploadFile(
        key,
        file,
        options,
        { Log.i("MyAmplifyApp", "Successfully uploaded: $key" )},
        { error -> Log.e("MyAmplifyApp", "Upload failed", error)}
    )
}
```

</amplify-block>
<amplify-block name="RxJava">

```java
private void uploadFile(String key, File file) {
    StorageUploadFileOptions options =
            StorageUploadFileOptions.builder()
                    .accessLevel(StorageAccessLevel.PROTECTED)
                    .build();

    RxProgressAwareSingleOperation<StorageUploadFileResult> upload =
            RxAmplify.Storage.uploadFile("ExampleKey", exampleFile, options);

    upload
        .observeResult()
        .subscribe(
            result -> Log.i("MyAmplifyApp", "Successfully uploaded: " + result.getKey()),
            error -> Log.e("MyAmplifyApp", "Upload failed", error)
        );
}
```

</amplify-block>
</amplify-block-switcher>