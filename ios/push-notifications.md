# Push Notifications

## Overview

Enable your users to receive mobile push messages sent from the Apple (APNs) and Google (FCM/GCM) platforms. The CLI deploys your push notification backend using [Amazon Pinpoint](http://docs.aws.amazon.com/pinpoint/latest/developerguide/).
You can also create Amazon Pinpoint campaigns that tie user behavior to push or other forms of messaging.

## Set Up Your Backend

1. Complete the [Get Started](./getting-started) steps before you proceed.

2. Use the CLI to add storage to your cloud-enabled backend and app.

    In a terminal window, navigate to your project folder (the folder that typically contains your project level `xcodeproj` file), and add the SDK to your app.

    ```bash
    $ cd ./YOUR_PROJECT_FOLDER
    $ amplify add notifications
    ```

3. Set up your backend to support receiving push notifications:

    - Choose Apple Push Notification Service (APNs).

       ```
       > APNS
       ```

    - Choose Certificate as your authentication method.

       ```
       > Certificate
       ```

    - Provide the path to your P12 certificate. For information on creating your APNs certificate, see [Setting Up iOS Push Notifications](http://docs.aws.amazon.com/pinpoint/latest/developerguide/apns-setup.html).

   Use the steps in the next section to connect your app to your backend.


## Connect to Your Backend

Use the following steps to connect add push notification backend services to your app.

1. `Podfile` that you configure to install the AWS Mobile SDK must contain:

	```ruby
    platform :ios, '9.0'

    target :'YOUR-APP-NAME' do
      use_frameworks!

        pod  'AWSPinpoint', '~> 2.6.13'
        # other pods

    end
	```

	Run `pod install --repo-update` before you continue.

	If you encounter an error message that begins `[!] Failed to connect to GitHub to update the CocoaPods/Specs . . .`, and your internet connectivity is working, you may need to [update openssl and Ruby](https://stackoverflow.com/questions/38993527/cocoapods-failed-to-connect-to-github-to-update-the-cocoapods-specs-specs-repo/48962041#48962041).

2. Classes that call Amazon Pinpoint APIs must use the following import statements:

	```
	import AWSCore
	import AWSPinpoint
	```

3. Create an Amazon Pinpoint client by using the following code into the
         `didFinishLaunchwithOptions` method of your app's `AppDelegate.swift`. This
         will also register your device token with Amazon Pinpoint.

         Note: If you have already integrated `Analytics`, you can skip this step.

         ```swift
             /** start code copy **/
             var pinpoint: AWSPinpoint?
             /** end code copy **/


             func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions:
                 [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

                 /** start code copy **/
                 pinpoint = AWSPinpoint(configuration:
                         AWSPinpointConfiguration.defaultPinpointConfiguration(launchOptions: launchOptions))
                 /** end code copy **/

                 return true
             }
             ```

## Add Amazon Pinpoint Targeted and Campaign Push Messaging

The [Amazon Pinpoint console](https://console.aws.amazon.com/pinpoint/) enables you to target your app users with push messaging. You can send individual messages or configure campaigns that target a group of users that match a profile that you define.
For instance, you could email users that have not used the app in 30 days, or send an SMS to those that frequently use a given feature of your app.

The following steps show how to receive push notifications targeted for your app.

1. In your `AppDelegate` with `PinpointManager` instantiated, make sure the push
         listening code exists in the following functions.

    ```swift

    // . . . other app delegate methods

     func application(
         _ application: UIApplication,
                        didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {

             pinpoint!.notificationManager.interceptDidRegisterForRemoteNotifications(
                     withDeviceToken: deviceToken)
     }

     func application(
         _ application: UIApplication,
                        didReceiveRemoteNotification userInfo: [AnyHashable: Any],
                        fetchCompletionHandler completionHandler:
                             @escaping (UIBackgroundFetchResult) -> Void) {

             pinpoint!.notificationManager.interceptDidReceiveRemoteNotification(
                     userInfo, fetchCompletionHandler: completionHandler)

         if (application.applicationState == .active) {
             let alert = UIAlertController(title: "Notification Received",
                                           message: userInfo.description,
                                           preferredStyle: .alert)
             alert.addAction(UIAlertAction(title: "Ok", style: .default, handler: nil))

             UIApplication.shared.keyWindow?.rootViewController?.present(
                 alert, animated: true, completion:nil)
         }
     }

    // . . . other app delegate methods
    }
    ```

> If you already have push notification delegate methods, you can just add the `interceptDidRegisterForRemoteNotifications` and `interceptDidReceiveRemoteNotification` callbacks to Pinpoint client.

2. Add the following code in the `ViewController` where you want to request notification permissions. Adding this code will prompt the end user to give permissions for receiving push notifications.

```swift

             var userNotificationTypes : UIUserNotificationType
             userNotificationTypes = [.alert , .badge , .sound]
             let notificationSettings = UIUserNotificationSettings.init(types: userNotificationTypes, categories: nil)
             UIApplication.shared.registerUserNotificationSettings(notificationSettings)
             UIApplication.shared.registerForRemoteNotifications()
```

3. In Xcode Project Navigator, choose your app name at the top, choose your app name under `Targets`, choose the `Capabilities` tab, and then turn on `Push Notifications`.

    ![Image of turning on Push Notifications capabilities in Xcode](images/xcode-turn-on-push-notification.png)

4. Configure the app to run in the `Release` profile instead of the default `Debug` profile. Perform the following steps to get a notification to the device:

    1. For your app target, go to the `General` tab of project configuration and make sure `Automatically Manage Signing` check box is not selected.

    2. In the `Signing(Release)` section, choose the production provisioning profile you created on Apple developer console. For testing push notifications on a device, you will need an [Ad Hoc Provisioining Profile](https://help.apple.com/xcode/mac/current/#/dev4335bfd3d) configured with a Production AppStore and Ad Hoc certificate, and with the device(s) to be used for testing.

    3. In the top left corner of Xcode (where your app name is displayed next to the current build target device), choose on your app name and then select `Edit Scheme`, and then set `Build configuration` to `Release`

    Run your app on an iPhone device to test. Push notifications are not supported on simulators.

    4. Xcode will give an error that it could not run the app, this is due to production profile apps not being allowed to debug. Click `Ok` and launch the app directly from the device.

    5. When prompted, chose to allow notifications for the device.

    6. To create a new campaign to send notifications to your app from the Amazon Pinpoint console run the following command from your app project folder.

    ```bash
       $ cd YOUR_APP_PROJECT_FOLDER
       $ amplify notifications console
    ```

    7. Provide a campaign name, choose `Next`, choose `Filter by standard attributes`, and then choose iOS as the platform.

    8. You should see 1 device as a targeted endpoint, which is the app we are running on the iPhone device. Choose the option and then choose `Next Step`.

    9. Provide text for a sample title and body for push notification, and then choose `Next Step`.

    10. Choose `Immediate`, and then choose `Next Step`.

    11. Review the details on the screen, and then choose `Launch Campaign`.

    12. A notification should appear on the iPhone device. You may want to try testing your app receiving notifications when it is in the foreground and when closed.
