
## Create a tracker resource

In order to start tracking, you create an Amazon Location Tracking resource to capture and store positions of your users. 

1. Open the [Amazon Location Service console](https://console.aws.amazon.com/location/tracking/home#/create) to create a tracker.
1. Enter **MyTracker** in **Name**.
1. Press **Create tracker**.

      ![Amazon Location Service - Create tracker](~/images/als/create-tracker.png)

1. Note the Amazon Resource Name (ARN) of your tracker. This will start with **arn:aws:geo** as in the below screenshot.

      ![Amazon Location Service - Tracker](~/images/als/my-tracker.png)

## Allow Guest users access to the tracker

Now that you have created a tracker resource, you must create an inline policy to give users of your application access to the resource:

1. Navigate to the root of your project and run the following command:

    ```bash
    amplify console auth
    ```

1. Select **Identity Pool** from **Which console?** when prompted.
1. You will be navigated to the Amazon Cognito console. Click on **Edit identity pool** in the top right corner of the page.
1. Open the drop down for **Unauthenticated identities**, choose **Enable access to unauthenticated identities**, and then press **Save Changes**.
1. Click on **Edit identity pool** once more. Make a note of the name of the Unauthenticated role. For example, `amplify-<project_name>-<env_name>-<id>-unauthRole`.
1. Open the [AWS Identity and Access Management (IAM) console](https://console.aws.amazon.com/iam/home#/roles) to manage roles.
1. In the **Search** field, enter the name of your unauthRole noted above and click on it.
1. Click **+Add inline policy**, then click on the **JSON** tab.
1. Fill in the **[ARN]** placeholder with the ARN of your tracker which you noted above and replace the contents of the policy with the below.

    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": "geo:BatchUpdateDevicePosition",
                "Resource": "[ARN]"
            }
        ]
    }
    ```

1. Click on the **Review policy** button.
2. In the **Name** field, enter **LocationTracker**.
3. Click on the **Create policy** button.  

You have now successfully added authentication to your Android app.

## Sending device location data to Amazon Location Service

The below steps describe how you can get a device location and pass it to the tracker resource you have created with Amazon Location Service:

1. In Android Studio, expand **manifests** in the project viewer and open **AndroidManifest.xml**.

1. Add the following permissions after the opening **manifest** tag. This grants your application access to location services and network connectivity. To learn more, refer to Request location permissions (https://developer.android.com/training/location/permissions) in the Android Developers documentation.

    ```xml
    <manifest ...>
        ...
        
        <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
        <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
        <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
        <uses-permission android:name="android.permission.INTERNET" />
    </manifest>
    ```

1. Create a new Tracker instance:

    <amplify-block-switcher>

    <amplify-block name="Java">

    ```java
    AWSLocationTracker tracker;

    AWSMobileClient.getInstance().initialize(getApplicationContext(), new Callback<UserStateDetails>() {
      @Override
        public void onResult(UserStateDetails userStateDetails) {
            tracker = new AWSLocationTracker("MyTracker", AWSMobileClient.getInstance());
        }

        @Override
        public void onError(Exception error) {
            // Handle AWSMobileClient initialization error
        }
    });
    ```

    </amplify-block>
    <amplify-block name="Kotlin">

    ```kotlin
    var tracker: AWSLocationTracker

    AWSMobileClient.getInstance().initialize(applicationContext, object : Callback<UserStateDetails?> {
        override fun onResult(userStateDetails: UserStateDetails?) {
            tracker = AWSLocationTracker("MyTracker", AWSMobileClient.getInstance())
        }

        override fun onError(e: Exception) {
            // Handle AWSMobileClient initialization error
        }
    })
    ```

    </amplify-block>
    </amplify-block-switcher>

1. Create `TrackingListener` and `TrackingOptions` objects to supply to `startTracking()` from an Android `Activity` class. `TrackingOptions` allows you to configure the intervals the client will retrieve and report location to Amazon Location. The default values are to retrieve the location of the device every 30 seconds and to send the locations in a batch to the backend every 5 minutes.

    <amplify-block-switcher>

    <amplify-block name="Java">

    ```java
    TrackingListener listener = new TrackingListener() {
        @Override
        public void onStop() {
            // Handle tracked stopped event
        }

        @Override
        public void onDataPublished(TrackingPublishedEvent trackingPublishedEvent) {
            // Handle a successful publishing event for a batch of locations.
        }

        @Override
        public void onDataPublicationError(TrackingError trackingError) {
            // Handle a failure to publish location data.
        }
    };

    TrackingOptions options = TrackingOptions.builder()
        .customDeviceId("customId")
        .retrieveLocationFrequency(30_000L) // Retrieve the current location every 30 seconds
        .emitLocationFrequency(300_000L)    // Emit a batch of locations to Amazon Location every 5 minutes 
        .build();
    ```

    </amplify-block>
    <amplify-block name="Kotlin">

    ```kotlin
    val listener: TrackingListener = object : TrackingListener {
        override fun onStop() {
            // Handle tracked stopped event
        }

        override fun onDataPublished(trackingPublishedEvent: TrackingPublishedEvent) {
            // Handle a successful publishing event for a batch of locations.
        }

        override fun onDataPublicationError(trackingError: TrackingError) {
            // Handle a failure to publish location data.
        }
    }

    val options = TrackingOptions.builder()
        .customDeviceId("customId")
        .retrieveLocationFrequency(30_000L) // Retrieve the current location every 30 seconds
        .emitLocationFrequency(300_000L)    // Emit a batch of locations to Amazon Location every 5 minutes 
        .build()
    ```

    </amplify-block>
    </amplify-block-switcher>

1. The tracker can now be started and stopped, and its status can be queried:

    <amplify-block-switcher>

    <amplify-block name="Java">

    ```java
    // Starts the tracker

    tracker.startTracking(this, options, listener);

    // Returns true if the tracker is started
    boolean isStarted = tracker.isTracking();

    // Stops the tracker
    tracker.stopTracking(this);
    ```

    </amplify-block>
    <amplify-block name="Kotlin">

    ```kotlin
    // Starts the tracker
    tracker.startTracking(this, options, listener)

    // Returns true if the tracker is started
    val isStarted: Boolean = tracker.isTracking()

    // Stops the tracker
    tracker.stopTracking(this)

    ```

    </amplify-block>
    </amplify-block-switcher>
