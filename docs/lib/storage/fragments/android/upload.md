To upload to S3 from a data object, specify the key and the file to be uploaded. 

<amplify-block-switcher>
<amplify-block name="Java">

```java
private void uploadFile() {
    File exampleFile = new File(getApplicationContext().getFilesDir(), "ExampleKey");

    try {
        BufferedWriter writer = new BufferedWriter(new FileWriter(exampleFile));
        writer.append("Example file contents");
        writer.close();
    } catch (Exception exception) {
        Log.e("MyAmplifyApp", "Upload failed", exception);
    }

    Amplify.Storage.uploadFile(
            "ExampleKey",
            exampleFile,
            result -> Log.i("MyAmplifyApp", "Successfully uploaded: " + result.getKey()),
            storageFailure -> Log.e("MyAmplifyApp", "Upload failed", storageFailure)
    );
}
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
private fun uploadFile() {
    val exampleFile = File(applicationContext.filesDir, "ExampleKey")

    exampleFile.writeText("Example file contents")

    Amplify.Storage.uploadFile(
        "ExampleKey",
        exampleFile,
        { result -> Log.i("MyAmplifyApp", "Successfully uploaded: ${result.getKey()}") },
        { error -> Log.e("MyAmplifyApp", "Upload failed", error) }
    )
}
```

</amplify-block>
<amplify-block name="RxJava">

```java
private void uploadFile() {
    File exampleFile = new File(getApplicationContext().getFilesDir(), "ExampleKey");

    try {
        BufferedWriter writer = new BufferedWriter(new FileWriter(exampleFile));
        writer.append("Example file contents");
        writer.close();
    } catch (Exception exception) {
        Log.e("MyAmplifyApp", "Upload failed", exception);
    }

    RxProgressAwareSingleOperation<StorageUploadFileResult> rxUploadOperation =
            RxAmplify.Storage.uploadFile("ExampleKey", exampleFile);

    rxUploadOperation
            .observeResult()
            .subscribe(
                result -> Log.i("MyAmplifyApp", "Successfully uploaded: " + result.getKey()),
                error -> Log.e("MyAmplifyApp", "Upload failed", error)
            );
}
```

</amplify-block>
</amplify-block-switcher>

To track progress of the upload, use the `uploadFile` API that includes a progress listener callback.

<amplify-block-switcher>
<amplify-block name="Java">

```java
private void uploadFile() {
    File exampleFile = new File(getApplicationContext().getFilesDir(), "ExampleKey");

    try {
        BufferedWriter writer = new BufferedWriter(new FileWriter(exampleFile));
        writer.append("Example file contents");
        writer.close();
    } catch (Exception exception) {
        Log.e("MyAmplifyApp", "Upload failed", exception);
    }

    Amplify.Storage.uploadFile(
        "ExampleKey",
        exampleFile,
        StorageUploadFileOptions.defaultInstance(),
        progress -> Log.i("MyAmplifyApp", "Fraction completed: " + progress.getFractionCompleted()),
        result -> Log.i("MyAmplifyApp", "Successfully uploaded: " + result.getKey()),
        storageFailure -> Log.e("MyAmplifyApp", "Upload failed", storageFailure)
    );
}
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
private fun uploadFile() {
    val exampleFile = File(applicationContext.filesDir, "ExampleKey")

    exampleFile.writeText("Example file contents")

    Amplify.Storage.uploadFile(
            "ExampleKey",
            exampleFile,
            StorageUploadFileOptions.defaultInstance(),
            { progress -> Log.i("MyAmplifyApp", "Fraction completed: ${progress.fractionCompleted}") },
            { result -> Log.i("MyAmplifyApp", "Successfully uploaded: ${result.getKey()}") },
            { error -> Log.e("MyAmplifyApp", "Upload failed", error) }
    )
}
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxProgressAwareSingleOperation<StorageUploadFileResult> upload =
        RxAmplify.Storage.uploadFile("exampleKey", exampleFile);

upload
    .observeProgress()
    .subscribe(
      progress -> Log.i("MyAmplifyApp", progress.getFractionCompleted())
    );
```

</amplify-block>
</amplify-block-switcher>
