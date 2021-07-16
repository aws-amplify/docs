To upload to S3 from a data object, specify the key and the file to be uploaded. 

```dart
`import 'dart:io'; // to add the File class

// ...

// // Option 1 - get the filepath yourself
File local = File('$path/filename.txt')

// // Option 2 - using file-picker
// import 'package:file_picker/file_picker.dart';
// ...
// File local = await FilePicker.getFile(type: FileType.image);
// local.existsSync();

final key = new DateTime.now().toString();
Map<String, String> metadata = <String, String>{};
metadata['name'] = 'filename';
metadata['desc'] = 'A test file';
S3UploadFileOptions options = S3UploadFileOptions(accessLevel: StorageAccessLevel.guest, metadata: metadata);
try {
  UploadFileResult result = await Amplify.Storage.uploadFile(
    key: key,
    local: local,
    options: options
  );
} on StorageException catch (e) {
  print(e.message);
}
```

`local` represents the filename. Here we use the timestamp for a `key`, and `options` determine [S3 file access levels](https://docs.amplify.aws/lib/storage/configureaccess/q/platform/flutter).
