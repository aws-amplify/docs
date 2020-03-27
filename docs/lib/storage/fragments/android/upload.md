To upload to S3 from a data object, specify the key and the data object to be uploaded. Call the below method after `Amplify.configure(...)`

```java
  private void uploadFile() {
    File sampleFile = new File(getApplicationContext().getFilesDir(), "sample.txt");
    try {
        BufferedWriter writer = new BufferedWriter(new FileWriter(sampleFile));
        writer.append("Howdy World!");
        writer.close();
    }
    catch(Exception e) {
        Log.e("StorageQuickstart", e.getMessage());
    }

    Amplify.Storage.uploadFile(
            "myUploadedFileName.txt",
            sampleFile.getAbsolutePath(),
            new ResultListener<StorageUploadFileResult>() {
                @Override
                public void onResult(StorageUploadFileResult result) {
                   Log.i("StorageQuickStart", "Successfully uploaded: " + result.getKey());
                }

                @Override
                public void onError(Throwable error) {
                    Log.e("StorageQuickstart", "Upload error.", error);
                }
            }
    );
  }
```