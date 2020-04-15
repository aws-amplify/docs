## Protected access

Create an options object with the protected access level to restrict access for certain objects.

```swift
let options = StorageDownloadDataRequest.Options(accessLevel: .protected)
Amplify.Storage.downloadData(key: "myKey", options: options) { (event) in
    // handle result
}
```

When uploading a file with `protected` access level, users can only read the file and only the user which created the file can delete it.

Another user that wants to read the file can specify the user that created it:

```swift
let options = StorageDownloadDataRequest.Options(accessLevel: .protected,
                                                 targetIdentityId: "OtherUserId")
```
