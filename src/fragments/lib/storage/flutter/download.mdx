If you uploaded the data using the key `ExampleKey`, you can retrieve the data using `Amplify.Storage.downloadFile`.

Again, we use the [path_provider](https://pub.dev/packages/path_provider) package to create a local file in the user's documents directory where we can store the downloaded data.

```dart
import 'dart:io';
import 'package:path_provider/path_provider.dart';

Future<void> downloadFile() async {
  final documentsDir = await getApplicationDocumentsDirectory();
  final filepath = documentsDir.path + '/example.txt';
  final file = File(filepath);

  try {
    await Amplify.Storage.downloadFile(
      key: 'ExampleKey', 
      local: file
    );
    final String contents = file.readAsStringSync();
    print('Downloaded contents: $contents');
  } on StorageException catch (e) {
    print('Error downloading file: $e');
  }
}
```

### Generate a download URL

You can also retrieve a URL for the object in storage:

```dart
Future<void> getDownloadUrl() async {
  try {
    final GetUrlResult result =
      await Amplify.Storage.getUrl(key: 'ExampleKey');
    print('Got URL: ${result.url}');
  } on StorageException catch (e) {
    print('Error getting download URL: $e');
  }
}
```

