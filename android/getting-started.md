# Getting Started

Get started building a cloud-powered Android app using the AWS Amplify CLI and the AWS SDK for Android. This page guides you through setting up an initial backend and integrating the SDK into your app.

## Step 1: Set Up Your Development Environment

We strongly recommend that you use the Amplify CLI for building the serverless backend for your app. If you have already installed the CLI, skip ahead to [Step 2](./add-aws-mobile-sdk-basic-setup).

*  [Sign up for an AWS Account](https://portal.aws.amazon.com/billing/signup?redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start).

*  Install [Node.js](https://nodejs.org/) and npm (if they are not already installed).

> Verify that you are running at least Node.js version 8.x or greater and npm version 5.x or greater by running `node -v` and `npm -v` in a terminal/console window. Older versions aren't supported and might generate errors.

To install and configure the Amplify CLI globally, run the following commands in a terminal window.

  ```bash
   $ npm install -g @aws-amplify/cli
   $ amplify configure
   ```

Minimum requirements for your development environment are as follows.

* Choose the Android Java app project you want to integrate with an AWS backend.

* [Install Android Studio](https://developer.android.com/studio/index.html#downloads) version 2.33 or higher.

* Install Android SDK for API level 23 (Android SDK 6.0).

## Step 2: Set Up Your Backend

Follow the following steps to setup your backend.

1. The CLI prompts you for configuration parameters.

	In a terminal window, navigate to your project folder (the folder that typically contains your project level `build.gradle`), and add the SDK to your app.

	```bash
	$ cd ./YOUR_PROJECT_FOLDER
	$ amplify init
	```

2. To create your backend AWS resources and add a configuration file to your app, run the following:

    ```bash
    $ amplify push
    ```

3. To verify that the CLI is set up for your app, run the following command. The CLI displays a status table with no resources listed. As you add categories to your app, backend resources created for your app are listed in this table.

    ```bash
    $ amplify status
    | Category | Resource name | Operation | Provider plugin |
    | -------- | ------------- | --------- | --------------- |
    ```

Use the steps in the next section to configure the connection between your app and the serverless backend.

## Step 3: Connect to Your Backend

Perform the following steps to set up a connection to AWS services that you'll use in the Get Started section of this guide.

1. Add dependencies to your `app/build.gradle`, and then choose `Sync Now` on the upper-right side of Android Studio. These libraries enable basic AWS functions, like credentials and analytics.

  	```
  	dependencies {
  		implementation 'com.amazonaws:aws-android-sdk-core:2.6.+'
  	}
  	```

2. Your `AndroidManifest.xml` must contain the following:

    ```xml
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
    ```

	Your app is now ready for you to add cloud-powered features. We recommend [adding analytics](./analytics) as your first feature.

## Next Steps

* [Add Analytics](./analytics)
* [Add User Sign-in](./authentication)
* [Add Push Notification](./push-notifications)
* [Add User File Storage](./storage)
* [Add Serverless Backend](./api)
* [Add Cloud Logic](./api)
* [Add Messaging](./messaging)
