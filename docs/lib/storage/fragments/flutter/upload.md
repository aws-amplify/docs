To upload to S3 from a data object, specify the key and the file to be uploaded. 

```dart
// remember to `import 'dart:io';` to add the File class
File local = File('$path/filename.txt')

try {
  UploadFileResult result = await Amplify.Storage.uploadFile(
    key: key,
    local: local,
    options: options
  );
} catch (e) {
  print(e.toString());
}
```
