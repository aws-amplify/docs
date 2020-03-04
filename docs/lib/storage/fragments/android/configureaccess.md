## Protected access

Create an options object with the protected access level to restrict access for certain objects.

```java
  StorageUploadFileOptions options =
    StorageUploadFileOptions.builder()
    .accessLevel(StorageAccessLevel.PROTECTED)
    .build();

  Amplify.Storage.uploadFile(uploadFileName, localFilePath, options, resultListener) { ... }
```

Another user that wants to read the file can specify the user that created it:

```java
  StorageDownloadFileOptions options =
    StorageDownloadFileOptions.builder()
      .accessLevel(StorageAccessLevel.PROTECTED)
      .targetIdentityId("OtherUserId")
      .build();

  Amplify.Storage.downloadFile(fileNameToDownload, localFilePath, options, resultListener) { ... }    
```

## Private Access

## Public Access
