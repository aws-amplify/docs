 When adding the Storage category, you configure the level of access authenticated and guest users have to your S3 bucket. Additionally, when uploading files using the Storage category, you can specify the access level for that file to be either public, protected, or private.

- **Public** Accessible by all users
- **Protected** Readable by all users, but only writable by the creating user
- **Private** Readable and writable only by the creating user

For protected and private access, the `user_id` in the prefix corresponds to the unique ID for the creating user.

<amplify-callout>

The default access level for the Storage category is **public**. Unless you specify otherwise, all uploaded files will be publicly available for all users.

</amplify-callout>

## Protected access

Create an options object specifying the protected access level to allow other users to read the object:

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

For other users to read the file, you must specify the user ID of the creating user in the passed options:

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

## Private Access

Create an options object specifying the private access level to only allow an object to be accessed by the creating user

<amplify-block-switcher>
<amplify-block name="Java">

```java
private void uploadFile(String key, File file) {
    StorageUploadFileOptions options =
            StorageUploadFileOptions.builder()
                    .accessLevel(StorageAccessLevel.PRIVATE)
                    .build();

    Amplify.Storage.uploadFile(
            key,
            file,
            options,
            result -> Log.i("MyAmplifyApp", "Successfully uploaded: " + key,
            error -> Log.e("MyAmplifyApp", "Upload failed", error)
    );
}
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
private fun uploadFile(key: String, file: File) {
    val options = StorageUploadFileOptions.builder()
        .accessLevel(StorageAccessLevel.PRIVATE)
        .build()
    
    Amplify.Storage.uploadFile(
        key,
        file,
        options,
        { Log.i("MyAmplifyApp", "Successfully uploaded: $key") },
        { error -> Log.e("MyAmplifyApp", "Upload failed", error)}
    )
}
```

</amplify-block>
</amplify-block-switcher>

For the user to read the file, you must specify the user ID of the creating user in the passed options:

<amplify-block-switcher>
<amplify-block name="Java">

```java
private void downloadFile(File file, String key, String userId) {
    StorageDownloadFileOptions options =
            StorageDownloadFileOptions.builder()
                    .accessLevel(StorageAccessLevel.PRIVATE)
                    .targetIdentityId(userId)
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
private fun downloadFile(file: File, key: String, userId: String) {
    val options = StorageDownloadFileOptions.builder()
        .accessLevel(StorageAccessLevel.PRIVATE)
        .targetIdentityId(userId)
        .build()
    
    Amplify.Storage.downloadFile(
        key,
        file,
        options,
        { Log.i("MyAmplifyApp", "Successfully downloaded: $key") },
        { error -> Log.e("MyAmplifyApp", "Download failed", error) }
}
```

</amplify-block>
</amplify-block-switcher>
