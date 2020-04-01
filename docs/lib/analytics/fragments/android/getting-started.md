When your backend is successfully updated, there should be two newly created files: `amplifyconfiguration.json` and `awsconfiguration.json` in your project folder.

## Install Amplify libraries and tools

Open your project `build.gradle` and add the following:

* `mavenCentral()` as a repository

```groovy
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

```groovy
implementation 'com.amplifyframework:core:0.10.0'
implementation 'com.amplifyframework:aws-analytics-pinpoint:0.10.0'
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
    try {
        Amplify.addPlugin(new AmazonPinpointAnalyticsPlugin(getApplication()));
        Amplify.configure(getApplicationContext());
    } catch (AmplifyException e) {
        e.printStackTrace();
    }
    Amplify.Analytics.recordEvent("test-event");
}
```

## API Reference

For a complete API reference visit the [API Reference]().
