# Getting Started

Get started building a cloud-powered Android app using the AWS Amplify CLI and the AWS SDK for Android. This page guides you through setting up an initial backend and integrating the SDK into your app.

## Step 0: Set Up Your Development Environment

We strongly recommend that you use the Amplify CLI for building the serverless backend for your app. If you have already installed the CLI, skip ahead to [Step 2](./add-aws-mobile-sdk-basic-setup).

*  [Sign up for an AWS Account](https://portal.aws.amazon.com/billing/signup?redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start).

*  Install [Node.js](https://nodejs.org/) and npm (if they are not already installed).

> Verify that you are running at least Node.js version 8.11.x or greater and npm version 5.x or greater by running `node -v` and `npm -v` in a terminal/console window. Older versions aren't supported and might generate errors.

To install and configure the Amplify CLI globally, run the following commands in a terminal window.

  ```bash
   $ npm install -g @aws-amplify/cli
   $ amplify configure
   ```

Minimum requirements for your development environment are as follows.

* Choose the Android Java app project you want to integrate with an AWS backend.

* [Install Android Studio](https://developer.android.com/studio/index.html#downloads) version 2.33 or higher.

* Install Android SDK for API level 23 (Android SDK 6.0).

## Step 1: Create a new app

* Follow [these steps](https://developer.android.com/training/basics/firstapp/creating-project) to create a new Android Studio application

* Add the following to your `AndroidManifest.xml` :

  ```xml
  <uses-permission android:name="android.permission.INTERNET"/>
  <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
  ```

## Step 2: Install amplify

```bash
$ npm install --save aws-amplify
```

## Step 3: Set Up Your Backend

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

Your app is now ready for you to add cloud-powered features. We recommend [adding analytics](./analytics) as your first feature.

## Step 5: Initialize the SDK

Initialize the SDK with the following snippet

```java
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.amazonaws.mobile.client.AWSMobileClient;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = MainActivity.class.getSimpleName();

    public static PinpointManager pinpointManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Initialize the AWS Mobile Client
        AWSMobileClient.getInstance().initialize(this, new AWSStartupHandler() {
            @Override
            public void onComplete(AWSStartupResult awsStartupResult) {
                Log.d(TAG, "AWSMobileClient is instantiated and you are connected to AWS!");
            }
        }).execute();
    }
}
```
## Step 6: Concepts (awsconfig, manual credentials)

## Next Steps

* [Add Analytics](./analytics)
* [Add User Sign-in](./authentication)
* [Add Push Notification](./push-notifications)
* [Add User File Storage](./storage)
* [Add Serverless Backend](./api)
* [Add Cloud Logic](./api)
* [Add Messaging](./messaging)
