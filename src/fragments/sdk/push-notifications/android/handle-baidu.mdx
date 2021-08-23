## Handling Baidu Push Notifications

Baidu Cloud Push is the push notification service provided by Baidu, a Chinese cloud service. By integrating Baidu Cloud Push with your mobile app, you can use Amazon Pinpoint to send notifications to your app through the Baidu mobile push channel.

**Prerequisites**

To send push notifications to mobile devices using Amazon Pinpoint and Baidu, you need the following:

* Baidu account.

* Registration as a Baidu developer.

* Baidu Cloud Push project.

* API key and secret key from a Baidu Cloud Push project.

* Baidu user ID and channel ID.

The following procedure is based on version `5.7.1.65` of the Baidu push service jar.

**To integrate Baidu with your app**

Download the latest Baidu Cloud Push SDK Android client from http://push.baidu.com/.

Extract the zip file and import the `pushservice-x.x.xx.jar` file from the `Baidu-Push-SDK-Android` libs folder into your Android app’s lib folder.

The `Baidu-Push-SDK-Android` libs folder should also include the following folders:

* arm64-v8a

* armeabi

* armeabi-v7a

* mips

* mips64

* x86

* x86_64

Add each complete folder to your Android app’s `src/main/jniLibs` folder.

In the Android app’s `AndroidManifest.xml` file, declare the following permissions:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />

<!-- Baidu permissions -->
<uses-permission android:name="android.permission.WAKE_LOCK"/>
<uses-permission android:name="com.google.android.c2dm.permission.RECEIVE" />

<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
<uses-permission android:name="android.permission.WRITE_SETTINGS" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.ACCESS_DOWNLOAD_MANAGER" />
<uses-permission android:name="android.permission.DOWNLOAD_WITHOUT_NOTIFICATION" />
<uses-permission android:name="android.permission.DISABLE_KEYGUARD" />
```

Under `<application>`, specify the following receivers and intent filters:

```xml
<!-- Baidu settings -->
<receiver android:name="com.baidu.android.pushservice.PushServiceReceiver"
          android:process=":bdservice_v1">
  <intent-filter>
    <action android:name="android.intent.action.BOOT_COMPLETED" />
    <action android:name="android.net.conn.CONNECTIVITY_CHANGE" />
    <action android:name="com.baidu.android.pushservice.action.notification.SHOW" />
    <action android:name="com.baidu.android.pushservice.action.media.CLICK" />

    <action android:name="android.intent.action.MEDIA_MOUNTED" />
    <action android:name="android.intent.action.USER_PRESENT" />
    <action android:name="android.intent.action.ACTION_POWER_CONNECTED" />
    <action android:name="android.intent.action.ACTION_POWER_DISCONNECTED" />
  </intent-filter>
</receiver>

<receiver android:name="com.baidu.android.pushservice.RegistrationReceiver"
          android:process=":bdservice_v1">
  <intent-filter>
    <action android:name="com.baidu.android.pushservice.action.METHOD" />
    <action android:name="com.baidu.android.pushservice.action.BIND_SYNC" />
  </intent-filter>
  <intent-filter>
    <action android:name="android.intent.action.PACKAGE_REMOVED" />

    <data android:scheme="package" />
  </intent-filter>
</receiver>

<service android:name="com.baidu.android.pushservice.PushService"
         android:exported="true"
         android:process=":bdservice_v1">
  <intent-filter>
    <action android:name="com.baidu.android.pushservice.action.PUSH_SERVICE" />
  </intent-filter>
</service>
<service android:name="com.baidu.android.pushservice.CommandService"
         android:exported="true" />

<!-- Amazon Pinpoint Notification Receiver -->
<receiver android:name="com.amazonaws.mobileconnectors.pinpoint.targeting.notification.PinpointNotificationReceiver">
  <intent-filter>
  <action android:name="com.amazonaws.intent.baidu.NOTIFICATION_OPEN" />
  </intent-filter>
</receiver>
```

Update the `AndroidManifest.xml` file with the following permissions, which are specific to your application. Remember to replace `<YourPackageName>` with the name of your package.

```xml
<uses-permission android:name="baidu.push.permission.WRITE_PUSHINFOPROVIDER.YourPackageName" />

<permission
    android:name="baidu.push.permission.WRITE_PUSHINFOPROVIDER.YourPackageName"
    android:protectionLevel="normal" />

<provider
    android:name="com.baidu.android.pushservice.PushInfoProvider"
    android:authorities="YourPackageName.bdpush"
    android:exported="true"
    android:protectionLevel="signature"
    android:writePermission="baidu.push.permission.WRITE_PUSHINFOPROVIDER.YourPackageName" />
```

Inside your Android application, create a `MessageReceiver` class that subclasses `com.baidu.android.pushservice.PushMessageReceiver`. The subclass should implement the following methods and perform the corresponding calls:

**`onBind`**

Called when the device is registered with Baidu Cloud Push. Provides the Baidu user ID and channel ID that are needed to register the device with Amazon Pinpoint. Include the following call as part of this method:

```java
pinpointManager.getNotificationClient().registerDeviceToken(userId, channelId);
```

**`onUnbind`**

Called when the device is no longer registered with Baidu Cloud Push.

**`onMessage`**

Called when the device receives a raw message from Baidu Cloud Push. Amazon Pinpoint transmits campaign push notifications with the Baidu Cloud Push raw message format. Include the following call as part of this method:

```java
NotificationDetails details = NotificationDetailsBuilder.builder()
                              .message(message);
                              .intentAction(NotificationClient.BAIDU_INTENT_ACTION)
                              .build();

pinpointManager.getNotificationClient().handleCampaignPush(details)
```

Only the message parameter contains data. The `customContentString` is not used with raw messages.

After creating the subclass, modify the `AndroidManifest.xml` file to register it as a receiver. In the following example, the `PushMessageReceiver` subclass is named `com.baidu.push.example.MyPushMessageReceiver`.

```xml
<receiver android:name="com.baidu.push.example.MyPushMessageReceiver">
  <intent-filter>
    <action android:name="com.baidu.android.pushservice.action.MESSAGE" />
    <action android:name="com.baidu.android.pushservice.action.RECEIVE" />
    <action android:name="com.baidu.android.pushservice.action.notification.CLICK" />
  </intent-filter>
</receiver>
```

To start the Baidu listener service, in your Android app’s main activity, add the following code to the onCreate method:

```java
// ATTENTION：You need to modify the value of api_key to your own !!
PushManager.startWork(getApplicationContext(), PushConstants.LOGIN_TYPE_API_KEY, api_key);

CustomPushNotificationBuilder cBuilder = new CustomPushNotificationBuilder(
  getResources().getIdentifier("notification_custom_builder", "layout", getPackageName()),
  getResources().getIdentifier("notification_icon", "id", getPackageName()),
  getResources().getIdentifier("notification_title", "id", getPackageName()),
  getResources().getIdentifier("notification_text", "id", getPackageName()));
cBuilder.setNotificationFlags(Notification.FLAG_AUTO_CANCEL);
cBuilder.setNotificationDefaults(Notification.DEFAULT_VIBRATE);

cBuilder.setStatusbarIcon(this.getApplicationInfo().icon);
cBuilder.setLayoutDrawable(getResources().getIdentifier(
  "simple_notification_icon", "drawable", getPackageName()));
cBuilder.setNotificationSound(Uri.withAppendedPath(
  Audio.Media.INTERNAL_CONTENT_URI, "6").toString());
PushManager.setNotificationBuilder(this, 1, cBuilder);
```

Remember to properly initialize your `PinpointManager` reference. Use a `PinpointConfiguration` with a `ChannelType` value of `ChannelType.BAIDU`. You can do this programmatically, as in the following example:

```java
final PinpointConfiguration config =
  new PinpointConfiguration(this,
                            IdentityManager.getDefaultIdentityManager()
                            .getCredentialsProvider(),
                            awsConfiguration)
  .withChannelType(ChannelType.BAIDU);
Application.pinpointManager = new PinpointManager(config);
```

Or, you can define a configuration file to be consumed by `AWSConfiguration`:

```
"PinpointAnalytics": {
    "Default": {
      "AppId": "[YourPinpointAppId]",
      "Region": "us-east-1",
      "ChannelType": "BAIDU"
    }
}
```

**Testing Baidu Push Notifications**

To test, you need an Amazon Pinpoint project, a Baidu API key, and a Baidu Secret key.

Before you begin, augment your app to display the device token after registration. The device token can be retrieved by calling:

```java
pinpointManager.getNotificationClient().getDeviceToken()
```

Complete the following steps using the Amplify CLI and Amazon Pinpoint console to test Baidu push notifications.

Run the following command to navigate to the Amazon Pinpoint console.

```bash
amplify console analytics
```

* On the left pane, select `Settings` and `Push notifications`. 
* Click `Edit` and select `Show more push notification services` and click `Baidu Cloud Push`. 
* Enter the `Baidu API Key` and the `Baidu Secret Key` and click `Save` at the right bottom of the page.

Now `Baidu Cloud Push` is registered as a push notification service.

Install your app on to a `Baidu-enabled` device and capture the generated device token.

Send a direct message to the device specifying the device token as the address.

* On the Amazon Pinpoint console, go to `Test messaging`. 
* Select `Push notifications` as the channel. 
* Enter the endpoint ID or the device token in the `Destinations`. 
* Select `Baidu` as the push notifications service. 
* Create a message and click `Send message` at the bottom right corner of the page to send a direct message.
