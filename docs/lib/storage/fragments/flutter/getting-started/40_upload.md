```dart
void uploadFile() async {
  // use a file selection mechanism of your choice
  File file = await FilePicker.getFile(type: FileType.image);
  final key = new DateTime.now().toString();
  final local = file.absolute.path;
  UploadFileResult result = await Amplify.Storage.uploadFile(
    key: key,
    local: local
  );
}
```
