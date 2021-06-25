```dart
try {
  S3DownloadFileOptions options = S3DownloadFileOptions(
    targetIdentityId: "[IDENTITY_ID]",
    accessLevel: StorageAccessLevel.protected
  );
  DownloadFileResult result = await Amplify.Storage.downloadFile(
    key: key,
    local: new File('$path/download.png')
    options: options
  );
} catch (e) {
  print(e.toString());
}
```