<inline-fragment platform="flutter" src="~/lib/storage/fragments/flutter/path-provider.md"></inline-fragment>

```dart
import 'dart:io';
import 'package:path_provider/path_provider.dart';

Future<void> createAndUploadFile() async {
  // Create a dummy file
  final exampleString = 'Example file contents';
  final tempDir = await getTemporaryDirectory();
  final exampleFile = File(tempDir.path + '/example.txt')
    ..createSync()
    ..writeAsStringSync(exampleString);

  // Upload the file to S3
  try {
    final UploadFileResult result = await Amplify.Storage.uploadFile(
      local: exampleFile,
      key: 'ExampleKey',
    );
    print('Successfully uploaded file: ${result.key}');
  } on StorageException catch (e) {
    print('Error uploading file: $e');
  }
}
```