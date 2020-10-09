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

### Generate a download URL

You can also retrieve a URL for the object in storage:

```dart

try {
  GetUrlResult result =
    await Amplify.Storage.getUrl(key: "myKey");
  print(result.url); 
} catch (e) {
  print(e.toString());
}

```

