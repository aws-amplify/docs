Delete an object uploaded to S3 by using `Amplify.Storage.remove` and specify the key

```java
    private void removeFile() {
        Amplify.Storage.remove(
                "myUploadedFileName.txt",
                new ResultListener<StorageRemoveResult>() {
                    @Override
                    public void onResult(StorageRemoveResult storageRemoveResult) {
                        Log.i("StorageQuickStart", "Successfully removed: " + storageRemoveResult.getKey());
                    }

                    @Override
                    public void onError(Throwable error) {
                        Log.e("StorageQuickStart", error.getMessage());
                    }
                }
        );
    }
```
