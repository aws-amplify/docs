 When adding the Storage category, you configure the level of access users have to your S3 bucket. You can configure separate rules for authenticated vs. guest users. When using the Storage category to upload files, you can also specify an access level for each individual file: guest, protected, or private.

- **Guest** Accessible by all users of your application
- **Protected** Readable by all users, but only writable by the creating user
- **Private** Readable and writable only by the creating user

Guest access does **not** mean that your files are totally public. A "guest" is a user of your application who has not yet signed in. To enable access at this level, you will still be required to configured [Authentication](~/lib/auth/getting-started.md) in your app. The user must be able to assume an unauthenticated role from your Cognito Identity Pool.

For protected and private access, the `[IDENTITY_ID]` below corresponds to the unique ID of the user. Once the user has signed in, the `[IDENTITY_ID]` can be retrieved from the session by accessing the identity id. See [Accessing credentials](~/lib/auth/access_credentials.md) to retrieve the identity id, and use this as the unique ID of the authenticated user.

<amplify-callout>

The default access level for the Storage category is **guest**. Unless you specify otherwise, all uploaded files will be available to all users of your application. This means that a user who is using your application but has not signed in will have access. Anyone else who is not using your application will _not_ be able to access your files.

</amplify-callout>

## Protected access

After the user has signed in, create an options object specifying the `protected` access level to allow other users to read the object:

<inline-fragment platform="ios" src="~/lib/storage/fragments/ios/configureaccess/10_protected_upload.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/storage/fragments/android/configureaccess/10_protected_upload.md"></inline-fragment>
<inline-fragment platform="flutter" src="~/lib/storage/fragments/flutter/configureaccess/10_protected_upload.md"></inline-fragment>

This will upload with the prefix `/protected/[IDENTITY_ID]/` followed by the key.

For other users to read the file, you must specify the user ID of the creating user in the passed options. 

<inline-fragment platform="ios" src="~/lib/storage/fragments/ios/configureaccess/20_protected_download.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/storage/fragments/android/configureaccess/20_protected_download.md"></inline-fragment>
<inline-fragment platform="flutter" src="~/lib/storage/fragments/flutter/configureaccess/20_protected_download.md"></inline-fragment>

## Private Access

Create an options object specifying the private access level to only allow an object to be accessed by the creating user

<inline-fragment platform="ios" src="~/lib/storage/fragments/ios/configureaccess/30_private_upload.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/storage/fragments/android/configureaccess/30_private_upload.md"></inline-fragment>
<inline-fragment platform="flutter" src="~/lib/storage/fragments/flutter/configureaccess/30_private_upload.md"></inline-fragment>

This will upload with the prefix `/private/[IDENTITY_ID]/`, followed by the key.

For the user to read the file, specify the same access level (`private`) and key you used to upload:

<inline-fragment platform="ios" src="~/lib/storage/fragments/ios/configureaccess/40_private_download.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/storage/fragments/android/configureaccess/40_private_download.md"></inline-fragment>
<inline-fragment platform="flutter" src="~/lib/storage/fragments/flutter/configureaccess/40_private_download.md"></inline-fragment>

## Customization

### Customize Object Key Path 

The following is an example of the default prefix resolver used by the plugin:

```swift
struct StorageAccessLevelAwarePrefixResolver: AWSS3StoragePluginPrefixResolver {
    public func resolvePrefix(for accessLevel: StorageAccessLevel,
                              identityId: String?,
                              completion: @escaping Result<String, StorageError>) -> Void {
        switch accessLevel {
        case .guest:
            completion(.success("public/"))
        case .protected:
            completion(.success("protected/" + identityId + "/"))
        case .private:
            completion(.success("private/" + identityId + "/"))
        }
    }
}
```
The resolver will be called when performing each storage request to resolve the final prefix used by the request. The `identityId` is the current user's Identity ID, or the target Identity ID if passed in with the request.

You can customize your key path by defining your own prefix resolver:

```swift
import Amplify
import AmplifyPlugins

struct MyDeveloperDefinedPrefixResolver: AWSS3StoragePluginPrefixResolver {
    public func resolvePrefix(for accessLevel: StorageAccessLevel,
                              identityId: String?,
                              completion: @escaping Result<String, StorageError>) -> Void {
        switch accessLevel {
        case .guest:
            completion(.success("myPublicPrefix/"))
        case .protected:
            completion(.success("myProtectedPrefix/" + identityId + "/"))
        case .private:
            completion(.success("myPrivatePrefix/" + identityId + "/"))
        }
    }
}
```

Register `MyDeveloperDefinedPrefixResolver` during configuration of the plugin

```swift
let storagePlugin = AWSS3StoragePlugin(configuration: .prefixResolver(MyDeveloperDefinedPrefixResolver()))
Amplify.add(storagePlugin)
```

For example, if you want to enable read, write and delete operation for all the objects under path *myPublicPrefix/*, declare it in your IAM policy:

```xml
"Statement": [
    {
        "Effect": "Allow",
        "Action": [
            "s3:GetObject",
            "s3:PutObject",
            "s3:DeleteObject"
        ],
        "Resource": [
            "arn:aws:s3:::your-s3-bucket/myPublicPrefix/*",
        ]
    }
]
```

If you want to have custom *private* path prefix like *myPrivatePrefix/*, you need to add it into your IAM policy:
```xml
"Statement": [
    {
        "Effect": "Allow",
        "Action": [
            "s3:GetObject",
            "s3:PutObject",
            "s3:DeleteObject"
        ],
        "Resource": [
            "arn:aws:s3:::your-s3-bucket/myPrivatePrefix/${cognito-identity.amazonaws.com:sub}/*"
        ]
    }
]
```
This ensures only the authenticated users has the access to the objects under the path. 

If you would like no prefix resolution logic, such as perform S3 requests at the root of the bucket, use `.passThroughKeyResolver`:

```swift
let storagePlugin = AWSS3StoragePlugin(configuration: .passThroughPrefixResolver)
Amplify.add(storagePlugin)
```

You can perform validation based on the access controls you have defined. For example, if you have defined Guests with no access then you can fail the request early by checking if the user is not signed in:

```swift
struct MyDeveloperDefinedPrefixResolver: AWSS3StoragePluginPrefixResolver {
    public func resolvePrefix(for accessLevel: StorageAccessLevel,
                              identityId: String?,
                              completion: @escaping Result<String, StorageError>) -> Void {
        _ = Amplify.Auth.fetchAuthSession { result in
            switch result {
            case .success(let session):
                guard Amplify.Auth.isSignedIn else {
                    completion(.failure(StorageError.Auth("User is not signed in to perform S3 operations")))
                    return
                }
                switch accessLevel {
                case .guest:
                    completion(.success("public/"))
                case .protected:
                    completion(.success("protected/" + identityId + "/"))
                case .private:
                    completion(.success("private/" + identityId + "/"))
                }
            case .failure(let error):
                print("Fetch session failed with error \(error)")
                completion(.failure(StorageError.Auth("Failed to retrieve auth session, failed with error", "", error)))
            }
        }       
    }
}
```