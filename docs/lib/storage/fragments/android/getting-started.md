## Set up your backend

The Amplify CLI helps you to create and configure the storage buckets for your app. The Amplify AWS S3 Storage plugin leverages [Amazon S3](https://aws.amazon.com/s3).

### Prerequisites
* An Android project targeting at least Android API 15 (Ice Cream Sandwich).
* Install and configure the Amplify CLI

```bash
$ npm install -g @aws-amplify/cli
$ amplify configure
```

**Steps**

Go to your project directory and run the following commands to get a fully functioning backend with the Storage category:

Run `amplify init` command as shown:

```bash
$ amplify init
? Enter a name for the project AmplifyStorage
? Enter a name for the environment dev
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building android
? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use default
```

Add storage using the command `amplify add storage`. Here is an example:

```bash
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
```bash
$ amplify push
```

When your backend is successfully provisioned, there should be two new generated files : `amplifyconfiguration.json` and `awsconfiguration.json` in your app/src/main/res/raw directory.

Run `amplify console storage` to open the AWS S3 console in a web browser.

## Install Amplify libraries

Add the following dependencies to your app build.gradle file and click "Sync Now" when asked:

```java
dependencies {
    implementation 'com.amplifyframework:core:0.10.0'
    implementation 'com.amplifyframework:aws-storage-s3:0.10.0'
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
            } catch (Exception exception) {
                Log.e("StorageQuickstart", exception.getMessage(), exception);
            }
        }

        @Override
        public void onError(Exception exception) {
            Log.e("StorageQuickstart", "Initialization error.", exception);
        }
    });
```
