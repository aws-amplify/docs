To delete an object uploaded to S3, use `Amplify.Storage.remove` and specify the key:

<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Storage.remove(
        "myUploadedFileName.txt",
        result -> Log.i("MyAmplifyApplication", "Successfully removed: " + result.getKey()),
        error -> Log.e("MyAmplifyApplication", "Remove failure", error)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.Storage.remove(
    "myUploadedFileName.txt",
    { result -> Log.i("MyAmplifyApplication", "Successfully removed: " + result.getKey()) },
    { error -> Log.e("MyAmplifyApplication", "Remove failure", error) }
)
```

</amplify-block>
</amplify-block-switcher>