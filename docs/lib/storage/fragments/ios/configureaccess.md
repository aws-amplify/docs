## Protected access

Create an `Options` object with the `.protected` access level to restrict access for your key.

```swift
let dataString = "My Data"
let data = dataString.data(using: .utf8)!
let options = StorageUploadDataRequest.Options(accessLevel: .protected)
Amplify.Storage.uploadData(key: "userProtectedKey", data: data, options: options) { result in
    // handle result
}
```

When uploading a file with `.protected` access level:
* Owners have the ability to read, write, and delete access
* Other users only have read access

If another user wants to read the file, you will need to include the `targetIdentityId` parameter:

```swift
let options = StorageDownloadDataRequest.Options(accessLevel: .protected,
                                                 targetIdentityId: "OtherUserIdentityId")
Amplify.Storage.downloadData(key: "userProtectedKey", options: options) { result in
    // handle result
}
```
