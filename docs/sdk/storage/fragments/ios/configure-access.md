All Amazon S3 resources are private by default. If you want your users to have access to Amazon S3 buckets or objects, you can assign appropriate permissions with an [IAM policy](http://docs.aws.amazon.com/IAM/latest/UserGuide/PoliciesOverview.html).

## IAM Policy Based Permissions

When you upload objects to the S3 bucket the Amplify CLI creates, you must manually prepend the appropriate access-level information to the `key`. The correct prefix - `public/`, `protected/` or `private/` - will depend on the access level of the object as documented in the [Storage Access section](~/sdk/storage/getting-started.md#storage-access). For example:

```swift
var s3Object = S3ObjectInput()

// Accessible by all users
s3Object.key = "public/myFile.txt"

// Readable by all users, but writable only by the creating user
s3Object.key = "protected/\(cognitoIdentityId)/myFile.txt"

// Only accessible for the individual user
s3Object.key = "private/\(cognitoIdentityId)/myFile.txt"
```

**Note:** These keys must be prepended when you are uploading the object, and the same key must be specified as part of the object's key during download. The `cognitoIdentityId` is required for `protected` and `private` access and you can get it by using the [Authentication Utilities](~/sdk/auth/working-with-api.md#utility-properties) within AWSMobileClient: `AWSMobileClient.default().identityId`.

## Temporary Permissions via Pre-signed URLs

However, what if you wanted to provide permissions temporarily, for example: _you want to share a link to a file temporarily and have the link expire after a set time_. You can use pre-signed URLs to give your users temporary access to S3 objects. When you create a pre-signed URL, you must provide your security credentials, specify a bucket name, an object key, an HTTP method, and an expiration date and time. The pre-signed URL is valid only for the specified duration.

The following example shows how to build a pre-signed URL to get an S3 object.

```swift
let getPreSignedURLRequest = AWSS3GetPreSignedURLRequest()
getPreSignedURLRequest.bucket = "myBucket"
getPreSignedURLRequest.key = "myFile.txt"
getPreSignedURLRequest.httpMethod = .GET

// Change the value of the expires time interval as required
getPreSignedURLRequest.expires = Date(timeIntervalSinceNow: 3600)

AWSS3PreSignedURLBuilder.default().getPreSignedURL(getPreSignedURLRequest).continueWith { (task:AWSTask<NSURL>) -> Any? in
    if let error = task.error as? NSError {
        print("Error: \(error)")
        return nil
    }

    let presignedURL = task.result
    // Use the Pre-Signed URL here as required
    return nil
}
```

> The preceding example uses `GET` as the HTTP method: `AWSHTTPMethodGET`. For an upload request to S3, you would use a `PUT` method.

```swift
let getPreSignedURLRequest = AWSS3GetPreSignedURLRequest()
getPreSignedURLRequest.bucket = "myBucket"
getPreSignedURLRequest.key = "myFile.txt"
getPreSignedURLRequest.httpMethod = .PUT

// Change the value of the expires time interval as required
getPreSignedURLRequest.expires = Date(timeIntervalSinceNow: 3600) 
getPreSignedURLRequest.contentType = "text/plain"

AWSS3PreSignedURLBuilder.default().getPreSignedURL(getPreSignedURLRequest).continueWith { (task:AWSTask<NSURL>) -> Any? in
    if let error = task.error as? NSError {
        print("Error: \(error)")
        return nil
    }

    let presignedURL = task.result
    // Use the Pre-Signed URL here as required
    return nil
}
```