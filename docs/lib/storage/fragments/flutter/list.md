You can list all of the objects uploaded under a given prefix. This will list all public files:

```dart
try {
  ListResult res = await Amplify.Storage.list();
} catch (e) {
  print(e.toString());
}
```

You can also list private or protected files by passing options. For example, to list all protected files owned by a user identified by the ID `otherUserID`:

```dart
try {
  S3ListOptions options = S3ListOptions(
    targetIdentityId: "otherUserID",
    accessLevel: StorageAccessLevel.protected
  );
          
  ListResult res = await Amplify.Storage.list(
    options: options
  );
} catch (e) {
  print(e.toString());
}
```
