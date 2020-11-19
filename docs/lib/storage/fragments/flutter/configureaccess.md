 When adding the Storage category, you configure the level of access authenticated and guest users have to your S3 bucket. Additionally, when uploading files using the Storage category, you can specify the access level for that file to be either guest(public), protected, or private.

- **Guest** Accessible by all users
- **Protected** Readable by all users, but only writable by the creating user
- **Private** Readable and writable only by the creating user

For protected and private access, the `user_id` in the prefix corresponds to the unique ID for the creating user.

<amplify-callout>

The default access level for the Storage category is **guest**. Unless you specify otherwise, all uploaded files will be publicly available for all users.

</amplify-callout>

## Protected access

Create an options object specifying the protected access level to allow other users to read the object:

```dart
try {
  // use a file selection mechanism of your choice
  File file = await FilePicker.getFile(type: FileType.image);
  final key = new DateTime.now().toString();
  final local = file.absolute.path;
  S3UploadFileOptions options = S3UploadFileOptions(
    accessLevel: StorageAccessLevel.protected
  );
  UploadFileResult result = await Amplify.Storage.uploadFile(
    key: key,
    local: local,
    options: options
  );
} catch (e) {
  print(e.toString());
}
```

For other users to read the file, you must specify the user ID of the creating user in the passed options:

```dart
try {
  S3DownloadFileOptions options = S3DownloadFileOptions(
    targetIdentityId: "userId",
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

## Private Access

Create an options object specifying the private access level to only allow an object to be accessed by the creating user

```dart
try {
  // use a file selection mechanism of your choice
  File file = await FilePicker.getFile(type: FileType.image);
  final key = new DateTime.now().toString();
  final local = file.absolute.path;
  S3UploadFileOptions options = S3UploadFileOptions(accessLevel: StorageAccessLevel.private);
  UploadFileResult result = await Amplify.Storage.uploadFile(
    key: key,
    local: local,
    options: options
  );
} catch (e) {
  print(e.toString());
}
```

For the user to read the file, you must specify the user ID of the creating user in the passed options:

```dart
try {
  S3DownloadFileOptions options = S3DownloadFileOptions(
  targetIdentityId: "userId",
    accessLevel: StorageAccessLevel.private
  );
  DownloadFileResult result = await Amplify.Storage.downloadFile(
    key: key,
    local: new File('$path/download.png')
    options: options
  );
} catch (e) {
  print(e.toString());
}
