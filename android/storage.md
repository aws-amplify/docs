<br />

**Note**
This guide shows how to build an app using our Amplify Libraries for Android (Preview) and the Amplify CLI toolchain.
To use the existing AWS Mobile SDK for Android instead, [click here.](../sdk/android/storage)
{: .callout .callout--warning}

# Storage

The Amplify Storage module provides a simple mechanism for managing user content for your app in public, protected, or private storage buckets. The Storage category comes with default built-in support for Amazon Simple Storage Service (S3).


## Set up your backend

The Amplify CLI helps you to create and configure the storage buckets for your app. The Amplify AWS S3 Storage plugin leverages [Amazon S3](https://aws.amazon.com/s3).

**Prerequisites:**
* An Android project targeting at least Android API 15 (Ice Cream Sandwich).
* Install and configure the Amplify CLI

```terminal
$ npm install -g @aws-amplify/cli
$ amplify configure
```

**Steps**

Go to your project directory and run the following commands to get a fully functioning backend with the Storage category:

Run `amplify init` command as shown:

```terminal
$ amplify init
? Enter a name for the project AmplifyStorage
? Enter a name for the environment dev
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building android
? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use default
```

Add storage using the command `amplify add storage`. Here is an example:

```terminal
$ amplify add storage
? Please select from one of the below mentioned services: `Content (Images, audio, video, etc.)`
? You need to add auth (Amazon Cognito) to your project in order to add storage for user files. Do you want to add auth now? `Yes`
? Do you want to use the default authentication and security configuration? `Default configuration`
? How do you want users to be able to sign in? `Username`
? Do you want to configure advanced settings? `No, I am done.`
? Please provide a friendly name for your resource that will be used to label this category in the project: `S3friendlyName`
? Please provide bucket name: `storagebucketName`
? Who should have access: `Auth and guest users`
? What kind of access do you want for Authenticated users? `create/update, read, delete`
? What kind of access do you want for Guest users? `create/update, read, delete`
? Do you want to add a Lambda Trigger for your S3 Bucket? `No`
```

Push your changes to the cloud using the push command
```terminal
$ amplify push
```

When your backend is successfully provisioned, there should be two new generated files : `amplifyconfiguration.json` and `awsconfiguration.json` in your app/src/main/res/raw directory.

Run `amplify console storage` to open the AWS S3 console in a web browser.

## Install Amplify libraries

Add the following dependencies to your app build.gradle file and click "Sync Now" when asked:

```java
dependencies {
    implementation 'com.amplifyframework:core:0.9.1'
    implementation 'com.amplifyframework:aws-storage-s3:0.9.1'
    implementation 'com.amazonaws:aws-android-sdk-mobile-client:2.16.+'
}
```

Also up above in the same file, add this piece of code to support the Java 8 features Amplify uses:

```java
android {
  compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}
```

## Initialize Amplify

Add the following code to the bottom of your MainActivity `onCreate` method (ideally this would go in your Application class but this works for getting started quickly):

```java
  AWSMobileClient.getInstance().initialize(getApplicationContext(), new Callback<UserStateDetails>() {
        @Override
        public void onResult(UserStateDetails userStateDetails) {
            try {
                Amplify.addPlugin(new AWSS3StoragePlugin());
                Amplify.configure(getApplicationContext());
                Log.i("StorageQuickstart", "All set and ready to go!");
            } catch (Exception e) {
                Log.e("StorageQuickstart", e.getMessage());
            }
        }

        @Override
        public void onError(Exception e) {
            Log.e("StorageQuickstart", "Initialization error.", e);
        }
    });
```

## Use cases

The Storage category provides APIs do the following:

1. Upload data to or from a file to S3 cloud storage
2. Download data from S3 to a file
4. List all the objects stored in S3
5. Remove objects from S3.
6. Access the AWSS3 client to perform additional actions to S3 directly.

The following code examples assume you have followed the previous steps to set up the backend, initialize Amplify, and configure it with Storage.

### Upload

To upload to S3 from a data object, specify the key and the data object to be uploaded. Call the below method after `Amplify.configure(...)`

```java
  private void uploadFile() {
    File sampleFile = new File(getApplicationContext().getFilesDir(), "sample.txt");
    try {
        BufferedWriter writer = new BufferedWriter(new FileWriter(sampleFile));
        writer.append("Howdy World!");
        writer.close();
    }
    catch(Exception e) {
        Log.e("StorageQuickstart", e.getMessage());
    }

    Amplify.Storage.uploadFile(
            "myUploadedFileName.txt",
            sampleFile.getAbsolutePath(),
            new ResultListener<StorageUploadFileResult>() {
                @Override
                public void onResult(StorageUploadFileResult result) {
                   Log.i("StorageQuickStart", "Successfully uploaded: " + result.getKey());
                }

                @Override
                public void onError(Throwable error) {
                    Log.e("StorageQuickstart", "Upload error.", error);
                }
            }
    );
  }
```

### Download

If you uploaded the data at key `myUploadedFileName.txt` like in the previous example, you can retrieve the data using `Amplify.Storage.downloadFile` - you can replace the call to `uploadFile` after `Amplify.configure` with a call to this method to try it out:

```java
  private void downloadFile() {
      Amplify.Storage.downloadFile(
              "myUploadedFileName.txt",
              getApplicationContext().getFilesDir() + "/download.txt",
              new ResultListener<StorageDownloadFileResult>() {
                  @Override
                  public void onResult(StorageDownloadFileResult result) {
                      Log.i("StorageQuickStart", "Successfully downloaded: " + result.getFile().getName());
                  }

                  @Override
                  public void onError(Throwable error) {
                      Log.e("StorageQuickStart", error.getMessage());
                  }
              }
      );
  }
```

### List

You can list all of the objects uploaded.
```java
    private void listFiles() {
        Amplify.Storage.list(
                "",
                new ResultListener<StorageListResult>() {
                    @Override
                    public void onResult(StorageListResult storageListResult) {
                        for(StorageListResult.Item item : storageListResult.getItems()) {
                            Log.i("StorageQuickStart", "Item: " + item.getKey());
                        }
                    }

                    @Override
                    public void onError(Throwable error) {
                        Log.e("StorageQuickStart", error.getMessage());
                    }
                }
        );
    }
```
### Remove

Delete an object uploaded to S3 by using `Amplify.Storage.remove` and specify the key

```java
    private void removeFile() {
        Amplify.Storage.remove(
                "myUploadedFileName.txt",
                new ResultListener<StorageRemoveResult>() {
                    @Override
                    public void onResult(StorageRemoveResult storageRemoveResult) {
                        Log.i("StorageQuickStart", "Successfully removed: " + storageRemoveResult.getKey());
                    }

                    @Override
                    public void onError(Throwable error) {
                        Log.e("StorageQuickStart", error.getMessage());
                    }
                }
        );
    }
```


### Escape Hatch

For advanced use cases where Amplify does not provide the functionality, you can retrieve the escape hatch to access the AWSS3 instance.

After the `Amplify.configure` call put these two lines:

```java
    AmazonS3Client client = ((AWSS3StoragePlugin) Amplify.Storage.getPlugin("awsS3StoragePlugin")).getEscapeHatch();
    Log.i("StorageQuickStart", client.getRegionName());
```

### Restrict Access

Create an options object with the protected access level to restrict access for certain objects.

```java
  StorageUploadFileOptions options =
    StorageUploadFileOptions.builder()
    .accessLevel(StorageAccessLevel.PROTECTED)
    .build();

  Amplify.Storage.uploadFile(uploadFileName, localFilePath, options, resultListener) { ... }
```

Another user that wants to read the file can specify the user that created it:

```java
  StorageDownloadFileOptions options =
    StorageDownloadFileOptions.builder()
      .accessLevel(StorageAccessLevel.PROTECTED)
      .targetIdentityId("OtherUserId")
      .build();

  Amplify.Storage.downloadFile(fileNameToDownload, localFilePath, options, resultListener) { ... }    
```
