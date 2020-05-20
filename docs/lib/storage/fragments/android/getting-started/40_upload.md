```java
private void uploadFile() {
  File sampleFile = new File(getApplicationContext().getFilesDir(), "myKey");
  try {
      BufferedWriter writer = new BufferedWriter(new FileWriter(sampleFile));
      writer.append("My Data");
      writer.close();
  }
  catch(Exception exception) {
      Log.e("StorageQuickstart", exception.getMessage(), exception);
  }

  Amplify.Storage.uploadFile(
      "myKey",
      sampleFile.getAbsolutePath(),
      result -> Log.i("StorageQuickStart", "Successfully uploaded: " + result.getKey()),
      storageFailure -> Log.e("StorageQuickstart", "Upload error.", storageFailure)
  );
}
```