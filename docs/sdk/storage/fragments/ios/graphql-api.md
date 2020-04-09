**Note:** Please review the documentation for [API](~/sdk/api/graphql.md) before you proceed with the rest of this section. 


You can upload and download Amazon S3 Objects using AWS AppSync, a GraphQL based solution to build data-driven apps with real-time and offline capabilities. Sometimes you might want to create logical objects that have more complex data, such as images or videos, as part of their structure.  _For example, you might create a Person type with a profile picture or a Post type that has an associated image_. You can use AWS AppSync to model these as GraphQL types. If any of your mutations have a variable with `bucket`, `key`, `region`, `mimeType`, and `localUri` fields, the SDK uploads the file to S3 for you.

Attach the following IAM policy to your IAM role to grant it programmatic read-write access to your bucket:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": ["arn:aws:s3:::myBucket"]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject"
      ],
      "Resource": ["arn:aws:s3:::myBucket/*"]
    }
  ]
}
```

Using the previous sample schema as a reference, update it as follows to add the `S3Object` and `S3ObjectInput` types for the file, and a new mutation named `createPostWithFile`:

```diff
+ input CreatePostWithFileInput {
+   author: String!
+   title: String
+   content: String
+   url: String
+   ups: Int
+   downs: Int
+   file: S3ObjectInput!
+   version: Int!
+ }
  type Mutation {
    createPost(input: CreatePostInput!): Post
+   createPostWithFile(input: CreatePostWithFileInput!): Post
    updatePost(input: UpdatePostInput!): Post
    deletePost(input: DeletePostInput!): Post
  }
  type Post {
    id: ID!
    author: String!
    title: String
    content: String
    url: String
    ups: Int
    downs: Int
+   file: S3Object
    version: Int!
  }
+ type S3Object {
+   bucket: String!
+   key: String!
+   region: String!
+ }
+ input S3ObjectInput {
+   bucket: String!
+   key: String!
+   region: String!
+   localUri: String!
+   mimeType: String!
+ }
```

Next, you need to add a resolver for createPostWithFile mutation. You can do that from the AWS AppSync console by selecting PostsTable as the data source and the following mapping templates.
**Request Mapping Template**
```
  {
      "version": "2017-02-28",
      "operation": "PutItem",
      "key": {
        "id": $util.dynamodb.toDynamoDBJson($util.autoId()),
      },
      #set( $attribs = $util.dynamodb.toMapValues($ctx.args.input) )
      #if($util.isNull($ctx.args.input.file.version))
            #set( $attribs.file = $util.dynamodb.toS3Object($ctx.args.input.file.key, $ctx.args.input.file.bucket, $ctx.args.input.file.region))
      #else
            #set( $attribs.file = $util.dynamodb.toS3Object($ctx.args.input.file.key, $ctx.args.input.file.bucket, $ctx.args.input.file.region, $ctx.args.input.file.version))
      #end
      "attributeValues": $util.toJson($attribs),
      "condition": {
        "expression": "attribute_not_exists(#id)",
        "expressionNames": {
          "#id": "id",
        },
      },
   }
```
**Response Mapping Template**
```
  $util.toJson($context.result)
```
After you have a resolver for the mutation, to ensure that our S3 Complex Object details are fetched correctly during any query operation, add a resolver for the file field of Post. You can do that from the AWS AppSync console by using the following mapping templates.

**Request Mapping Template**
```
  {
    "version" : "2017-02-28",
    "operation" : "Query",
    "query" : {
        ## Provide a query expression. **
        "expression": "id = :id",
        "expressionValues" : {
            ":id" : {
                "S" : "${ctx.args.id}"
            }
        }
    }
  }
```
**Response Mapping Template**
```
  $util.toJson($util.dynamodb.fromS3ObjectJson($context.source.file))
```
The AWS AppSync SDK doesn't take a direct dependency on the AWS SDK for S3, but takes in `AWSS3TransferUtility` and `AWSS3PresignedURLClient` clients as part of `AWSAppSyncClientConfiguration`. The code generator used above for generating the API generates the S3 wrappers required to use the previous clients in code. To generate the wrappers, pass the `--add-s3-wrapper` flag while running the code generator tool. You will also need to take a dependency on the `AWSS3` SDK. You can do that by updating your Podfile:

```ruby
  target: 'PostsApp' do
    use_frameworks!
    pod 'AWSAppSync'
    pod 'AWSS3'
  end
```

Then run `pod install` to fetch the new dependency.
Download the updated `schema.json` and put it in the `GraphQLOperations` folder in the root of your app.
Next, you have to add the new mutation, which is used to perform the S3 uploads. Add the following mutation operation in your `posts.graphql` file:
```
  mutation AddPostWithFile($input: CreatePostWithFileInput!) {
      createPostWithFile(input: $input) {
          id
          title
          author
          url
          content
          ups
          downs
          version
          file {
              ...S3Object
          }
      }
    }
    fragment S3Object on S3Object {
      bucket
      key
      region
    }
  }
```
After adding the new mutation in our operations file, we run the code generator again with the new schema to generate mutations that support file uploads. This time, we also pass the `-add-s3-wrapper` flag, as follows:
```bash
  aws-appsync-codegen generate GraphQLOperations/posts.graphql --schema GraphQLOperations/schema.json --output API.swift --add-s3-wrapper
```
Update the `AWSAppSyncClientConfiguration` object to provide the `AWSS3TransferUtility` client for managing the uploads and downloads:
```swift
let appSyncConfig = try AWSAppSyncClientConfiguration(url: AppSyncEndpointURL,
                                                      serviceRegion: AppSyncRegion,
                                                      credentialsProvider: credentialsProvider,
                                                      databaseURL:databaseURL,
                                                      s3ObjectManager: AWSS3TransferUtility.default())
```

**The `AWSS3ObjectManager` integration** 

In order to use `AWSS3TransferUtility` as the `s3ObjectManager` the consumer needs to provide an integration layer between the base types (`S3ObjectInput`, `AWSS3TransferUtility`) and the required protocols: `AWSS3ObjectProtocol`, `AWSS3InputObjectProtocol` and `AWSS3ObjectManager`.

```swift
extension S3ObjectInput: AWSS3ObjectProtocol, AWSS3InputObjectProtocol {
    // ...
}

extension AWSS3PreSignedURLBuilder: AWSS3ObjectPresignedURLGenerator  {
    // ...
}

extension AWSS3TransferUtility: AWSS3ObjectManager {
    // ...
}
```

There is an implementation in the iOS Test Suite that can be used as a reference: [aws-mobile-appsync-sdk-ios/AWSAppSyncTestCommon/S3ObjectWrapper.swift](https://github.com/awslabs/aws-mobile-appsync-sdk-ios/blob/master/AWSAppSyncTestCommon/S3ObjectWrapper.swift).

The mutation operation doesn't require any specific changes in method signature. It requires only an S3ObjectInput with `bucket`, `key`, `region`, `localUri`, and `mimeType`. Now when you do a mutation, it automatically uploads the specified file to Amazon S3 using the `AWSS3TransferUtility` client internally.