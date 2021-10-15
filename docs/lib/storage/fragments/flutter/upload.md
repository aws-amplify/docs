To upload to S3 from a data object, specify the key and the file to be uploaded. A file can be created locally, or retrieved from the user's device using a package such as [image_picker](https://pub.dev/packages/image_picker) or [file_picker](https://pub.dev/packages/file_picker).

<amplify-block-switcher>

<amplify-block name="Create File">

<inline-fragment platform="flutter" src="~/lib/storage/fragments/flutter/upload/upload-create-file.md"></inline-fragment>

</amplify-block>

<amplify-block name="With Options">

<inline-fragment platform="flutter" src="~/lib/storage/fragments/flutter/path-provider.md"></inline-fragment>

```dart
import 'dart:io';
import 'package:path_provider/path_provider.dart';

Future<void> createAndUploadFileWithOptions() async {
  // Create a dummy file
  final exampleString = 'Example file contents';
  final tempDir = await getTemporaryDirectory();
  final exampleFile = File(tempDir.path + '/example.txt')
    ..createSync()
    ..writeAsStringSync(exampleString);

  // Set options
  final options = S3UploadFileOptions(
    accessLevel: StorageAccessLevel.guest,
    contentType: 'text/plain',
    metadata: <String, String>{
      'project': 'ExampleProject',
    },
  );

  // Upload the file to S3 with options
  try {
    final UploadFileResult result = await Amplify.Storage.uploadFile(
      local: exampleFile,
      key: 'ExampleKey',
      options: options,
    );
    print('Successfully uploaded file: ${result.key}');
  } on StorageException catch (e) {
    print('Error uploading file: $e');
  }
}
```

In S3, you should see the metadata attached to your file. You can learn more about the different access levels in [File access levels](~/lib/storage/configureaccess.md).

![S3 Metadata](~/images/s3_metadata.png)

</amplify-block>

<amplify-block name="Upload Image (image_picker)">

Make sure to follow the setup instructions on the image_picker [homepage](https://pub.dev/packages/image_picker).

```dart
import 'dart:io';
import 'package:image_picker/image_picker.dart';

final picker = ImagePicker();

Future<void> uploadImage() async {
  // Select image from user's gallery
  final PickedFile? pickedFile =
      await picker.getImage(source: ImageSource.gallery);

  if (pickedFile == null) {
    print('No image selected');
    return;
  }

  // Upload image with the current time as the key
  final key = DateTime.now().toString();
  final file = File(pickedFile.path);
  try {
    final UploadFileResult result =
        await Amplify.Storage.uploadFile(local: file, key: key);
    print('Successfully uploaded image: ${result.key}');
  } on StorageException catch (e) {
    print('Error uploading image: $e');
  }
}
```

</amplify-block>

<amplify-block name="Upload File (file_picker)">

The [file_picker](https://pub.dev/packages/file_picker) package can be used to retrieve arbitrary file types from the user's device.

```dart
import 'dart:io';
import 'package:file_picker/file_picker.dart';

Future<void> uploadFile() async {
  // Select a file from the device
  final FilePickerResult? result = await FilePicker.platform.pickFiles();

  if (result == null) {
    print('No file selected');
    return;
  }

  // Upload file with its filename as the key
  final platformFile = result.files.single;
  final path = platformFile.path!;
  final key = platformFile.name;
  final file = File(path);
  try {
    final UploadFileResult result =
        await Amplify.Storage.uploadFile(local: file, key: key);
    print('Successfully uploaded file: ${result.key}');
  } on StorageException catch (e) {
    print('Error uploading file: $e');
  }
}
```

</amplify-block>

</amplify-block-switcher>
