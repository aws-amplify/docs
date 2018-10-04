# Amazon S3 Server-Side Encryption Support in iOS

The AWS Mobile SDK for iOS supports server-side encryption of Amazon S3 data. To learn more about server-side
encryption, see [PUT Object](http://docs.aws.amazon.com/AmazonS3/latest/API/RESTObjectPUT.html).

The following properties are available to configure the encryption:

* [SSECustomerAlgorithm](http://docs.aws.amazon.com/AWSiOSSDK/latest/Classes/AWSS3ReplicateObjectOutput.html#//api/name/SSECustomerAlgorithm)
* [SSECustomerKey](http://docs.aws.amazon.com/AWSiOSSDK/latest/Classes/AWSS3UploadPartRequest.html#//api/name/SSECustomerKey)
* [SSECustomerKeyMD5](http://docs.aws.amazon.com/AWSiOSSDK/latest/Classes/AWSS3PutObjectOutput.html#//api/name/SSECustomerKeyMD5)
* [AWSS3ServerSideEncryption](http://docs.aws.amazon.com/AWSiOSSDK/latest/Constants/AWSS3ServerSideEncryption.html)

To use these properties, add the following statement which imports the ``AWSSS3Model``.

```swift
import AWSS3
```

``SSECustomerAlgorithm`` is a property of ``AWSS3ReplicateObjectOutput``. If server-side encryption
with a customer-provided encryption key was requested, the response will include this header,
which confirms the encryption algorithm that was used. Currently, the only valid option is AES256. You can
access ``SSECustomerAlgorithm`` as follows.

```swift
let replicateObjectOutput = AWSS3ReplicateObjectOutput()
replicateObjectOutput?.sseCustomerAlgorithm = "mySseCustomerAlgorithm"
```

``SSECustomerKey``, a property of ``AWSS3UploadPartRequest``, specifies the customer-provided
encryption key for Amazon S3 to use to encrypting data. This value is used to store the object,
and is then discarded; Amazon doesn't store the encryption key. The key must be appropriate for
use with the algorithm specified in the ``x-amz-server-side-encryption-customer-algorithm`` header.
This must be the same encryption key specified in the request to initiate a multipart upload. You
can access SSECustomerKey as follows.

```swift
let uploadPartRequest = AWSS3UploadPartRequest()
uploadPartRequest?.sseCustomerKey = "customerProvidedEncryptionKey"
```

``SSECustomerKeyMD5`` is a property of ``AWSS3PutObjectOutput``. If server-side encryption
with a customer-provided encryption key is requested, the response will include this
header. The response provides round trip message integrity verification of the customer-provided
encryption key. You can access ``SSECustomerKeyMD5`` as follows.

```swift
let objectOutput = AWSS3PutObjectOutput()
// Access objectOutput?.sseCustomerKeyMD5 ...
```

``AWSS3ServerSideEncryption`` represents the encryption algorithm for storing an object in Amazon S3. You
can access it as follows.

```swift
let objectOutput = AWSS3PutObjectOutput()
// Access objectOutput?.sseCustomerKeyMD5 ...
```
## Additional Resources

* [Amazon Simple Storage Service Getting Started Guide](http://docs.aws.amazon.com/AmazonS3/latest/gsg/GetStartedWithS3.html)
* [Amazon Simple Storage Service API Reference](http://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html)
* [Amazon Simple Storage Service Developer Guide](http://docs.aws.amazon.com/AmazonS3/latest/dev/Welcome.html)

.. _Identity and Access Management Console: https://console.aws.amazon.com/iam/home
.. _Granting Access to an Amazon S3 Bucket: http://blogs.aws.amazon.com/security/post/Tx3VRSWZ6B3SHAV/Writing-IAM-Policies-How-to-grant-access-to-an-Amazon-S3-bucket
