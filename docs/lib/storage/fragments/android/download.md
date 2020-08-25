If you uploaded the data using the key `ExampleKey`, you can retrieve the data using `Amplify.Storage.downloadFile`.

<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Storage.downloadFile(
        "ExampleKey",
        new File(getApplicationContext().getFilesDir() + "/download.txt"),
        result -> Log.i("MyAmplifyApp", "Successfully downloaded: " + result.getFile().getName()),
        error -> Log.e("MyAmplifyApp",  "Download Failure", error)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.Storage.downloadFile(
    "ExampleKey",
    File("${applicationContext.filesDir.toString()}/download.txt"),
    { result -> Log.i("MyAmplifyApp", "Successfully downloaded: ${result.getFile().name}") },
    { error -> Log.e("MyAmplifyApp", "Download Failure", error) }
)
```

</amplify-block>
</amplify-block-switcher>

To track progress of the download, use the `downloadFile` API that includes a progress listener callback.

<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Storage.downloadFile(
        "ExampleKey",
        new File(getApplicationContext().getFilesDir() + "/download.txt"),
        StorageDownloadFileOptions.defaultInstance(),
        progress -> Log.i("MyAmplifyApp", "Fraction completed: " + progress.getFractionCompleted()),
        result -> Log.i("MyAmplifyApp", "Successfully downloaded: " + result.getFile().getName()),
        error -> Log.e("MyAmplifyApp",  "Download Failure", error)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.Storage.downloadFile(
    "ExampleKey",
    File("${applicationContext.filesDir.toString()}/download.txt"),
    StorageDownloadFileOptions.defaultInstance(),
    { progress -> Log.i("MyAmplifyApp", "Fraction completed: ${progress.fractionCompleted}") },
    { result -> Log.i("MyAmplifyApp", "Successfully downloaded: ${result.getFile().name}") },
    { error -> Log.e("MyAmplifyApp", "Download Failure", error) }
)
```

</amplify-block>
</amplify-block-switcher>