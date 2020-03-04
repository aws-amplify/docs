### Overview

Enable your app to store and retrieve user files from cloud storage with the permissions model that suits your purpose. The CLI deploys and configures cloud storage buckets using [Amazon Simple Storage Service](http://docs.aws.amazon.com/AmazonS3/latest/dev/).

### Storage Access

The CLI configures three different access levels on the storage bucket: public, protected and private. When you run `amplify add storage`, the CLI will configure appropriate IAM policies on the bucket using a Cognito Identity Pool Role. You will have the option of adding CRUD (Create/Update, Read and Delete) based permissions as well, so that Authenticated and Guest users will be granted limited permissions within these levels.

If you had previously enabled user sign-in by running `amplify add auth` in your project, the policies will be connected to an `Authenticated Role` of the Identity Pool which has scoped permission to the objects in the bucket for each user identity. If you haven't configured user sign-in, then an `Unauthenticated Role` will be assigned for each unique user/device combination, which still has scoped permissions to just their objects.

* Public: Accessible by all users of your app. Files are stored under the `public/` path in your S3 bucket.
* Protected: Readable by all users, but writable only by the creating user. Files are stored under `protected/{user_identity_id}/` where the `user_identity_id` corresponds to the unique Amazon Cognito Identity ID for that user.
* Private: Only accessible for the individual user. Files are stored under `private/{user_identity_id}/` where the `user_identity_id` corresponds to the unique Amazon Cognito Identity ID for that user.

See [Authentication](./authentication) for more information on how to get the `user_identity_id` for a signed in user.
 
### Set Up Your Backend

1. Complete the [Get Started](./start) steps before you proceed.

2. Use the CLI to add storage to your cloud-enabled backend and app.

    In a terminal window, navigate to your project folder (the folder that contains your app `.xcodeproj` file), and add the SDK to your app.

    ```bash
    $ cd ./YOUR_PROJECT_FOLDER
    $ amplify add storage
    ```

3.  Choose `Content` as your storage service.

    ```bash
    ❯ Content (Images, audio, video, etc.)
    ```

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

    The CLI will create the awsconfiguration.json file in your project directory. Add it to your project using Xcode.

##### Lambda Triggers
If you want to enable triggers for the storage category with Amazon S3 & Amazon DynamoDB as providers, the CLI supports associating Lambda triggers with S3 and DynamoDB events. For example, this can be useful for a use case where you want to invoke a Lambda function after a create or update operation on a DynamoDB table managed by the Amplify CLI. [Read More]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/cli-toolchain/quickstart#storage-examples)

### Connect to Your Backend

Use the following steps to add file storage backend services to your app.

1. Add the `AWSS3` dependency to the `Podfile` to install the AWS Mobile SDK:

    ```ruby
    platform :ios, '9.0'

    target :'YOUR-APP-NAME' do
        use_frameworks!

        pod 'AWSS3', '~> 2.12.0'   # For file transfers

        # other pods . . .
        pod 'AWSMobileClient', '~> 2.12.0'
    end
    ```

Run `pod install --repo-update` before you continue.

2. Add the following import to the classes that perform user file storage operations:

    ```swift
    import AWSS3
    ```

### Mocking and Local Testing

Amplify supports running a local mock server for testing your application with S3. Please see the [CLI Toolchain documentation](../cli-toolchain/usage#mocking-and-testing) for more details.
