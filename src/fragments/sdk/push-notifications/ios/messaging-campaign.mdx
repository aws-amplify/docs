The [Amazon Pinpoint console](https://console.aws.amazon.com/pinpoint/) enables you to target your app users with push messaging. You can send individual messages or configure campaigns that target a group of users that match a profile that you define.
For instance, you could email users that have not used the app in 30 days, or send an SMS to those that frequently use a given feature of your app.

The following steps show how to receive push notifications targeted for your app.

1. To receive Amazon Pinpoint push notification to your app, you'll use `pinpoint.notificationManager` to intercept the registration of the app for notifications in the [`application(_:didRegisterForRemoteNotificationsWithDeviceToken:)`](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1622958-application) application call back in AppDelegate.

    Then add and call a function like [`registerForPushNotifications()`](https://developer.apple.com/documentation/uikit/uiapplication/1623078-registerforremotenotifications) to prompt permission from the user for the app to use notifications. The following example uses the [`UNUserNotificationCenter`](https://developer.apple.com/documentation/usernotifications/unusernotificationcenter) framework, which is available in iOS 10.0+. Choose the right location in your app to prompt the user for permissions. In the following example the call is implemented in the [`application(_:didFinishLaunchingWithOptions:)`](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1622921-application) event in AppDelegate. This causes the prompt to appear when the app launches.

    ```swift
    import UserNotifications

    // Other imports...

    class AppDelegate: UIResponder, UIApplicationDelegate {

        // Other app delegate methods...
        func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
            // Other didFinishLaunching code, including Pinpoint initialization...

            registerForPushNotifications()

            // Other didFinishLaunching code...
        }

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

        // Request user to grant permissions for the app to use notifications
        func registerForPushNotifications() {
            UNUserNotificationCenter.current().delegate = self
            UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) {
                (granted, error) in
                print("Permission granted: \(granted)")
                // 1. Check if permission granted
                guard granted else { return }
                // 2. Attempt registration for remote notifications on the main thread
                DispatchQueue.main.async {
                    UIApplication.shared.registerForRemoteNotifications()
                }
            }
        }

        // Other app delegate methods...
    }
    ```

    **Note**: If you already have push notification delegate methods, you can just add the [`interceptDidRegisterForRemoteNotificationsWithDeviceToken:`](https://aws-amplify.github.io/aws-sdk-ios/docs/reference/AWSPinpoint/Classes/AWSPinpointNotificationManager.html#/c:objc(cs)AWSPinpointNotificationManager(im)interceptDidRegisterForRemoteNotificationsWithDeviceToken:) and [`interceptDidReceiveRemoteNotification:fetchCompletionHandler:`](https://aws-amplify.github.io/aws-sdk-ios/docs/reference/AWSPinpoint/Classes/AWSPinpointNotificationManager.html#/c:objc(cs)AWSPinpointNotificationManager(im)interceptDidReceiveRemoteNotification:fetchCompletionHandler:) callbacks to Pinpoint client.

1. In Xcode Project Navigator, choose your app name at the top, choose your app name under **Targets**, choose the **Capabilities** tab, and then turn on **Push Notifications**.

1. Configure the app to run in the **Release** profile instead of the default **Debug** profile. Perform the following steps to get a notification to the device:

    1. For your app target, go to the **General** tab of project configuration and make sure **Automatically Manage Signing** check box is not selected.

    1. In the **Signing (Release)** section, choose the production provisioning profile you created on Apple developer console. For testing push notifications on a device, you will need an [Ad Hoc Provisioning Profile](https://help.apple.com/xcode/mac/current/#/dev4335bfd3d) configured with a Production AppStore and Ad Hoc certificate, and with the device(s) to be used for testing.

    1. In the top left corner of Xcode (where your app name is displayed next to the current build target device), choose on your app name and then select **Edit Scheme**, and then set **Build configuration** to **Release**

        **Note**: Run your app on an iPhone device to test. Push notifications are not supported on simulators.

    1. Xcode will give an error that it could not run the app, this is due to production profile apps not being allowed to debug. Click **Ok** and launch the app directly from the device.

    1. When prompted, chose to allow notifications for the device.

    1. To create a new campaign to send notifications to your app from the Amazon Pinpoint console run the following command from your app project folder.

        ```bash
        cd YOUR_APP_PROJECT_FOLDER
        amplify notifications console
        ```

    1. Provide a campaign name, choose **Next**, choose **Filter by standard attributes**, and then choose iOS as the platform.

    1. You should see 1 device as a targeted endpoint, which is the app we are running on the iPhone device. Choose the option and then choose **Next Step**.

    1. Provide text for a sample title and body for push notification, and then choose **Next Step**.

    1. Choose **Immediate**, and then choose **Next Step**.

    1. Review the details on the screen, and then choose **Launch Campaign**.

    1. A notification should appear on your iPhone. You may want to try testing push notifications when your app is in the foreground as well as when it is closed.
