<amplify-block-switcher>
<amplify-block name="Java">

```java
private void downloadFile(File file, String key, String otherUserId) {
    StorageDownloadFileOptions options =
            StorageDownloadFileOptions.builder()
                    .accessLevel(StorageAccessLevel.PROTECTED)
                    .targetIdentityId(otherUserId)
                    .build();

    Amplify.Storage.downloadFile(
            key,
            file,
            options,
            result -> Log.i("MyAmplifyApp", "Successfully downloaded: " + key),
            error -> Log.e("MyAmplifyApp", "Download failed", error)
    );
}
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
private fun downloadFile(file: File, key: String, otherUserId: String) {
    val options = StorageDownloadFileOptions.builder()
        .accessLevel(StorageAccessLevel.PROTECTED)
        .targetIdentityId(otherUserId)
        .build()
    
    Amplify.Storage.downloadFile(
        key,
        file,
        options,
        { Log.i("MyAmplifyApp", "Successfully downloaded: $key") },
        { error -> Log.e("MyAmplifyApp", "Download failed", error) }
    )
}
```

</amplify-block>
</amplify-block-switcher>
