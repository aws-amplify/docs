You can list all of the objects uploaded.
```java
    private void listFiles() {
        Amplify.Storage.list(
            "",
            storageListResult -> {
                for(StorageItem item : storageListResult.getItems()) {
                    Log.i("StorageQuickStart", "Item: " + item.getKey());
                }
            },
            error -> Log.e("StorageQuickStart", error.getMessage())
        );
    }
```