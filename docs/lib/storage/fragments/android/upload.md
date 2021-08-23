Amplify allows you to upload `File`s and `InputStream`s.

## Upload InputStream
To upload data to S3 from an `InputStream`:

<amplify-block-switcher>
<amplify-block name="Java">

```java
private void uploadInputStream() {
    try {
        InputStream exampleInputStream = getContentResolver().openInputStream(uri);
        
        Amplify.Storage.uploadInputStream(
                "ExampleKey",
                exampleInputStream,
                result -> Log.i("MyAmplifyApp", "Successfully uploaded: " + result.getKey()),
                storageFailure -> Log.e("MyAmplifyApp", "Upload failed", storageFailure)
        );
    }  catch (FileNotFoundException error) {
        Log.e("MyAmplifyApp", "Could not find file to open for input stream.", error);
    }
}
```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

```kotlin
private fun uploadInputStream(uri: Uri) {
    val stream = contentResolver.openInputStream(uri)

    Amplify.Storage.uploadInputStream("ExampleKey", stream,
        { Log.i("MyAmplifyApp", "Successfully uploaded: ${it.key}") },
        { Log.e("MyAmplifyApp", "Upload failed", it) }
    )
}
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

```kotlin
private suspend fun uploadInputStream(uri: Uri) {
    val stream = contentResolver.openInputStream(uri)

    val upload = Amplify.Storage.uploadInputStream("ExampleKey", stream)
    try {
        val result = upload.result()
        Log.i("MyAmplifyApp", "Successfully uploaded: ${result.key}.")
    } catch (error: StorageException) {
        Log.e("MyAmplifyApp", "Upload failed")
    }
}
```

</amplify-block>
<amplify-block name="RxJava">

```java
private void uploadInputStream() {
    try {
        InputStream exampleInputStream = getContentResolver().openInputStream(uri);
        
        RxProgressAwareSingleOperation<StorageUploadInputStreamResult> rxUploadOperation =
                RxAmplify.Storage.uploadInputStream("ExampleKey", exampleInputStream);
        
        rxUploadOperation
                .observeResult()
                .subscribe(
                    result -> Log.i("MyAmplifyApp", "Successfully uploaded: " + result.getKey()),
                    error -> Log.e("MyAmplifyApp", "Upload failed", error)
                );
    } catch (FileNotFoundException error) {
        Log.e("MyAmplifyApp", "Could not find file to open for input stream.", error);
    }
}
```

</amplify-block>
</amplify-block-switcher>

## Upload files
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
<amplify-block name="Kotlin - Callbacks">

```kotlin
private fun uploadFile() {
    val exampleFile = File(applicationContext.filesDir, "ExampleKey")
    exampleFile.writeText("Example file contents")

    Amplify.Storage.uploadFile("ExampleKey", exampleFile,
        { Log.i("MyAmplifyApp", "Successfully uploaded: ${it.key}") },
        { Log.e("MyAmplifyApp", "Upload failed", it) }
    )
}
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

```kotlin
private suspend fun uploadFile() {
    val exampleFile = File(applicationContext.filesDir, "ExampleKey")
    exampleFile.writeText("Example file contents")

    val upload = Amplify.Storage.uploadFile("ExampleKey", exampleFile)
    try {
        val result = upload.result()
        Log.i("MyAmplifyApp", "Successfully uploaded: ${result.key}")
    } catch (error: StorageException) {
        Log.e("MyAmplifyApp", "Upload failed", error)
    }
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
<amplify-block name="Kotlin - Callbacks">

```kotlin
private fun uploadFile() {
    val exampleFile = File(applicationContext.filesDir, "ExampleKey")
    exampleFile.writeText("Example file contents")

    val options = StorageUploadFileOptions.defaultInstance()
    Amplify.Storage.uploadFile("ExampleKey", exampleFile, options,
        { Log.i("MyAmplifyApp", "Fraction completed: ${it.fractionCompleted}") },
        { Log.i("MyAmplifyApp", "Successfully uploaded: ${it.key}") },
        { Log.e("MyAmplifyApp", "Upload failed", it) }
    )
}
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

```kotlin
private suspend fun uploadFile() {
    val exampleFile = File(applicationContext.filesDir, "ExampleKey")
    exampleFile.writeText("Example file contents")

    val options = StorageUploadFileOptions.defaultInstance()
    val upload = Amplify.Storage.uploadFile("ExampleKey", exampleFile, options)
    val progressJob = activityScope.async {
        upload.progress().collect {
            Log.i("MyAmplifyApp", "Fraction completed: ${it.fractionCompleted}")
        }
    }
    try {
        val result = upload.result()
        Log.i("MyAmplifyApp", "Successfully uploaded: ${result.key}")
    } catch (error: StorageException) {
        Log.e("MyAmplifyApp", "Upload failed", error)
    }
    progressJob.cancel()
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
