---
canonical_url: https://docs.amplify.aws/lib/analytics/getting-started?platform=android
---
<br />

**Note**
This guide shows how to build an app using our Amplify Libraries for Android (Preview) and the Amplify CLI toolchain.
To use the existing AWS Mobile SDK for Android instead, [click here.](../sdk/android/analytics)
{: .callout .callout--warning}

# Analytics

The Analytics category enables you to collect analytics data for your application. It comes with built-in support for [Amazon Pinpoint](#using-amazon-pinpoint)], but its extensible interface allows it to be extended to target any cloud provider's backend

## Set up your backend

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
? Enter a name for the project AmplifyAnalytics
? Enter a name for the environment dev
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building android
? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use default
```

Add analytics using the command `amplify add analytics`. Here is an example:

```perl
? Provide your pinpoint resource name: `pinpointResourceName`
Adding analytics would add the Auth category to the project if not already added.
? Apps need authorization to send analytics events. Do you want to allow guests and unauthenticated users to send analytics events? (we recommend you allow this when getting
started) `Yes`
```

Push your changes to the cloud using the push command.
```terminal
$ amplify push
```

When your backend is successfully updated, there should be two newly created files: `amplifyconfiguration.json` and `awsconfiguration.json` in your project folder.

Optional: Run `amplify console analytics` to open the AWS Pinpoint console in a web browser.

## Install Amplify libraries and tools

Open your project `build.gradle` and add the following:

* `mavenCentral()` as a repository

```gradle
buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.5.0'
    }
}
```

Next add the following dependencies to your app `build.gradle`:

```gradle
implementation 'com.amplifyframework:core:0.9.1'
implementation 'com.amplifyframework:aws-analytics-pinpoint:0.9.1'
```

Sync the project with Maven and then ensure it built successfully.

## Initialize Amplify

Initialize `AWSMobileClient`, `Amplify`, and `AmazonPinpointAnalyticsPlugin`.

Add the following imports to the top of your `MainActivity.java` file:

```java
import com.amplifyframework.AmplifyException;
import com.amplifyframework.analytics.AnalyticsException;
import com.amplifyframework.core.Amplify;
import com.amplifyframework.analytics.pinpoint.AmazonPinpointAnalyticsPlugin;
import com.amplifyframework.core.AmplifyConfiguration;

import com.amazonaws.mobile.client.Callback;
import com.amazonaws.mobile.client.UserStateDetails;
import com.amazonaws.mobile.config.AWSConfiguration;
import com.amazonaws.mobile.client.AWSMobileClient;
```

Add the following code to the onCreate() method of `MainActivity.java`

```java
private static final String TAG = MainActivity.class.getSimpleName();
private static final int INITIALIZATION_TIMEOUT_MS = 2000;

@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    // Initialize Mobile Client.
    final AWSConfiguration awsConfiguration = new AWSConfiguration(getApplicationContext());
    final CountDownLatch mobileClientLatch = new CountDownLatch(1);
    AWSMobileClient.getInstance().initialize(getApplicationContext(), awsConfiguration,
            new Callback<UserStateDetails>() {
                @Override
                public void onResult(UserStateDetails userStateDetails) {
                    Log.i(TAG, "Mobile client initialized");
                    mobileClientLatch.countDown();
                }

                @Override
                public void onError(Exception exception) {
                    Log.e(TAG, "Error initializing AWS Mobile Client", exception);
                }
            });

    try {
        if (!mobileClientLatch.await(INITIALIZATION_TIMEOUT_MS, TimeUnit.MILLISECONDS)) {
            throw new AnalyticsException("Failed to initialize mobile client.",
                    "Please check your awsconfiguration json.");
        }
    } catch (InterruptedException | AnalyticsException exception) {
        throw new RuntimeException("Failed to initialize mobile client: " + exception.getLocalizedMessage());
    }

    // Configure Amplify framework
    AmplifyConfiguration configuration = new AmplifyConfiguration();
    try {
        configuration.populateFromConfigFile(getApplicationContext(), R.raw.amplifyconfiguration);
        Amplify.addPlugin(new AmazonPinpointAnalyticsPlugin());
        Amplify.configure(configuration, getApplicationContext());
    } catch (AmplifyException e) {
        e.printStackTrace();
    }
    Amplify.Analytics.recordEvent("test-event");
}
```

## Use cases

The AWSPinpointAnalyticsPlugin provides APIs do the following

1. Record app events which can be viewed through the Pinpoint console.

The following examples assumes you have followed the steps to initialize Amplify and configure it with Analytics. 

### Record event

The Amplify analytics plugin also makes it easy to record custom events within the app. The plugin handles retry logic in the event the device looses network connectivity and automatically batches requests to reduce network bandwidth.

```java
import com.amplifyframework.core.Amplify;
import com.amplifyframework.analytics.AnalyticsException;
import com.amplifyframework.analytics.BasicAnalyticsEvent;
import com.amplifyframework.analytics.pinpoint.PinpointProperties

public void recordEvent() throws AnalyticsException {

    // Create an instance of BasicAnalyticsEvent.
    BasicAnalyticsEvent event = new BasicAnalyticsEvent("Amplify-event" + UUID.randomUUID().toString(),
            PinpointProperties.builder()
            .add("DemoProperty1", "DemoValue1")
            .add("DemoProperty2", 2.0)
            .build());

    Amplify.Analytics.recordEvent(event);

    // Plugin will automatically flush events.
    // You do not have to do this in the app code.
    Amplify.Analytics.flushEvents()
}
```

### Flush Events

Events have default configuration to flush out to the network every 60 seconds. If you would like to change this, update `amplifyconfiguration.json` with the value you would like for `autoFlushEventsInterval` like so
```json
{
    "UserAgent": "aws-amplify-cli/2.0",
    "Version": "1.0",
    "analytics": {
        "plugins": {
            "awsPinpointAnalyticsPlugin": {
                "pinpointAnalytics": {
                    "appId": "AppID",
                    "region": "Region"
                },
                "pinpointTargeting": {
                    "region": "Region"
                },
                "autoFlushEventsInterval": 30
            }
        }
    }
}
```

To manually flush events, call:
```java
Amplify.Analytics.flushEvents();
```

### Disable Analytics

To disable analytics, call:
```java
Amplify.Analytics.disable()
```

### Enable Analytics

To re-enable, call:
```java
Amplify.Analytics.enable()
```

## Escape Hatch

For advanced use cases where Amplify does not provide the functionality, you can retrieve the escape hatch to access AWSPinpoint instance.

```java
import com.amazonaws.mobileconnectors.pinpoint.analytics.AnalyticsClient;

AmazonPinpointAnalyticsPlugin plugin = (AmazonPinpointAnalyticsPlugin) Amplify
        .Analytics
        .getPlugin("amazonPinpointAnalyticsPlugin");
AnalyticsClient analyticsClient = plugin.getEscapeHatch();
```

