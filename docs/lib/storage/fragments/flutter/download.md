If you uploaded the data using the key `ExampleKey`, you can retrieve the data using `Amplify.Storage.downloadFile`.

```dart
try {
  DownloadFileResult result = await Amplify.Storage.downloadFile(
    key: 'ExampleKey',
    local: new File('$path/download.png')
  );
} catch (e) {
  print(e.toString());
}
```
