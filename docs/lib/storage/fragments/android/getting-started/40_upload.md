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
        { result -> Log.i("MyAmplifyApp", "Successfully uploaded: " + result.getKey()) },
        { error -> Log.e("MyAmplifyApp", "Upload failed", error) }
    )
}
```

</amplify-block>
</amplify-block-switcher>
