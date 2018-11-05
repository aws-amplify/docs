# Analytics
<div class="nav-tab create" data-group='create'>
<ul class="tabs">
    <li class="tab-link java current" data-tab="java">Java</li>
    <li class="tab-link kotlin" data-tab="kotlin">Kotlin</li>
</ul>

Collecting analytics data for your app can be accomplished with [Amazon Pinpoint](#using-amazon-pinpoint) and [Amazon Kinesis](#using-amazon-kinesis).

Ensure you have [installed and configured the Amplify CLI and library]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/start).
{: .callout .callout--info}

## Using Amazon Pinpoint

Gather the data that helps improve your app's usability, monetization, and engagement with your users. The CLI deploys your analytics backend using [Amazon Pinpoint](http://docs.aws.amazon.com/pinpoint/latest/developerguide/welcome.html).

### Set Up Your Backend

1. Complete the [Get Started TODO link](asdf) steps before you proceed.

2. Use the CLI to add analytics to your cloud-enabled backend and app.

    In a terminal window, navigate to your project folder (the folder that typically contains your project level `build.gradle`), and add the SDK to your app.

    ```bash
    $ cd ./YOUR_PROJECT_FOLDER
    $ amplify add analytics
    ```

    In a terminal window, navigate to your project folder (the folder contains your app `.xcodeproj` file), and add the SDK to your app.

    ```bash
    $ cd ./YOUR_PROJECT_FOLDER
    $ amplify add analytics
    ```

3. When configuration for analytics is complete, a message appears confirming that you have configured local CLI metadata for this category. You can confirm this by viewing status.

    ```bash
    $ amplify status
    | Category  | Resource name   | Operation | Provider plugin   |
    | --------- | --------------- | --------- | ----------------- |
    | Auth      | cognitoabcd0123 | Create    | awscloudformation |
    | Analytics | yourprojectname | Create    | awscloudformation |
    ```

4. To create your backend AWS resources run the following:

    ```bash
    $ amplify push
    ```

### Connect to Your Backend

Use the following steps to add analytics to your mobile app and monitor the results through Amazon Pinpoint.

#### Add Analytics
<div id="java" class="tab-content current">
1. Set up AWS Mobile SDK components by including the following libraries in your `app/build.gradle` dependencies list.

    ```groovy
    dependencies {
      implementation 'com.amazonaws:aws-android-sdk-pinpoint:2.6.+'
      implementation ('com.amazonaws:aws-android-sdk-mobile-client:2.6.+@aar') { transitive = true }
    }
    ```

    * `aws-android-sdk-pinpoint` library enables sending analytics to Amazon Pinpoint.
    * `aws-android-sdk-mobile-client` library gives access to the AWS credentials provider and configurations.

2. Add required permissions to your app manifest.

    The AWS Mobile SDK requires the `INTERNET` and `ACCESS_NETWORK_STATE` permissions. These are defined in the `AndroidManifest.xml` file.

    ```xml
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
    ```

3. Add calls to capture session starts and stops. A session is one use of an app by the user. A session begins when an app is launched (or brought to the foreground), and ends when the app is terminated (or goes to the background). To accommodate for brief interruptions, like a text message, an inactivity period of up to 5 seconds is not counted as a new session. `Total daily sessions` shows the number of sessions your app has each day. `Average sessions per daily active user` shows the mean number of sessions per user per day.

   The following are typical places where you can instrument your app session start and stop:

   * Start a session in the `Application.onCreate()` method.

   * Start a session in the `onCreate()` method of the app's first activity.

   * Start or stop a session in the [ActivityLifecycleCallbacks](https://developer.android.com/reference/android/app/Application.ActivityLifecycleCallbacks) class.

   The following example shows how to start a session in the `OnCreate` event of `MainActivity`.

    ```java
    import android.support.v7.app.AppCompatActivity;
    import android.os.Bundle;

    import com.amazonaws.mobileconnectors.pinpoint.PinpointManager;
    import com.amazonaws.mobileconnectors.pinpoint.PinpointConfiguration;
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

            PinpointConfiguration config = new PinpointConfiguration(
                    MainActivity.this,
                    AWSMobileClient.getInstance().getCredentialsProvider(),
                    AWSMobileClient.getInstance().getConfiguration()
            );
            pinpointManager = new PinpointManager(config);
            pinpointManager.getSessionClient().startSession();
        }
    }
    ```

	To stop the session, use `stopSession()` and `submitEvents()` at the last point in the session you want to capture. In this example, we are using a single Activity, so the session will stop when the MainActivity is destroyed. `onDestroy()` is usually called when the back button is pressed while in the activity.

	```java
	@Override
	protected void onDestroy() {
	    super.onDestroy();

	    pinpointManager.getSessionClient().stopSession();
	    pinpointManager.getAnalyticsClient().submitEvents();
	}
	```
</div>
<div id="kotlin" class="tab-content">
1. Set up AWS Mobile SDK components as follows.

    1. Include the following libraries in your :file:`app/build.gradle` dependencies list.

        ```groovy
        dependencies {
            implementation 'com.amazonaws:aws-android-sdk-pinpoint:2.6.+'
            implementation ('com.amazonaws:aws-android-sdk-mobile-client:2.6.+@aar') { transitive = true }
            // other dependencies . . .
        }
        ```
        * `aws-android-sdk-pinpoint` library enables sending analytics to Amazon Pinpoint.
        * `aws-android-sdk-mobile-client` library gives access to the AWS credentials provider and configurations.

    2. Add required permissions to your app manifest.

        The AWS Mobile SDK required the `INTERNET` and `ACCESS_NETWORK_STATE` permissions.  These are defined in the `AndroidManifest.xml` file.

        ```xml
        <uses-permission android:name="android.permission.INTERNET"/>
        <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
        ```

2. Add calls to capture session starts and stops. A session is one use of an app by the user. A session begins when an app is launched (or brought to the foreground), and ends when the app is terminated (or goes to the background). To accommodate for brief interruptions, like a text message, an inactivity period of up to 5 seconds is not counted as a new session. Total daily sessions shows the number of sessions your app has each day. Average sessions per daily active user shows the mean number of sessions per user per day.

   Three typical places to instrument your app session start and stop are:

   * Start a session in the `Application.onCreate()` method.

   * Start a session in the `onCreate()` method of the app's first activity.

   * Start or stop a session in the [ActivityLifecycleCallbacks](https://developer.android.com/reference/android/app/Application.ActivityLifecycleCallbacks) class.

   The following example shows how to start a session in the `OnCreate` event of `MainActivity`.

      ```kotlin
      import android.support.v7.app.AppCompatActivity;
      import android.os.Bundle;
      import com.amazonaws.mobileconnectors.pinpoint.PinpointManager;
      import com.amazonaws.mobileconnectors.pinpoint.PinpointConfiguration;
      import com.amazonaws.mobile.client.AWSMobileClient;

      class MainActivity : AppCompatActivity() {
          companion object {
              private val TAG = MainActivity.javaClass.simpleName
              var pinpointManager: PinpointManager? = null
          }

          override fun onCreate(savedInstanceState: Bundle?) {
              super.onCreate(savedInstanceState)
              setContentView(R.layout.activity_main)

              // Initialize the AWS Mobile client
              AWSMobileClient.getInstance().initialize(this) { Log.d(TAG, "AWSMobileClient is instantiated and you are connected to AWS!") }.execute()

              val config = PinpointConfiguration(
                      this@MainActivity,
                      AWSMobileClient.getInstance().credentialsProvider,
                      AWSMobileClient.getInstance().configuration
              )

              pinpointManager = PinpointManager(config)
              pinpointManager?.sessionClient?.startSession()
          }
      }
      ```
   To stop the session, use `stopSession()` and `submitEvents()` at the last point in the session that you want to capture. In this example, we are using a single Activity, so the session will stop when the MainActivity is destroyed. `onDestroy()` is usually called when the back button is pressed while in the activity.

   ```kotlin
    override fun onDestroy() {
        super.onDestroy()
        pinpointManager?.sessionClient?.stopSession()
        pinpointManager?.analyticsClient?.submitEvents()
    }
  ```  
</div>
#### Monitor Analytics

Build and run your app to see usage metrics in Amazon Pinpoint. When you run the previous code samples, the console shows a logged Session.

1. To see visualizations of the analytics coming from your app, open your project in the Amazon Pinpoint console by running the following:

    ```bash
    $ amplify console analytics
    ```

2. Choose `Analytics` from the icons on the left of the console, and view the graphs of your app's usage. It may take up to 15 minutes for metrics to become visible.

    ![getting-started-analytics](media/getting-started-analytics.png)

    [Learn more about Amazon Pinpoint](http://docs.aws.amazon.com/pinpoint/latest/developerguide/welcome.html).

### Enable Custom App Analytics

Instrument your code to capture app usage event information, including attributes you define.  Use graphs of your custom usage event data  in the Amazon Pinpoint console. Visualize how your users' behavior aligns with a model you design using [Amazon Pinpoint Funnel Analytics](https://docs.aws.amazon.com/pinpoint/latest/userguide/analytics-funnels.html), or use [stream the data](https://docs.aws.amazon.com/pinpoint/latest/userguide/analytics-streaming.html) for deeper analysis.

Use the following steps to implement Amazon Pinpoint custom analytics for your app.
<div id="java" class="tab-content current">
```java
import com.amazonaws.mobileconnectors.pinpoint.analytics.AnalyticsEvent;

/**
* Call this method to log a custom event to the analytics client.
*/
public void logEvent() {
   final AnalyticsEvent event =
       pinpointManager.getAnalyticsClient().createEvent("EventName")
           .withAttribute("DemoAttribute1", "DemoAttributeValue1")
           .withAttribute("DemoAttribute2", "DemoAttributeValue2")
           .withMetric("DemoMetric1", Math.random());

   pinpointManager.getAnalyticsClient().recordEvent(event);
}
```
</div>
<div id="kotlin" class="tab-content">
```kotlin
import com.amazonaws.mobileconnectors.pinpoint.analytics.AnalyticsEvent;

/**
 * Call this method to log a custom event to the analytics client.
 */
fun logEvent() {
    pinpointManager?.analyticsClient?.let {
        val event = it.createEvent("EventName")
            .withAttribute("DemoAttribute1", "DemoAttributeValue1")
            .withAttribute("DemoAttribute2", "DemoAttributeValue2")
            .withMetric("DemoMetric1", Math.random());
        it.recordEvent(event)
}
```
</div>
Build, run, and use your app. Then, view your custom events on the `Events` tab of the Amazon Pinpoint console (choose `Analytics`>`Events`). Look for the name of your event in the `Events` menu.

### Enable Revenue Analytics

Amazon Pinpoint supports the collection of monetization event data. Use the following steps to place
and design analytics related to purchases through your app.
<div id="java" class="tab-content current">
```java
import com.amazonaws.mobileconnectors.pinpoint.analytics.monetization.AmazonMonetizationEventBuilder;

/**
* Call this method to log a monetized event to the analytics client.
*/
public void logMonetizationEvent() {
    final AnalyticsEvent event =
       AmazonMonetizationEventBuilder.create(pinpointManager.getAnalyticsClient())
           .withCurrency("USD")
           .withItemPrice(10.00)
           .withProductId("DEMO_PRODUCT_ID")
           .withQuantity(1.0)
           .withProductId("DEMO_TRANSACTION_ID").build();

    pinpointManager.getAnalyticsClient().recordEvent(event);
}
```
</div>
<div id="kotlin" class="tab-content">
```kotlin
import com.amazonaws.mobileconnectors.pinpoint.analytics.monetization.AmazonMonetizationEventBuilder

/**
 * Call this method to log a monetized event to the analytics client.
 */
fun logMonetizationEvent() {
    pinpointManager?.analyticsClient?.let {
        val event = AmazonMonetizationEventBuilder.create(it)
                .withCurrency("USD")
                .withItemPrice(10.00)
                .withProductId("DEMO_PRODUCT_ID")
                .withQuantity(1.0)
                .withProductId("DEMO_TRANSACTION_ID").build();
        it.recordEvent(event)
    }
}
```
</div>

## Using Amazon Kinesis

The two classes `KinesisRecorder` and `KinesisFirehoseRecorder` allow you to interface with Amazon Kinesis and Amazon Kinesis Firehose to stream analytics data for real-time processing.

### What is Amazon Kinesis?

[Amazon Kinesis](http://aws.amazon.com/kinesis/) is a fully managed service for real-time processing of streaming data at massive scale. Amazon Kinesis can collect and process hundreds of terabytes of data per hour from hundreds of thousands of sources, so you can write applications that process information in real-time. With Amazon Kinesis applications, you can build real-time dashboards, capture exceptions and generate alerts, drive recommendations, and make other real-time business or operational decisions. You can also easily send data to other services such as Amazon Simple Storage Service, Amazon DynamoDB, and Amazon Redshift.

The Amazon Kinesis `KinesisRecorder` client lets you store [PutRecord](http://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecord.html) requests on disk and then send them all at once. This is useful because many mobile applications that use Amazon Kinesis will create multiple `PutRecord` requests per second. Sending an individual request for each `PutRecord` action could adversely impact battery life. Moreover, the requests could be lost if the device goes offline. Thus, using the high-level Amazon Kinesis client for batching can preserve both battery life and data.

### What is Amazon Kinesis Firehose?

[Amazon Kinesis Firehose](http://aws.amazon.com/kinesis/firehose/) is a fully managed service for delivering real-time streaming data to destinations such as Amazon Simple Storage Service (Amazon S3) and Amazon Redshift. With Firehose, you do not need to write any applications or manage any resources. You configure your data producers to send data to Firehose and it automatically delivers the data to the destination that you specified.

The Amazon Kinesis Firehose `KinesisFirehoseRecorder` client lets you store [PutRecords](http://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecords.html) requests on disk and then send them using Kinesis Data Firehose`PutRecordBatch`.

For more information about Amazon Kinesis Firehose, see [Amazon Kinesis Firehose](http://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html).

### Integrating Amazon Kinesis and Amazon Kinesis Firehose

Add the following imports to the main activity of your app.

```java
import com.amazonaws.mobileconnectors.kinesis.kinesisrecorder.*;
import com.amazonaws.auth.CognitoCachingCredentialsProvider;
import com.amazonaws.regions.Regions;
```

To use Amazon Kinesis in an application, you must set the correct permissions. The following IAM policy allows the user to submit records to a specific Amazon Kinesis stream, which is identified by [ARN](http://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html).

```json
{
    "Statement": [{
        "Effect": "Allow",
        "Action": "kinesis:PutRecords",
        "Resource": "arn:aws:kinesis:us-west-2:111122223333:stream/mystream"
    }]
}
```

The following IAM policy allows the user to submit records to a specific Amazon Kinesis Firehose stream.

```json
{
    "Statement": [{
        "Effect": "Allow",
        "Action": "firehose:PutRecordBatch",
        "Resource": "arn:aws:firehose:us-west-2:111122223333:deliverystream/mystream"
    }]
}
```

This policy should be applied to roles assigned to the Amazon Cognito identity pool, but you need to replace the `Resource` value with the correct ARN for your Amazon Kinesis or Amazon Kinesis Firehose stream. You can apply policies at the [IAM console](https://console.aws.amazon.com/iam/). To learn more about IAM policies, see [Using IAM](http://docs.aws.amazon.com/IAM/latest/UserGuide/IAM_Introduction.html).

To learn more about Amazon Kinesis-specific policies, see [Controlling Access to Amazon Kinesis Resources with IAM](http://docs.aws.amazon.com/kinesis/latest/dev/kinesis-using-iam.html).

To learn more about Amazon Kinesis Firehose policies, see [Controlling Access with Amazon Kinesis Firehose](http://docs.aws.amazon.com/firehose/latest/dev/controlling-access.html).

### Working with the API

Once you have credentials, you can use `KinesisRecorder` with Amazon Kinesis. The following snippet creates a directory and instantiates the `KinesisRecorder` client: 

```java
String kinesisDirectory = "YOUR_UNIQUE_DIRECTORY";
KinesisRecorder recorder = new KinesisRecorder(
    myActivity.getDir(kinesisDirectory, 0),
    Regions.<YOUR-AWS-REGION>,
    AWSMobileClient.getInstance().getCredentialsProvider()
);

//KinesisRecorder uses synchronous calls, so you shouldn't call KinesisRecorder methods on the main thread.
```

To use `KinesisFirehoseRecorder`, you need to pass the object in a directory where streaming data is saved. We recommend you use an app private directory because the data is not encrypted.

```java
KinesisFirehoseRecorder firehoseRecorder = new KinesisFirehoseRecorder(
    context.getCachedDir(), 
    Regions.<YOUR-AWS-REGION>,
    AWSMobileClient.getInstance().getCredentialsProvider());
```

Configure Kinesis:

You can configure `KinesisRecorder` or `KinesisFirehoseRecorder` through their properties:

You can configure the maximum allowed storage via the `withMaxStorageSize()` method of `KinesisRecorderConfig`.

You can retrieve the same information by getting the `KinesisRecorderConfig` object for the recorder and calling `getMaxStorageSize():`

```java
KinesisRecorderConfig kinesisRecorderConfig = recorder.getKinesisRecorderConfig();
Long maxStorageSize = kinesisRecorderConfig.getMaxStorageSize();
// Do something with maxStorageSize
```

To check the number of bytes currently stored in the directory passed in to the `KinesisRecoder` constructor, call `getDiskBytesUsed()`:

```java
Long bytesUsed = recorder.getDiskBytesUsed();
// Do something with bytesUsed
```

To see how much space the `KinesisRecorder` client is allowed to use, you can call `getDiskByteLimit()`.

```java
Long byteLimit = recorder.getDiskByteLimit();
// Do something with byteLimit
```

With `KinesisRecorder` created and configured, you can use `saveRecord()` to save records and then send them in a batch.

```java
recorder.saveRecord(
	"MyData".getBytes(),
	"MyStreamName");
recorder.submitAllRecords();
```

For the `saveRecord()` request above to work, you would have to have created a stream named `MyStreamName`. You can create new streams in the [Amazon Kinesis console](https://console.aws.amazon.com/kinesis).

If `submitAllRecords()` is called while the app is online, requests will be sent and removed from the disk. If `submitAllRecords()` is called while the app is offline, requests will be kept on disk until `submitAllRecords()` is called while online. This applies even if you lose your internet connection midway through a submit. So if you save ten requests, call `submitAllRecords()`, send five, and then lose the Internet connection, you have five requests left on disk. These remaining five will be sent the next time `submitAllRecords()` is invoked online.

Here is a similar snippet for Amazon Kinesis Firehose:

```java
// Start to save data, either a String or a byte array
firehoseRecorder.saveRecord("Hello world!\n");
firehoseRecorder.saveRecord("Streaming data to Amazon S3 via Amazon Kinesis Firehose is easy.\n");

// Send previously saved data to Amazon Kinesis Firehose
// Note: submitAllRecords() makes network calls, so wrap it in an AsyncTask.
new AsyncTask<Void, Void, Void>() {
   @Override
   protected Void doInBackground(Void... v) {
       try {
           firehoseRecorder.submitAllRecords();
       } catch (AmazonClientException ace) {
           // handle error
       }
   }
}.execute();
```

To learn more about working with Amazon Kinesis, see the [Amazon Kinesis Developer Resources](http://aws.amazon.com/kinesis/developer-resources/).

To learn more about the Amazon Kinesis classes, see the [class reference for KinesisRecorder](https://aws.github.io/aws-sdk-android/docs/reference/com/amazonaws/mobileconnectors/kinesis/kinesisrecorder/KinesisRecorder.html).

To learn more about the Kinesis Firehose classes, see the [class reference for KinesisFirehoseRecorder](https://aws.github.io/aws-sdk-android/docs/reference/com/amazonaws/mobileconnectors/kinesis/kinesisrecorder/KinesisFirehoseRecorder.html).
