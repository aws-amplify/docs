# Add Analytics to Your Mobile App with Amazon Pinpoint

## Pinpoint

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

Set up AWS Mobile SDK components as follows.

1. The `Podfile` that you configure to install the AWS Mobile SDK must contain:

```

platform :ios, '9.0'
target :'YourAppName' do
 use_frameworks!

   pod 'AWSPinpoint', '~> 2.6.13'
   pod 'AWSMobileClient', '~> 2.6.13'

   # other pods

end
```

Run `pod install --repo-update` before you continue.

If you encounter an error message that begins `[!] Failed to connect to GitHub to update the CocoaPods/Specs . . .`, and your internet connectivity is working, you may need to [update openssl and Ruby](https://stackoverflow.com/questions/38993527/cocoapods-failed-to-connect-to-github-to-update-the-cocoapods-specs-specs-repo/48962041#48962041).

2. Classes that call Amazon Pinpoint APIs must use the following import statements:

    ```
    /** start code copy **/
    import AWSCore
    import AWSPinpoint
    import AWSMobileClient
    /** end code copy **/
    ```

3. Replace the return statement with following code into the `application(_:didFinishLaunchingWithOptions:)` method of your app's `AppDelegate.swift`.

    ```swift
    class AppDelegate: UIResponder, UIApplicationDelegate {

       /** start code copy **/
       var pinpoint: AWSPinpoint?
       /** end code copy **/

       func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions:
       [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

            //. . .

            // Initialize Pinpoint
            /** start code copy **/
            pinpoint = AWSPinpoint(configuration:
                AWSPinpointConfiguration.defaultPinpointConfiguration(launchOptions: launchOptions))

            // Create AWSMobileClient to connect with AWS
            return AWSMobileClient.sharedInstance().interceptApplication(application, didFinishLaunchingWithOptions: launchOptions)
            /** end code copy **/
       }
    }
    ```

#### Monitor Analytics

Build and run your app to see usage metrics in Amazon Pinpoint. When you run the previous code samples, the console shows a logged Session.

1. To see visualizations of the analytics coming from your app, open your project in the Amazon Pinpoint console by running the following:

    ```bash
    $ amplify console analytics
    ```

2. Choose `Analytics` from the icons on the left of the console, and view the graphs of your app's usage. It may take up to 15 minutes for metrics to become visible.

    ![getting-started-analytics](images/getting-started-analytics.png)

    [Learn more about Amazon Pinpoint](http://docs.aws.amazon.com/pinpoint/latest/developerguide/welcome.html).

### Enable Custom App Analytics

Instrument your code to capture app usage event information, including attributes you define.  Use graphs of your custom usage event data  in the Amazon Pinpoint console. Visualize how your users' behavior aligns with a model you design using [Amazon Pinpoint Funnel Analytics](https://docs.aws.amazon.com/pinpoint/latest/userguide/analytics-funnels.html), or use [stream the data](https://docs.aws.amazon.com/pinpoint/latest/userguide/analytics-streaming.html) for deeper analysis.

Use the following steps to implement Amazon Pinpoint custom analytics for your app.

```swift
// You can add this function in desired part of your app. It will be used to log events to the backend.
func logEvent() {

   let pinpointAnalyticsClient =
       AWSPinpoint(configuration:
           AWSPinpointConfiguration.defaultPinpointConfiguration(launchOptions: nil)).analyticsClient

   let event = pinpointAnalyticsClient.createEvent(withEventType: "EventName")
   event.addAttribute("DemoAttributeValue1", forKey: "DemoAttribute1")
   event.addAttribute("DemoAttributeValue2", forKey: "DemoAttribute2")
   event.addMetric(NSNumber.init(value: arc4random() % 65535), forKey: "EventName")
   pinpointAnalyticsClient.record(event)
   pinpointAnalyticsClient.submitEvents()

}
```

Build, run, and use your app. Then, view your custom events on the `Events` tab of the Amazon Pinpoint console (choose `Analytics`>`Events`). Look for the name of your event in the `Events` menu.

### Enable Revenue Analytics

Amazon Pinpoint supports the collection of monetization event data. Use the following steps to place
and design analytics related to purchases through your app.

```swift
func sendMonetizationEvent()
 {
     let pinpointClient = AWSPinpoint(configuration:
         AWSPinpointConfiguration.defaultPinpointConfiguration(launchOptions: nil))

     let pinpointAnalyticsClient = pinpointClient.analyticsClient

     let event =
         pinpointAnalyticsClient.createVirtualMonetizationEvent(withProductId:
             "DEMO_PRODUCT_ID", withItemPrice: 1.00, withQuantity: 1, withCurrency: "USD")
     pinpointAnalyticsClient.record(event)
     pinpointAnalyticsClient.submitEvents()
 }
```

## Kinesis
