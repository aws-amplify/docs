> ### Prerequisites
> * An [Android project](https://developer.android.com/training/basics/firstapp/creating-project) targeting Android API level 16 (Android 4.1) or above
> * [Install and configure](~/cli/start/install.md) the Amplify CLI

## Storage with Amplify

The Amplify Storage category provides a simple mechanism for managing user content for your app in public, protected, or private storage buckets.  The Amplify AWS S3 Storage plugin leverages [Amazon S3](https://aws.amazon.com/s3).

## Create storage service

Run the following command in your project's root folder:

```sh
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

To deploy the service, run the `push` command:

```sh
$ amplify push
```

When your backend is successfully provisioned, there should be two new generated files : `amplifyconfiguration.json` and `awsconfiguration.json` in your app/src/main/res/raw directory.

To view the deployed services in your project at any time, go to Amplify Console by running the following command:

```sh
$ amplify console
```

## Configure your application

Add the following dependencies to your **app** build.gradle file and click "Sync Now" when asked:

```groovy
dependencies {
    implementation 'com.amplifyframework:core:0.10.0'
    implementation 'com.amplifyframework:aws-storage-s3:0.10.0'
    implementation 'com.amazonaws:aws-android-sdk-mobile-client:2.16.+'
}
```

Also up above in the same file, add this piece of code to support the Java 8 features Amplify uses:

```groovy
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


## Summary

Now you should be able to build and run your Android application and see "All set and ready to go!" in logcat.

In this example, you used the Amplify CLI to get a fully functioning backend with the Storage category, and integrated it into your Android application.
