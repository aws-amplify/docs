If you uploaded the data at key `myUploadedFileName.txt` like in the previous example, you can retrieve the data using `Amplify.Storage.downloadFile` - you can replace the call to `uploadFile` after `Amplify.configure` with a call to this method to try it out:

```java
  private void downloadFile() {
    Amplify.Storage.downloadFile(
        "myUploadedFileName.txt",
        getApplicationContext().getFilesDir() + "/download.txt",
        result -> Log.i("StorageQuickStart", "Successfully downloaded: " + result.getFile().getName()),
        error -> Log.e("StorageQuickStart", error.getMessage())
    );
  }
```