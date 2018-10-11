# Storage

## S3

### Overview

Enable your app to store and retrieve user files from cloud storage with the permissions model that suits your purpose. The CLI deploys and configures cloud storage buckets using [Amazon Simple Storage Service](http://docs.aws.amazon.com/AmazonS3/latest/dev/).

### Storage Access

The CLI configures three different access levels on the storage bucket; public, protected and private.

- Files with public access level can be accessed by all users who are using your app. In S3, they are stored under the ``public/`` path in your S3 bucket.

- Files with protected access level are readable by all users but writable only by the creating user. In S3, they are stored under ``protected/{user_identity_id}/`` where the user_identity_id corresponds to a unique Amazon Cognito Identity ID for that user.

- Files with private access level are only accessible for specific authenticated users only. In S3, they are stored under ``private/{user_identity_id}/`` where the user_identity_id corresponds to a unique Amazon Cognito Identity ID for that user.

### Set Up Your Backend

1. Complete the [Get Started](./start) steps before you proceed.

2. Use the CLI to add storage to your cloud-enabled backend and app.

    In a terminal window, navigate to your project folder (the folder that typically contains your project level build.gradle), and add the SDK to your app.

    ```bash
    $ cd ./YOUR_PROJECT_FOLDER
    $ amplify add storage
    ```

    In a terminal window, navigate to your project folder (the folder that contains your app `.xcodeproj` file), and add the SDK to your app.

    ```bash
    $ cd ./YOUR_PROJECT_FOLDER
    $ amplify add storage
    ```

3.  Choose `Content` as your storage service.

    `❯ Content (Images, audio, video, etc.)`

4. The CLI walks you through the options to enable Auth (if not enabled previously), to name your S3 bucket, and to decide who should have access (select `Auth and guest users` and `read/write` for both auth and guest users).

5. Confirm that you have storage and auth set up.

    ```bash
      $ amplify status
      | Category  | Resource name   | Operation | Provider plugin   |
      | --------- | --------------- | --------- | ----------------- |
      | Auth      | cognito2e202b09 | Create    | awscloudformation |
      | Storage   | sabc0123de      | Create    | awscloudformation |
      ```
6. To create your backend run:

    ```bash
    $ amplify push
    ```

    The CLI will create the awsconfiguration.json file in your project's `res/raw` directory.

iOS - Swift
    ```bash
    $ amplify push
    ```

    The CLI will create the awsconfiguration.json file in your project directory. Add it to your project using XCode.

### Connect to Your Backend

Use the following steps to connect add file storage backend services to your app.

1. Add the following to `Podfile` that you configure to install the AWS Mobile SDK:

	```ruby
   platform :ios, '9.0'

      target :'YOUR-APP-NAME' do
         use_frameworks!

         pod 'AWSS3', '~> 2.6.13'   # For file transfers
         pod 'AWSMobileClient', '~> 2.6.13'
         pod 'AWSUserPoolsSignIn', '~> 2.6.13'

         # other pods . . .

      end
	```
	Run `pod install --repo-update` before you continue.

2. Add the following import to the classes that perform user file storage operations:

	```swift
	import AWSS3
	```

### Upload a File

The following example shows how to upload data to an |S3| bucket.

```swift

          func uploadData() {

             let data: Data = "TestData".data(using: .utf8) // Data to be uploaded

             //Create an expression object for progress tracking, to pass in request headers etc.
             let expression = AWSS3TransferUtilityUploadExpression()
                expression.progressBlock = {(task, progress) in
                     // Do something e.g. Update a progress bar.
             }

	     //Create a completion handler to be called when the transfer completes
             var completionHandler: AWSS3TransferUtilityUploadCompletionHandlerBlock?
             completionHandler = { (task, error) -> Void in
                   // Do something e.g. Alert a user that the transfer has completed.
                   // On failed uploads, `error` contains the error object.
             }

             //Instantiate the transferUtility object. This will pick up the bucketName, region,
             //and auth configuration from the awsconfiguration.json file
             let transferUtility = AWSS3TransferUtility.default()

             //Upload the data. Pass in the expression to get progress updates and completion handler to get notified
             //when the transfer is completed.
             let task = transferUtility.uploadData(data!,
                  key: "public/YourFileName"
                  contentType: "text/plain",
                  expression: expression,
                  completionHandler: completionHandler)
          }
```

### Download a File

The following example shows how to download a file from an |S3| bucket.

```swift
func downloadData() {

 //Create an expression object for progress tracking, to pass in request headers etc.
 let expression = AWSS3TransferUtilityDownloadExpression()
 expression.progressBlock = {(task, progress) in
      // Do something e.g. Update a progress bar.
 }

//Create a completion handler to be called when the transfer completes
 var completionHandler: AWSS3TransferUtilityDownloadCompletionHandlerBlock?
 completionHandler = { (task, URL, data, error) -> Void in
      // Do something e.g. Alert a user for transfer completion.
      // On failed downloads, `error` contains the error object.
 }


 //Instantiate the transferUtility object. This will pickup the bucketName, region, and auth configuration
 //from the awsconfiguration.json file
 let transferUtility = AWSS3TransferUtility.default()

 //Download the data. Pass in the expression to get progress updates and completion handler to get notified
 //when the transfer is completed.
 let task = transferUtility.downloadData(
       fromKey: "public/YourFileName",
       expression: expression,
       completionHandler: completionHandler
       )

}
```


## Usage with GraphQL APIs (Complex Objects)

Many times you might want to create logical objects that have more complex data, such as images or videos, as part of their structure. For example, you might create a Person type with a profile picture or a Post type that has an associated image. You can use AWS AppSync to model these as GraphQL types. If any of your mutations have a variable with bucket, key, region, mimeType, and localUri fields, the SDK uploads the file to Amazon S3 for you.

Update your schema as follows to add the S3Object and S3ObjectInput types for the file, and a new mutation named CreatePostWithFileInputMutation:

```
  input CreatePostInput {
          author: String!
          title: String
          content: String
          url: String
          ups: Int
          downs: Int
          version: Int!
  }

  input CreatePostWithFileInput {
          author: String!
          title: String
          content: String
          url: String
          ups: Int
          downs: Int
          file: S3ObjectInput!
          version: Int!
  }

  input DeletePostInput {
          id: ID!
  }

  type Mutation {
          createPost(input: CreatePostInput!): Post
          createPostWithFile(input: CreatePostWithFileInput!): Post
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
          file: S3Object
          version: Int!
  }

  type PostConnection {
          items: [Post]
          nextToken: String
  }

  type Query {
          singlePost(id: ID!): Post
          getPost(id: ID!): Post
          listPosts(filter: TablePostFilterInput, limit: Int, nextToken: String): PostConnection
  }

  type S3Object {
          bucket: String!
          key: String!
          region: String!
  }

  input S3ObjectInput {
          bucket: String!
          key: String!
          region: String!
          localUri: String!
          mimeType: String!
  }

  type Subscription {
          onCreatePost(
                  id: ID,
                  author: String,
                  title: String,
                  content: String,
                  url: String
          ): Post
                  @aws_subscribe(mutations: ["createPost"])
          onUpdatePost(
                  id: ID,
                  author: String,
                  title: String,
                  content: String,
                  url: String
          ): Post
                  @aws_subscribe(mutations: ["updatePost"])
          onDeletePost(
                  id: ID,
                  author: String,
                  title: String,
                  content: String,
                  url: String
          ): Post
                  @aws_subscribe(mutations: ["deletePost"])
  }

  input TableBooleanFilterInput {
          ne: Boolean
          eq: Boolean
  }

  input TableFloatFilterInput {
          ne: Float
          eq: Float
          le: Float
          lt: Float
          ge: Float
          gt: Float
          contains: Float
          notContains: Float
          between: [Float]
  }

  input TableIDFilterInput {
          ne: ID
          eq: ID
          le: ID
          lt: ID
          ge: ID
          gt: ID
          contains: ID
          notContains: ID
          between: [ID]
          beginsWith: ID
  }

  input TableIntFilterInput {
          ne: Int
          eq: Int
          le: Int
          lt: Int
          ge: Int
          gt: Int
          contains: Int
          notContains: Int
          between: [Int]
  }

  input TablePostFilterInput {
          id: TableIDFilterInput
          author: TableStringFilterInput
          title: TableStringFilterInput
          content: TableStringFilterInput
          url: TableStringFilterInput
          ups: TableIntFilterInput
          downs: TableIntFilterInput
          version: TableIntFilterInput
  }

  input TableStringFilterInput {
          ne: String
          eq: String
          le: String
          lt: String
          ge: String
          gt: String
          contains: String
          notContains: String
          between: [String]
          beginsWith: String
  }

  input UpdatePostInput {
          id: ID!
          author: String
          title: String
          content: String
          url: String
          ups: Int
          downs: Int
          version: Int
  }

  schema {
          query: Query
          mutation: Mutation
          subscription: Subscription
  }
```

**Note:** If you're using the sample schema specified at the start of this documentation, you can replace your schema with the previous schema.

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
The AWS AppSync SDK doesn't take a direct dependency on the AWS SDK for iOS for Amazon S3, but takes in :code:`AWSS3TransferUtility` and :code:`AWSS3PresignedURLClient` clients as part of AWSAppSyncClientConfiguration. The code generator used above for generating the API generates the Amazon S3 wrappers required to use the previous clients in the client code. To generate the wrappers, pass the :code:`--add-s3-wrapper` flag while running the code generator tool. You also need to take a dependency on the AWSS3 SDK. You can do that by updating your Podfile to the following:

```

  target 'PostsApp' do
    use_frameworks!
    pod 'AWSAppSync' ~> '2.6.18'
    pod 'AWSS3' ~> '2.6.27'
  end
```
Then run `pod install` to fetch the new dependency.

Download the updated schema.json from the and put it in the GraphQLOperations folder in the root of the app.

Next, you have to add the new mutation, which is used to perform S3 uploads as part of mutation. Add the following mutation operation in your posts.graphql file:

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

After adding the new mutation in our operations file, we run the code generator again with the new schema to generate mutations that support file uploads. This time, we also pass the -add-s3-wrapper flag, as follows:

```bash
  aws-appsync-codegen generate GraphQLOperations/posts.graphql --schema GraphQLOperations/schema.json --output API.swift --add-s3-wrapper
```
Update the :code:`AWSAppSyncClientConfiguration` object to provide the :code:`AWSS3TransferUtility` client for managing the uploads and downloads:

```swift
  let appSyncConfig = try AWSAppSyncClientConfiguration(url: AppSyncEndpointURL,
                                                      serviceRegion: AppSyncRegion,
                                                      credentialsProvider: credentialsProvider,
                                                      databaseURL:databaseURL,
                                                      s3ObjectManager: AWSS3TransferUtility.default())
```
The mutation operation doesn't require any specific changes in method signature. It requires only an S3ObjectInput with bucket, key, region, localUri, and mimeType. Now when you do a mutation, it automatically uploads the specified file to Amazon S3 using the `AWSS3TransferUtility` client internally.


## Next Steps

* For sample apps that demonstrate TransferUtility capabilities, see [iOS S3 TransferUtility Sample](https://github.com/awslabs/aws-sdk-ios-samples/tree/master/S3TransferUtility-Sample).

* Looking for Amazon Cognito Sync? If you are a new user, use [AWS AppSync](https://aws.amazon.com/appsync/) instead. AppSync is a new service for synchronizing application data across devices. Like Cognito Sync, AppSync enables synchronization of a user's own data, such as game state or app preferences. AppSync extends these capabilities by allowing multiple users to synchronize and collaborate in real time on shared data, such as a virtual meeting space or chat room. [Start building with AWS AppSync now](https://aws.amazon.com/appsync/)
