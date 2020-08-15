
👋 Welcome! In this tutorial, you will:

- Download the getting started app
- Add the Flutter SDK dependencies
- Use Amplify CLI to setup your AWS backend resources 

## Prerequisites

- Install [Flutter](https://flutter.dev/docs/get-started/install) version 1.17.0 or higher
    
    These steps will also guide you through downloading and setting up Android Studio and XCode for Flutter.   

- Setup your [IDE](https://flutter.dev/docs/get-started/editor?tab=androidstudio)

    We recommend using AndroidStudio for developing your Flutter apps. 

- Install [Amplify CLI](~/cli/cli.md) version 4.21.0 or later by running:

    ```bash
    npm install -g @aws-amplify/cli
    ```



## Set up your application

### Download Sample App 

Download the starter [here](https://github.com/aws-amplify/amplify-flutter).  The starter project is contained within `amplify-flutter/example/sample-app`.

#### Sample App Overview 

The starter contains the basic UI for the simple photo storage app. All changes and instructions in this tutorial should be performed on this starter project.

### Getting Started on your own 

If you prefer starting from a blank flutter project, you will need to make the following modification to ensure that iOS compiles: 

Within your `ios/Podfile`, replace line 2 with 
```dart
set platform :ios, '11.0' 
```

Please note that we **highly** recommend using our starter project.  This tutorial does not provide instructions on how to create the basic UI used in Flutter. 


### Add Amplify to your application

Amplify for Flutter is distributed via **pub.dev**.
In this section, you'll add the following dependencies to your **app**'s `pubspec.yaml`.

**TODO** Clarify the names of our DART packages 

```yaml
dependencies:
  flutter:
    sdk: flutter

  amplify_core: ^1.0.0
  amplify_auth_cognito: ^1.0.0
  amplify_storage_s3: ^1.0.0
  amplify_analytics_pinpoint: ^1.0.0
```

Afterwards, make sure to run `flutter pub get` in the command line within the root level of your project.  If you are using Android Studio, you can click on "Pub get" within a popup that appears instead. 




### Setup AWS Cloud Resources with Amplify CLI 

We will now use the Amplify CLI to configure the AWS Cloud Resources that will power your app. 

**TODO** Clarify that these instructions are correct

#### Basic Auth Setup 
``` 
amplify add auth 
```

``` 
? Do you want to use the default authentication and security configuration?
    `Default configuration`
? How do you want users to be able to sign in?
    `Username`
? Do you want to configure advanced settings?
    `No, I am done.`
```

#### Basic Analytics Setup 
```
amplify add analytics
```

```
? Select an Analytics provider (Use arrow keys)
    `Amazon Pinpoint`
? Provide your pinpoint resource name: 
    `yourPinpointResourceName`
? Apps need authorization to send analytics events. Do you want to allow guests and unauthenticated users to send analytics events? (we recommend you allow this when getting started) 
    `Yes`
```

#### Basic Storage Setup
```
amplify add storage
```

``` 
? Please select from one of the below mentioned services:
    `Content (Images, audio, video, etc.)`
? You need to add auth (Amazon Cognito) to your project in order to add storage for user files. Do you want to add auth now?
    `Yes`
? Do you want to use the default authentication and security configuration?
    `Default configuration`
? How do you want users to be able to sign in?
    `Username`
? Do you want to configure advanced settings?
    `No, I am done.`
? Please provide a friendly name for your resource that will be used to label this category in the project:
    `S3friendlyName`
? Please provide bucket name:
    `storagebucketname`
? Who should have access:
    `Auth and guest users`
? What kind of access do you want for Authenticated users?
    `create/update, read, delete`
? What kind of access do you want for Guest users?
    `create/update, read, delete`
? Do you want to add a Lambda Trigger for your S3 Bucket?
    `No`
```

To save all your changes and to create your AWS resources, run the following command last:

``` 
amplify push 
```

**TODO** Clarify where the amplifyconfiguration.dart file will be placed 

After these steps, you should notice a `amplifyconfiguration.dart` file within your lib directory of your project.  Guard this file carefully!  It contains sensitive information that your app will use to establish a secure communication with your backend AWS resources.  If it is lost or corrupted, you can always regenerate it by repeating the above steps again with the Amplify CLI. 

You are ready to start building with Amplify! 🎉
