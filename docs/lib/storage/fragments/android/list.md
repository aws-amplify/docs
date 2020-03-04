You can list all of the objects uploaded.
```java
    private void listFiles() {
        Amplify.Storage.list(
                "",
                new ResultListener<StorageListResult>() {
                    @Override
                    public void onResult(StorageListResult storageListResult) {
                        for(StorageListResult.Item item : storageListResult.getItems()) {
                            Log.i("StorageQuickStart", "Item: " + item.getKey());
                        }
                    }

                    @Override
                    public void onError(Throwable error) {
                        Log.e("StorageQuickStart", error.getMessage());
                    }
                }
        );
    }
```