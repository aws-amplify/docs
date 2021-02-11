To delete an object uploaded to S3, use `Amplify.Storage.remove` and specify the key:

```dart
try {
  RemoveResult res = await Amplify.Storage.remove(
    key: 'ExampleKey',
  );
} on StorageException catch (e) {
  print(e.message);
}
```