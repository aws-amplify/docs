---
title: Push Notifications
---

# Push Notifications

## Overview

Enable your users to receive mobile push messages sent from the Apple (APNs) and Google (FCM/GCM) platforms. The CLI deploys your push notification backend using [Amazon Pinpoint](http://docs.aws.amazon.com/pinpoint/latest/developerguide/).
You can also create Amazon Pinpoint campaigns that tie user behavior to push or other forms of messaging.

## Set Up Your Backend

1. Complete the [Get Started](./start) steps before you proceed.

2. Use the CLI to add storage to your cloud-enabled backend and app.

    In a terminal window, navigate to your project folder (the folder that typically contains your project level `build.gradle`), and add the SDK to your app.

    ```bash
    $ cd ./YOUR_PROJECT_FOLDER
    $ amplify add notifications
    ```

3. Set up your backend to support receiving push notifications:

    - Choose Firebase Cloud Messaging (FCM).

    ```
    > FCM
    ```

    - Provide your ApiKey. The FCM console refers to this value as `ServerKey`. For information on getting an FCM ApiKey, see the section [Setting Up FCM/GCM Guide](./push-notifications-setup-fcm). Use the steps in the next section to connect your app to your backend.

## Connect to Your Backend

Use the following steps to connect your app to the push notification backend services.

1. Add the following dependencies and plugin to your `app/build.gradle`:

    ```groovy
    dependencies {
        // Overrides an auth dependency to ensure correct behavior
        implementation 'com.google.android.gms:play-services-auth:15.0.1'

        implementation 'com.google.firebase:firebase-core:16.0.1'
        implementation 'com.google.firebase:firebase-messaging:17.3.0'

        implementation 'com.amazonaws:aws-android-sdk-pinpoint:2.15.+'
        implementation ('com.amazonaws:aws-android-sdk-mobile-client:2.15.+@aar') { transitive = true }
    }

    apply plugin: 'com.google.gms.google-services'
    ```

2. Add the following to your project level `build.gradle`. Make sure that you specify the `google` repository:

    ```groovy
    buildscript {
        dependencies {
            classpath 'com.google.gms:google-services:4.0.1'
        }
    }

    allprojects {
        repositories {
            google()
        }
    }
    ```

3. `AndroidManifest.xml` must contain the definition of the following service for `PushListenerService` in the application tag:

    ```xml
    <service
        android:name=".PushListenerService">
        <intent-filter>
            <action android:name="com.google.firebase.MESSAGING_EVENT"/>
        </intent-filter>
    </service>
    ```

4. Create an Amazon Pinpoint client in the location of your push notification code.

Java:

    ```java
    import android.content.BroadcastReceiver;
    import android.content.Context;
    import android.content.Intent;
    import android.content.IntentFilter;
    import android.os.Bundle;
    import android.support.annotation.NonNull;
    import android.support.v4.content.LocalBroadcastManager;
    import android.support.v7.app.AlertDialog;
    import android.support.v7.app.AppCompatActivity;
    import android.util.Log;

    import com.amazonaws.mobile.client.AWSMobileClient;
    import com.amazonaws.mobile.client.AWSStartupHandler;
    import com.amazonaws.mobile.client.AWSStartupResult;
    import com.amazonaws.mobileconnectors.pinpoint.PinpointConfiguration;
    import com.amazonaws.mobileconnectors.pinpoint.PinpointManager;
    import com.google.android.gms.tasks.OnCompleteListener;
    import com.google.android.gms.tasks.Task;
    import com.google.firebase.iid.FirebaseInstanceId;
    import com.google.firebase.iid.InstanceIdResult;

    public class MainActivity extends AppCompatActivity {
        public static final String TAG = MainActivity.class.getSimpleName();

        private static PinpointManager pinpointManager;

        public static PinpointManager getPinpointManager(final Context applicationContext) {
            if (pinpointManager == null) {
                final AWSConfiguration awsConfig = new AWSConfiguration(applicationContext);
                AWSMobileClient.getInstance().initialize(applicationContext, awsConfig, new Callback<UserStateDetails>() {
                    @Override
                    public void onResult(UserStateDetails userStateDetails) {
                        Log.i("INIT", userStateDetails.getUserState());
                    }

                    @Override
                    public void onError(Exception e) {
                        Log.e("INIT", "Initialization error.", e);
                    }
                });

                PinpointConfiguration pinpointConfig = new PinpointConfiguration(
                        applicationContext,
                        AWSMobileClient.getInstance(),
                        awsConfig);

                pinpointManager = new PinpointManager(pinpointConfig);

                FirebaseInstanceId.getInstance().getInstanceId()
                        .addOnCompleteListener(new OnCompleteListener<InstanceIdResult>() {
                            @Override
                            public void onComplete(@NonNull Task<InstanceIdResult> task) {
                                if (!task.isSuccessful()) {
                                    Log.w(TAG, "getInstanceId failed", task.getException());
                                    return;
                                }
                                final String token = task.getResult().getToken();
                                Log.d(TAG, "Registering push notifications token: " + token);
                                pinpointManager.getNotificationClient().registerDeviceToken(token);
                            }
                        });
            }
            return pinpointManager;
        }

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);

            // Initialize PinpointManager
            getPinpointManager(getApplicationContext());
        }
    }
    ```

    Kotlin:

    ```kotlin
    // ...

    public class MainActivity extends AppCompatActivity {
      // ...
      private val mPinpoint: PinpointManager by lazy { pinpoint }

      override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        FirebaseInstanceId.getInstance().instanceId.addOnCompleteListener { task ->
            if (task.isSuccessful) {
                val token = task?.result?.token
                Log.d("INIT", "Registering push notifications token: ${token}")
                token?.let { mPinpoint.notificationClient.registerDeviceToken(token) }
            } else {
                Log.w("INIT", "getInstanceId failed", task.exception)
            }
        }
    }

    val Context.pinpoint: PinpointManager
        get() {
            val awsConfig = AWSConfiguration(this)
            return PinpointManager(PinpointConfiguration(
                    this,
                    AWSMobileClient.getInstance().initialize(this, awsConfig) {
                        onResult {
                            Log.d(TAG, "initialized: ${it.userState}")
                        }
                        onError { e ->
                            Log.e(TAG, "initialized: error")
                            e.printStackTrace()
                        }
                    },
                    awsConfig))
        }

    fun AWSMobileClient.initialize(context: Context,
                                   config: AWSConfiguration,
                                   init: Callbacks<UserStateDetails>.() -> Unit): AWSMobileClient {
      val callbacks = Callbacks<UserStateDetails>()
      callbacks.init()
      this.initialize(context, config, callbacks)
      return this
    }

    class Callbacks<T> : com.amazonaws.mobile.client.Callback<T> {
      var onResultFunc: (T) -> Unit = {}
      var onErrorFunc: (Throwable) -> Unit = {}

      override fun onResult(result: T) {
          onResultFunc(result)
      }

      fun onResult(onResult: (T) -> Unit) {
          this.onResultFunc = onResult
      }

      override fun onError(e: Exception?) {
          onErrorFunc(e ?: Exception())
      }

      fun onError(onError: (Throwable) -> Unit) {
          this.onErrorFunc = onError
      }
    }
    ```

## Add Amazon Pinpoint Targeted and Campaign Push Messaging

The [Amazon Pinpoint console](https://console.aws.amazon.com/pinpoint/) enables you to target your app users with push messaging. You can send individual messages or configure campaigns that target a group of users that match a profile that you define.
For instance, you could email users that have not used the app in 30 days, or send an SMS to those that frequently use a given feature of your app.

The following steps show how to receive push notifications targeted for your app.

1. Add a push listener service to your app.

    The name of the class must match the push listener service name used in the app manifest.
    `pinpointManager` is a reference to the static `PinpointManager` variable declared in
    the `MainActivity` shown in a previous step. Use the following steps to detect and display Push
    Notification in your app.

2. The following push listener code assumes that the app's `MainActivity` is configured using
            the manifest setup described in a previous section.

    Java:

    ```java
    import android.content.Intent;
    import android.os.Bundle;
    import android.support.v4.content.LocalBroadcastManager;
    import android.util.Log;

    import com.amazonaws.mobileconnectors.pinpoint.targeting.notification.NotificationClient;
    import com.amazonaws.mobileconnectors.pinpoint.targeting.notification.NotificationDetails;
    import com.google.firebase.messaging.FirebaseMessagingService;
    import com.google.firebase.messaging.RemoteMessage;

    import java.util.HashMap;

    public class PushListenerService extends FirebaseMessagingService {
        public static final String TAG = PushListenerService.class.getSimpleName();

        // Intent action used in local broadcast
        public static final String ACTION_PUSH_NOTIFICATION = "push-notification";
        // Intent keys
        public static final String INTENT_SNS_NOTIFICATION_FROM = "from";
        public static final String INTENT_SNS_NOTIFICATION_DATA = "data";

        @Override
        public void onNewToken(String token) {
            super.onNewToken(token);

            Log.d(TAG, "Registering push notifications token: " + token);
            MainActivity.getPinpointManager(getApplicationContext()).getNotificationClient().registerDeviceToken(token);
        }

        @Override
        public void onMessageReceived(RemoteMessage remoteMessage) {
            super.onMessageReceived(remoteMessage);
            Log.d(TAG, "Message: " + remoteMessage.getData());

            final NotificationClient notificationClient = MainActivity.getPinpointManager(getApplicationContext()).getNotificationClient();

            final NotificationDetails notificationDetails = NotificationDetails.builder()
                    .from(remoteMessage.getFrom())
                    .mapData(remoteMessage.getData())
                    .intentAction(NotificationClient.FCM_INTENT_ACTION)
                    .build();

            NotificationClient.CampaignPushResult pushResult = notificationClient.handleCampaignPush(notificationDetails);

            if (!NotificationClient.CampaignPushResult.NOT_HANDLED.equals(pushResult)) {
                /**
                   The push message was due to a Pinpoint campaign.
                   If the app was in the background, a local notification was added
                   in the notification center. If the app was in the foreground, an
                   event was recorded indicating the app was in the foreground,
                   for the demo, we will broadcast the notification to let the main
                   activity display it in a dialog.
                */
                if (NotificationClient.CampaignPushResult.APP_IN_FOREGROUND.equals(pushResult)) {
                    /* Create a message that will display the raw data of the campaign push in a dialog. */
                    final HashMap<String, String> dataMap = new HashMap<>(remoteMessage.getData());
                    broadcast(remoteMessage.getFrom(), dataMap);
                }
                return;
            }
        }

        private void broadcast(final String from, final HashMap<String, String> dataMap) {
            Intent intent = new Intent(ACTION_PUSH_NOTIFICATION);
            intent.putExtra(INTENT_SNS_NOTIFICATION_FROM, from);
            intent.putExtra(INTENT_SNS_NOTIFICATION_DATA, dataMap);
            LocalBroadcastManager.getInstance(this).sendBroadcast(intent);
        }

        /**
         * Helper method to extract push message from bundle.
         *
         * @param data bundle
         * @return message string from push notification
         */
        public static String getMessage(Bundle data) {
            return ((HashMap) data.get("data")).toString();
        }
    }
    ```

    Kotlin:

    ```kotlin
    class PushListenerService : FirebaseMessagingService() {
        companion object {
            const val ACTION_PUSH_NOTIFICATION = "push-notification"
        }

        private val mPinpoint: PinpointManager by lazy { pinpoint }

        override fun onNewToken(token: String) {
            super.onNewToken(token)

            Log.d(TAG, "Registering push notifications token: ${token}")
            mPinpoint.notificationClient.registerDeviceToken(token)
        }

        override fun onMessageReceived(remoteMessage: RemoteMessage) {
            super.onMessageReceived(remoteMessage)

            val pushResult = mPinpoint.notificationClient.handleCampaignPush(NotificationDetails.builder()
                    .from(remoteMessage.from)
                    .mapData(remoteMessage.data)
                    .intentAction(NotificationClient.FCM_INTENT_ACTION)
                    .build())

            if (NotificationClient.CampaignPushResult.NOT_HANDLED != pushResult) {
                /**
                 * The push message was due to a Pinpoint campaign.
                 * If the app was in the background, a local notification was added
                 * in the notification center. If the app was in the foreground, an
                 * event was recorded indicating the app was in the foreground,
                 * for the demo, we will broadcast the notification to let the main
                 * activity display it in a dialog.
                 */
                if (NotificationClient.CampaignPushResult.APP_IN_FOREGROUND == pushResult) {
                    Log.d(TAG, "Pinpoint Handled in foreground")
                    /* Create a message that will display the raw data of the campaign push in a dialog. */
                    broadcast(remoteMessage.from, HashMap(remoteMessage.data))
                }
            }
        }

        private fun broadcast(from: String?, dataMap: HashMap<String, String>) {
            LocalBroadcastManager.getInstance(this).sendBroadcast(Intent(ACTION_PUSH_NOTIFICATION).apply {
                putExtra(NotificationClient.INTENT_SNS_NOTIFICATION_FROM, from)
                putExtra(NotificationClient.INTENT_SNS_NOTIFICATION_DATA, dataMap)
            })
        }
    }
    ```

3. To create a new campaign to send notifications to your app from the Amazon Pinpoint console run the following command from your app project folder.

    ```bash
    $ amplify notifications console
    ```

4. Provide a campaign name, choose `Next`, choose `Filter by standard attributes`, and then choose `android` as the platform.

5. You should see 1 device as a targeted endpoint, which is the app we are running on the Android device. Choose the option and then choose `Next Step`.

6. Provide text for a sample title and body for push notification, and then choose `Next Step`.

7. Choose `Immediate`, and then choose `Next Step`.

8. Review the details on the screen, and then choose `Launch Campaign`.

9. A notification should appear on the Android device. You may want to try testing your app receiving notifications when it is in the foreground and when closed.

## Next Steps

* [Handling FCM / GCM Push Notifications](./push-notifications-handle-fcm)

* [Handling Amazon Device Messaging Push Notifications](./push-notifications-handle-adm)

* [Handling Baidu Push Notifications](./push-notifications-handle-baidu)
