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
<amplify-block name="Kotlin">

```kotlin
Amplify.Storage.remove(
    "myUploadedFileName.txt",
    { result -> Log.i("MyAmplifyApp", "Successfully removed: " + result.getKey()) },
    { error -> Log.e("MyAmplifyApp", "Remove failure", error) }
)
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