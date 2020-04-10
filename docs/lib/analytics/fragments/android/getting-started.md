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

Add the following imports to the top of your `MainActivity.java` file:

```java
import com.amplifyframework.analytics.pinpoint.AmazonPinpointAnalyticsPlugin;
import com.amplifyframework.core.Amplify;
import com.amplifyframework.analytics.AnalyticsEvent;
```

Add the following code to the onCreate() method of `MainActivity.java`

```java
try {
        AmazonPinpointAnalyticsPlugin plugin = new AmazonPinpointAnalyticsPlugin((Application) context);
        Amplify.addPlugin(plugin);
        Amplify.configure(context);
    } catch (Exception e) {
        Log.e("GetStarted", "Error initializing", e);
    }

    Analytics.recordEvent("GetStarted");
}
```
