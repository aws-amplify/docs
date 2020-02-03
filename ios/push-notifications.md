---
title: Push Notifications
---

{% if jekyll.environment == 'production' %}
  {% assign base_dir = site.amplify.docs_baseurl %}
{% endif %}
{% assign image_base = base_dir | append: page.dir | append: "images" %}

# Push Notifications

## Overview

Enable your users to receive mobile push messages sent from the Apple (APNs) and Google (FCM/GCM) platforms. The CLI deploys your push notification backend using [Amazon Pinpoint](http://docs.aws.amazon.com/pinpoint/latest/developerguide/).
You can also create Amazon Pinpoint campaigns that tie user behavior to push or other forms of messaging.

## Pre-requisite

- Enrolled in the Apple Developer Program
- Actual device to run the app on

1. Complete the [Get Started](./start) steps before you proceed.

2. Under the target, select "Signing & Capabilities", make sure the `Bundle Identifier` is unique. Make sure `Automatically manage signing` is enabled and your apple developer team is chosen.

3. Plug in the device and make sure it is registered and there are no errors on this page provisioning the profile.

4. On this page, click on `+ Capability`, and add `Push Notification` and `Background Modes`. For `Background Modes`, have `Remote notifications` checked.

## Set Up Your Backend

1. Set up a new Amplify project, you can skip this step if you are using an existing one.
```
amplify init
```

2. Add analytics to your app and allow guests and unauthenticated users send analytics events.
```
amplify add analytics
```

3. Provision the backend
```
amplify push
```

## Connect to Your Backend

Use the following steps to connect push notification backend services to your app.

1. The `Podfile` that you configure to install the AWS Mobile SDK must contain the `AWSPinpoint` pod:

    ```ruby

    target :'YOUR-APP-NAME' do
      use_frameworks!

        pod  'AWSPinpoint', '~> 2.12.0'
        # other pods
        pod  'AWSMobileClient', '~> 2.12.0'
    end
    ```

    Run `pod install --repo-update` before you continue.

2. Open the `.xcworkspace` file.

3. Make sure the project contains `awsconfiguration.json`. This should be generated from the previous step for setting up the backend. If you used `amplify-tools` to set up your amplify project then this file will already be added to your Xcode project bundle, if you are using the CLI directly, make sure the file is added to your Xcode project by dragging it in with `copy as needed` checked.

4. Make sure the app builds.

5. Add the following import statements to your AppDelegate file:

    ```
    import UserNotifications
    import AWSPinpoint
    ```

6. In the AppDelegate file, inside `application:didFinishLaunchingWithOptions:`, initialize AWS Pinpoint instance and register for push notifications from the user. When the app runs, the user will be prompt with a modal to allow notifications. We recommend you request for authorization from the user during app startup, so your users can begin receiving notifications as early as possible.

```swift
class AppDelegate: UIResponder, UIApplicationDelegate {

    var pinpoint: AWSPinpoint?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

        // Instantiate Pinpoint
        let pinpointConfiguration = AWSPinpointConfiguration.defaultPinpointConfiguration(launchOptions: launchOptions)
        pinpointConfiguration.debug = true // Set debug mode to use APNS sandbox, make sure to toggle for your production app
        pinpoint = AWSPinpoint(configuration: pinpointConfiguration)

        // Present the user with a request to authorize push notifications
        registerForPushNotifications()
        
        return true
    }

    // MARK: Push Notification methods

    func registerForPushNotifications() {
        UNUserNotificationCenter.current()
            .requestAuthorization(options:[.alert, .sound, .badge]) {[weak self] granted, error in
                print("Permission granted: \(granted)")
                guard granted else { return }

                // Only get the notification settings if user has granted permissions
                self?.getNotificationSettings()
        }

    }

    func getNotificationSettings() {
        UNUserNotificationCenter.current().getNotificationSettings { settings in
            print("Notification settings: \(settings)")
            guard settings.authorizationStatus == .authorized else { return }

            DispatchQueue.main.async {
                // Register with Apple Push Notification service
                UIApplication.shared.registerForRemoteNotifications()
            }
        }
    }
}
```

Make sure the app builds and runs, and prompts the user for notification authorization.

7. Add the AppDelegate methods to listen on the callbacks from `UIApplication.shared.registerForRemoteNotifications()`. Either `didRegisterForRemoteNotificationsWithDeviceToken` will be called indicating successfully registering with APNS or `didFailToRegisterForRemoteNotificationsWithError` indicating a failure. On successfully registering with APNS, pass the device token to AWS pinpoint to register the endpoint

```swift
// MARK: Remote Notifications Lifecycle
func application(_ application: UIApplication,
    didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    let tokenParts = deviceToken.map { data in String(format: "%02.2hhx", data) }
    let token = tokenParts.joined()
    print("Device Token: \(token)")

    // Register the device token with Pinpoint as the endpoint for this user
    pinpoint!.notificationManager.interceptDidRegisterForRemoteNotifications(withDeviceToken: deviceToken)
}

func application(_ application: UIApplication,
    didFailToRegisterForRemoteNotificationsWithError error: Error) {
    print("Failed to register: \(error)")
}
```

8. Build and run the app. You should see the device token printed out. 

9. To handle push notifications, add `application:didReceiveRemoteNotification:`. 
```swift
func application(_ application: UIApplication,
                    didReceiveRemoteNotification userInfo: [AnyHashable: Any],
                    fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {

    // if the app is in the foreground, create an alert modal with the contents
    if (application.applicationState == .active) {
        let alert = UIAlertController(title: "Notification Received",
                                        message: userInfo.description,
                                        preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "Ok", style: .default, handler: nil))

        UIApplication.shared.keyWindow?.rootViewController?.present(
            alert, animated: true, completion:nil)
    }

    // Pass this remote notification event to pinpoint SDK to keep track of notifications produced by AWS Pinpoint campaigns.
    pinpoint!.notificationManager.interceptDidReceiveRemoteNotification(
        userInfo, fetchCompletionHandler: completionHandler)
}
```

10. (Optional) Enable verbose logging for AWSPinpoint SDK. The `endpointId` will be printed out when verbose logging is turned on. It will be useful when testing push notification events with AWS Pinpoint campaigns but not required.

Add this to `application:didFinishLaunchingWithOptions:`
```
AWSDDLog.sharedInstance.logLevel = .verbose
AWSDDLog.add(AWSDDTTYLogger.sharedInstance)
```

### Manual Configuration

As an alternative to automatic configuration using the Amplify CLI, you can manually enter the necessary configurations. Here is a snippet of the relevant sections of the `awsconfiguration.json` file:

```json
{
    "Version": "0.1.0",
    "IdentityManager": {
        "Default": {}
    },
    "CredentialsProvider": {
        "CognitoIdentity": {
            "Default": {
                "PoolId": "COGNITO-IDENTITY-POOL-ID",
                "Region": "COGNITO-IDENTITY-POOL-REGION"
            }
        }
    },
    "CognitoUserPool": {
        "Default": {
            "PoolId": "COGNITO-USER-POOL-ID",
            "AppClientId": "COGNITO-USER-APP-CLIENT-ID",
            "AppClientSecret": "COGNITO-USER-POOL-APP-CLIENT-SECRET",
            "Region": "COGNITO-USER-POOL-REGION"
        }
    },
    "PinpointAnalytics": {
        "Default": {
            "AppId": "PINPOINT-APP-ID",
            "Region": "PINPOINT-REGION"
        }
    },
    "PinpointTargeting": {
        "Default": {
            "Region": "PINPOINT-REGION"
        }
    }
}
```

Make the following changes to the configuration file. The values are available in the [AWS Console](https://console.aws.amazon.com).

* **CognitoIdentity**
    * Replace `COGNITO-IDENTITY-POOL-ID` with the identity pool ID.
    * Replace `COGNITO-IDENTITY-POOL-REGION` with the Region the identity pool was created in.
* **CognitoUserPool**
    * Replace `COGNITO-USER-POOL-ID` with the user pool ID.
    * Replace `COGNITO-USER-POOL-REGION` with the Region the user pool was created in.
    * Replace `COGNITO-USER-APP-CLIENT-ID` with the app client id that has access to the user pool.
    * Replace `COGNITO-USER-POOL-APP-CLIENT-SECRET` with the app client secret for the app client id.
    * Replace `COGNITO-USER-POOL-REGION` with the Region the user pool was created in.
* **PinpointAnalytics**
    * Replace `PINPOINT-APP-ID` with the Project Id of the Pinpoint project.
    * Replace `PINPOINT-REGION` with the Region the Pinpoint project was created in.
* **PinpointTargeting**
    * Replace `PINPOINT-REGION` with the Region the Pinpoint project was created in.


## Add Amazon Pinpoint Targeted and Campaign Push Messaging

The [Amazon Pinpoint console](https://console.aws.amazon.com/pinpoint/) enables you to target your app users with push messaging. You can send individual messages or configure campaigns that target a group of users that match a profile that you define.
For instance, you could email users that have not used the app in 30 days, or send an SMS to those that frequently use a given feature of your app.

The following steps show how to send push notifications targeted for your app.

1. Go to https://developer.apple.com/account/ 

2. Under "Certificates, Identifiers & Profiles", on the left side click on "Keys", click +, type in a name like "Push Notification Key", check off Apple Push Notification Service (APNs). Register and download the file. It should be in the format of `AuthKey_<Key ID>.p8`

2. Go to your Membership details page to get the Team ID

3. Open the AWS Pinpoint console with `amplify console analytics`

4. Go to Settings, enable push notifications for APNS, select Key Credentials, and add the Team ID, Key ID, the unique bundle identifier of your app, and select the `AuthKey_<Key ID>.p8` file

5. Go to Campaign, click Create Campaign, provide a campaign name, and select Push Notifications as the channel, and click next.

6. In the segment section, select `Create a segment` and you should see 1 device as a targeted endpoint, which is the app we are running on the device. Choose this option and then choose **Next Step**.

7. Provide text for a sample title and body for push notification, enter the device token or endpoint ID retrieved from the app.

- Make sure the app is in the foreground, click on Test message and you should see an alert modal pop up with your test message wrapped in push notification data.
- Make sure the app is in the background, click on Test message and you should see push notification slide down from the top.


## Campaign Push messaging events

When a user receives an notification and taps on it, the AWS Pinpoint SDK will send a corresponding event that you can filter on in the AWS Pinpoint console.

`_campaign.opened_notification` event will be sent when the notification is opened from an app Inactive or Terminated state.

`_campaign.received_foreground` when the app is received while it is in the foreground

`_campaign.received_background` when the notification is tapped on while the app is in the background 

If the developer never taps on the notification even though it was received on the device, the App will not submit an event for that since there is no way for the App to know that the notification was received by the device.