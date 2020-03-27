Delete an object uploaded to S3 by using `Amplify.Storage.remove` and specify the key

```java
    private void removeFile() {
        Amplify.Storage.remove(
            "myUploadedFileName.txt",
            storageRemoveResult -> Log.i("StorageQuickStart", "Successfully removed: " + storageRemoveResult.getKey()),
            storageFailure -> Log.e("StorageQuickStart", storageFailure.getMessage(), storageFailure)
        );
    }
```
