# Amazon S3 Pre-Signed URLs: For Background Transfer

If you are working with large file transfers, you
may want to perform uploads and downloads in the background. To do this, you need to create a
background session using ``NSURLSession`` and then transfer your objects using pre-signed URLs.

The following sections describe pre-signed Amazon S3 URLs. To learn more about ``NSURLSession``, see
[Using NSURLSession](https://developer.apple.com/library/ios/documentation/Cocoa/Conceptual/URLLoadingSystem/Articles/UsingNSURLSession.html).

## Pre-Signed URLs
By default, all Amazon S3 resources are private. If you want your users to have access to Amazon S3 buckets
or objects, you can assign appropriate permissions with an [IAM policy](http://docs.aws.amazon.com/IAM/latest/UserGuide/PoliciesOverview.html).

Alternatively, you can use pre-signed URLs to give your users access to Amazon S3 objects. A pre-signed URL
provides access to an object without requiring AWS security credentials or permissions.

When you create a pre-signed URL, you must provide your security credentials, specify a bucket name,
an object key, an HTTP method, and an expiration date and time. The pre-signed URL is valid only for the specified duration.

## Build a Pre-Signed URL

The following example shows how to build a pre-signed URL for an Amazon S3 download in the background.

```swift
AWSS3PreSignedURLBuilder.default().getPreSignedURL(getPreSignedURLRequest).continueWith { (task:AWSTask<NSURL>) -> Any? in
    if let error = task.error as? NSError {
        print("Error: \(error)")
        return nil
    }

    let presignedURL = task.result
    print("Download presignedURL is: \(presignedURL)")

    let request = URLRequest(url: presignedURL as! URL)
    let downloadTask: URLSessionDownloadTask = URLSession.shared.downloadTask(with: request)
    downloadTask.resume()

    return nil
}
```

The preceding example uses ``GET`` as the HTTP method: ``AWSHTTPMethodGET``. For an upload request to Amazon S3,
we would need to use a PUT method and also specify a content type.

```swift
getPreSignedURLRequest.httpMethod = .PUT
let fileContentTypeStr = "text/plain"
getPreSignedURLRequest.contentType = fileContentTypeStr
```

Here's an example of building a pre-signed URL for a background upload to Amazon S3.

```swift
let getPreSignedURLRequest = AWSS3GetPreSignedURLRequest()
getPreSignedURLRequest.bucket = "myBucket"
getPreSignedURLRequest.key = "myFile.txt"
getPreSignedURLRequest.httpMethod = .PUT
getPreSignedURLRequest.expires = Date(timeIntervalSinceNow: 3600)

//Important: set contentType for a PUT request.
let fileContentTypeStr = "text/plain"
getPreSignedURLRequest.contentType = fileContentTypeStr

AWSS3PreSignedURLBuilder.default().getPreSignedURL(getPreSignedURLRequest).continueWith { (task:AWSTask<NSURL>) -> Any? in
    if let error = task.error as? NSError {
        print("Error: \(error)")
        return nil
    }

    let presignedURL = task.result
    print("Download presignedURL is: \(presignedURL)")

    var request = URLRequest(url: presignedURL as! URL)
    request.cachePolicy = .reloadIgnoringLocalCacheData
    request.httpMethod = "PUT"
    request.setValue(fileContentTypeStr, forHTTPHeaderField: "Content-Type")

    let uploadTask: URLSessionTask = URLSession.shared.uploadTask(with: request, fromFile: URL(fileURLWithPath: "your/file/path/myFile.txt"))
    uploadTask.resume()

    return nil
}
```

## Additional Resources

* [Amazon Simple Storage Service Getting Started Guide](http://docs.aws.amazon.com/AmazonS3/latest/gsg/GetStartedWithS3.html)
* [Amazon Simple Storage Service API Reference](http://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html)
* [Amazon Simple Storage Service Developer Guide](http://docs.aws.amazon.com/AmazonS3/latest/dev/Welcome.html)
