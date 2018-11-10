---
title: Analytics
---

{% if jekyll.environment == 'production' %}
  {% assign base_dir = site.amplify.docs_baseurl %}
{% endif %}
{% assign image_base = base_dir | append: page.dir | append: "images" %}

# Analytics

Collecting analytics data for your app can be accomplished with [Amazon Pinpoint](#using-amazon-pinpoint) and [Amazon Kinesis](#using-amazon-kinesis).

Prerequisite: [Install and configure the Amplify CLI](https://aws-amplify.github.io/docs/)
Recommendation: [Complete the Getting Started](https://aws-amplify.github.io/docs/ios/start) guide
{: .callout .callout--info}


## Using Amazon Pinpoint

Amazon Pinpoint is a fully managed AWS service that you can use to engage with your customers across multiple messaging channels using analytics captured from the device. You can send push notifications, emails, or text messages (SMS), depending on the purpose of your campaign. Features include:

**Audience Segments** - You can define dynamic segments based on data that's reported by your application, such as operating system or mobile device type. You can also import static segments that you define outside of Amazon Pinpoint.

**Messaging Campaigns** - A campaign sends tailored messages on a schedule that you define. You can create campaigns that send mobile push, email, or SMS messages. To experiment with alternative campaign strategies, set up your campaign as an A/B test, and analyze the results with Amazon Pinpoint analytics.

**Transactional Messages** - Keep your customers informed by sending transactional mobile push and SMS messages—such as new account activation messages, order confirmations, and password reset notifications—to specific users.

**Analyze User Behavior** - You can view trends about your users' level of engagement, purchase activity, and demographics. You can monitor your message traffic with metrics for messages sent and opened. Through the Amazon Pinpoint API, your application can report custom data, which Amazon Pinpoint makes available for analysis.

The Amplify CLI helps setup and configure Pinpoint within your application and connect with the AWS Mobile SDK.

### Set Up Your Backend

1. Complete the [Get Started](https://aws-amplify.github.io/docs/ios/start) steps before you proceed.

2. Use the CLI to add analytics to your cloud-enabled backend and app.

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

```ruby
platform :ios, '9.0'
target 'YourAppName' do
    use_frameworks!

    pod 'AWSPinpoint', '~> 2.7.0'
    pod 'AWSMobileClient', '~> 2.7.0'

    # other pods

end
```

Run `pod install --repo-update` before you continue.

If you encounter an error message that begins `[!] Failed to connect to GitHub to update the CocoaPods/Specs . . .`, and your internet connectivity is working, you may need to [update openssl and Ruby](https://stackoverflow.com/questions/38993527/cocoapods-failed-to-connect-to-github-to-update-the-cocoapods-specs-specs-repo/48962041#48962041).

2. Classes that call Amazon Pinpoint APIs must use the following import statements:

    ```swift
    /** start code copy **/
    import AWSCore
    import AWSPinpoint
    import AWSMobileClient
    /** end code copy **/
    ```

3. To send events with Amazon Pinpoint, you'll instantiate a Pinpoint instance. We recommend you do this during app startup, so you can use Pinpoint to record app launch analytics. Edit the `application(_:didFinishLaunchingWithOptions:)` method of your app's `AppDelegate.swift` by adding a `pinpoint` instance property, and initializing the Pinpoint client as shown below:

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
            let pinpointConfiguration = AWSPinpointConfiguration.defaultPinpointConfiguration(launchOptions: launchOptions)
            pinpoint = AWSPinpoint(configuration: pinpointConfiguration)

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

    ![getting-started-analytics]({{image_base}}/getting-started-analytics.png)

Analytics events can be grouped into segments, and you can engage your users more deeply by tying their app usage behavior to Push Notification, email, or SMS messaging campaigns. Read more about this in the [messaging section](./messaging) or [click here to learn more about Amazon Pinpoint](http://docs.aws.amazon.com/pinpoint/latest/developerguide/welcome.html).

## Reporting Events in Your Application

You can use the Pinpoint SDK to report usage data, or events, to Amazon Pinpoint. You can report events to capture information such as session times, users' purchasing behavior, sign-in attempts, or any custom event type that you need.

After your application reports events, you can view analytics in the Amazon Pinpoint console. The charts on the Analytics page provide metrics for many aspects of user behavior. For more information, see [Chart Reference for Amazon Pinpoint Analytics](https://docs.aws.amazon.com/pinpoint/latest/userguide/analytics-charts.html) in the _Amazon Pinpoint User Guide_.

To analyze and store your event data outside of Amazon Pinpoint, you can configure Amazon Pinpoint to stream the data to Amazon Kinesis. For more information, see [Streaming Amazon Pinpoint Events to Kinesis](https://docs.aws.amazon.com/pinpoint/latest/developerguide/analytics-streaming.html).

By using the AWS Mobile SDKs and the AWS Amplify JavaScript libraries, you can call the Amazon Pinpoint API to report the following types of events:

### Session events

Indicate when and how often users open and close your app.

After your application reports session events, use the **Analytics** page in the Amazon Pinpoint console to view charts for **Sessions, Daily active endpoints, 7-day retention rate**, and more.

These are automatically recorded when you integrate your iOS app with the Pinpoint SDK as shown above.

### Custom events

Are nonstandard events that you define by assigning a custom event type. You can add custom attributes and metrics to a custom event.

On the **Analytics** page in the console, the **Events** tab displays metrics for all custom events that are reported by your app. Use graphs of your custom usage event data in the Amazon Pinpoint console. Visualize how your users' behavior aligns with a model you design using [Amazon Pinpoint Funnel Analytics](https://docs.aws.amazon.com/pinpoint/latest/userguide/analytics-funnels.html), or use [stream the data](https://docs.aws.amazon.com/pinpoint/latest/userguide/analytics-streaming.html) for deeper analysis.

Use the following steps to implement Amazon Pinpoint custom analytics for your app.

```swift
// You can add this function in desired part of your app.
// It will be used to log events to the backend.
func logEvent() {
    if let analyticsClient = pinpoint?.analyticsClient {
        let event = analyticsClient.createEvent(withEventType: "EventName")
        event.addAttribute("DemoAttributeValue1", forKey: "DemoAttribute1")
        event.addAttribute("DemoAttributeValue2", forKey: "DemoAttribute2")
        event.addMetric(NSNumber(value: arc4random() % 65535), forKey: "EventName")
        analyticsClient.record(event)
        analyticsClient.submitEvents()
    }
}
```

Build, run, and use your app. Then, view your custom events on the `Events` tab of the Amazon Pinpoint console (choose `Analytics`>`Events`). Look for the name of your event in the `Events` menu.

### Monetization events

Report the revenue that's generated by your application and the number of items that are purchased by users.

On the **Analytics** page, the **Revenue** tab displays charts for **Revenue, Paying users, Units sold**, and more.

Use the following steps to implement Amazon Pinpoint monetization analytics for your app.

```swift
func sendMonetizationEvent() {
    if let analyticsClient = pinpoint?.analyticsClient {
        let event = analyticsClient.createVirtualMonetizationEvent(
            withProductId: "DEMO_PRODUCT_ID",
            withItemPrice: 1.00,
            withQuantity: 1,
            withCurrency: "USD"
        )
        analyticsClient.record(event)
        analyticsClient.submitEvents()
    }
}
```

### Authentication events

Indicate how frequently users authenticate with your application.

On the **Analytics** page, the **Users** tab displays charts for **Sign-ins, Sign-ups, and Authentication failures**.

To learn how frequently users authenticate with your app, update your application code so that Amazon Pinpoint receives the following standard event types for authentication:

* `_userauth.sign_in`
* `_userauth.sign_up`
* `_userauth.auth_fail`

You can report authentication events by doing either of the following:

* Managing user sign-up and sign-in with Amazon Cognito user pools.

    Amazon Cognito user pools are user directories that make it easier to add sign-up and sign-in to your app. As users authenticate with your app, Amazon Cognito reports authentication events to Amazon Pinpoint. For more information, see [Using Amazon Pinpoint Analytics with Amazon Cognito User Pools](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-pinpoint-integration.html) in the _Amazon Cognito Developer Guide_.

* Reporting authentication events by using the Amazon Pinpoint client that's provided by the AWS Mobile SDK for iOS or Android.

    If you don't want to use Amazon Cognito user pools, you can use the Amazon Pinpoint client to record and submit authentication events, as shown in the following examples. In these examples, the event type is set to `_userauth.sign_in`, but you can substitute any authentication event type.

    ```swift
    func sendUserSignInEvent() {
        if let analyticsClient = pinpoint?.analyticsClient {
            let event = analyticsClient.createEventWithEventType("_userauth.sign_in")
            analyticsClient.record(event)
            analyticsClient.submitEvents()
        }
    }
    ```

## Registering Endpoints in Your Application

When a user starts a session (for example, by launching your mobile app), your mobile or web application can automatically register (or update) an _endpoint_ with Amazon Pinpoint. The endpoint represents the device that the user starts the session with. It includes attributes that describe the device, and it can also include custom attributes that you define. Endpoints can also represent other methods of communicating with customers, such as email addresses or mobile phone numbers.

After your application registers endpoints, you can segment your audience based on endpoint attributes. You can then engage these segments with tailored messaging campaigns. You can also use the **Analytics** page in the Amazon Pinpoint console to view charts about endpoint registration and activity, such as **New endpoints** and **Daily active endpoints**.

You can assign a single user ID to multiple endpoints. A user ID represents a single user, while each endpoint that is assigned the user ID represents one of the user's devices. After you assign user IDs to your endpoints, you can view charts about user activity in the console, such as **Daily active users** and **Monthly active users**.

### Adding Custom Endpoint Attributes

After you initialize the Amazon Pinpoint client in your application, you can add custom attributes to endpoints.

```swift
// Add a custom attribute to the endpoint
if let targetingClient = pinpoint?.targetingClient {
    targetingClient.addAttribute(["science", "politics", "travel"], forKey: "interests")
    targetingClient.updateEndpointProfile()
    let endpointId = targetingClient.currentEndpointProfile().endpointId
    print("Updated custom attributes for endpoint: \(endpointId)")
}
```

### Assigning User IDs to Endpoints

Assign user IDs to endpoints by doing either of the following:

* Manage user sign-up and sign-in with Amazon Cognito user pools.
* Use the Amazon Pinpoint client to assign user IDs without using Amazon Cognito user pools.

Amazon Cognito user pools are user directories that make it easier to add sign-up and sign-in to your app. When the AWS Mobile SDKs for iOS and Android register an endpoint with Amazon Pinpoint, Amazon Cognito automatically assigns a user ID from the user pool. For more information, see [Using Amazon Pinpoint Analytics with Amazon Cognito User Pools](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-pinpoint-integration.html) in the _Amazon Cognito Developer Guide_.

If you don't want to use Amazon Cognito user pools, you can use the Amazon Pinpoint client in your application to assign user IDs to endpoints.

```swift
if let targetingClient = pinpoint?.targetingClient {
    let endpoint = targetingClient.currentEndpointProfile()
    // Create a user and set its userId property
    let user = AWSPinpointEndpointProfileUser()
    user.userId = "UserIdValue"
    // Assign the user to the endpoint
    endpoint.user = user
    // Update the endpoint with the targeting client
    targetingClient.update(endpoint)
    print("Assigned user ID \(user.userId ?? "nil") to endpoint \(endpoint.endpointId)")
}
```

## Using Amazon Kinesis

The two classes `AWSKinesisRecorder` and `AWSFirehoseRecorder` allow you to interface with Amazon Kinesis and Amazon Kinesis Firehose to stream analytics data for real-time processing.

### What is Amazon Kinesis?

[Amazon Kinesis](http://aws.amazon.com/kinesis/) is a fully managed service for real-time processing of streaming data at massive scale. Amazon Kinesis can collect and process hundreds of terabytes of data per hour from hundreds of thousands of sources, so you can write applications that process information in real-time. With Amazon Kinesis applications, you can build real-time dashboards, capture exceptions and generate alerts, drive recommendations, and make other real-time business or operational decisions. You can also easily send data to other services such as Amazon Simple Storage Service, Amazon DynamoDB, and Amazon Redshift.

The Amazon Kinesis `AWSKinesisRecorder` client lets you store [PutRecord](http://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecord.html) requests on disk and then send them all at once. This is useful because many mobile applications that use Amazon Kinesis will create multiple `PutRecord` requests per second. Sending an individual request for each `PutRecord` action could adversely impact battery life. Moreover, the requests could be lost if the device goes offline. Thus, using the high-level Amazon Kinesis client for batching can preserve both battery life and data.

### What is Amazon Kinesis Firehose?

[Amazon Kinesis Firehose](http://aws.amazon.com/kinesis/firehose/) is a fully managed service for delivering real-time streaming data to destinations such as Amazon Simple Storage Service (Amazon S3) and Amazon Redshift. With Firehose, you do not need to write any applications or manage any resources. You configure your data producers to send data to Firehose and it automatically delivers the data to the destination that you specified.

The Amazon Kinesis Firehose `AWSFirehoseRecorder` client lets you store [PutRecords](http://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecords.html) requests on disk and then send them using Kinesis Data Firehose`PutRecordBatch`.

For more information about Amazon Kinesis Firehose, see [Amazon Kinesis Firehose](http://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html).

### Integrating Amazon Kinesis and Amazon Kinesis Firehose

Add the following to your `Podfile`:

```ruby
pod 'AWSKinesis', '~> 2.7.0'
```

The instructions direct you to import the headers for the services you'll be using. For this example, you need the following import.

```swift
import AWSKinesis
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

Once you have credentials, you can use `AWSKinesisRecorder` with Amazon Kinesis. The following snippet returns a shared instance of the Amazon Kinesis service client:

```swift
let kinesisRecorder = AWSKinesisRecorder.default()
```

You can use `AWSFirehoseRecorder` with Amazon Kinesis Firehose. The following snippet returns a shared instance of the Amazon Kinesis Firehose service client:

```swift
let firehoseRecorder = AWSFirehoseRecorder.default()
```

Configure Kinesis:

You can configure `AWSKinesisRecorder` or `AWSFirehoseRecorder` through their properties:

```swift
kinesisRecorder.diskAgeLimit = TimeInterval(30 * 24 * 60 * 60); // 30 days
kinesisRecorder.diskByteLimit = UInt(10 * 1024 * 1024); // 10MB
kinesisRecorder.notificationByteThreshold = UInt(5 * 1024 * 1024); // 5MB
```

The `diskAgeLimit` property sets the expiration for cached requests. When a request exceeds the limit, it's discarded. The default is no age limit. The `diskByteLimit` property holds the limit of the disk cache size in bytes. If the storage limit is exceeded, older requests are discarded. The default value is 5 MB. Setting the value to 0 means that there's no practical limit. The `notficationByteThreshold` property sets the point beyond which Kinesis issues a notification that the byte threshold has been reached. The default value is 0, meaning that by default Amazon Kinesis doesn't post the notification.

To see how much local storage is being used for Amazon Kinesis `PutRecord` requests, check the `diskBytesUsed` property.

With `AWSKinesisRecorder` created and configured, you can use `saveRecord()` to save records to local storage.

```swift
let yourData = "Test_data".data(using: .utf8)
kinesisRecorder.saveRecord(
    yourData, 
    streamName: "YourStreamName")
```

In the preceding example, we create an NSData object and save it locally. `YourStreamName` should be a string corresponding to the name of your Kinesis stream. You can create new streams in the [Amazon Kinesis console](https://console.aws.amazon.com/kinesis/).

Here is a similar snippet for Amazon Kinesis Firehose:

```swift
let yourData = "Test_data".data(using: .utf8)
firehoseRecorder.saveRecord(
    yourData,
    streamName: "YourStreamName")
```

To submit all the records stored on the device, call `submitAllRecords`.

```swift
kinesisRecorder.submitAllRecords()
firehoseRecorder.submitAllRecords()
```

`submitAllRecords` sends all locally saved requests to the Amazon Kinesis service. Requests that are successfully sent will be deleted from the device. Requests that fail because the device is offline will be kept and submitted later. Invalid requests are deleted.

Both `saveRecord` and `submitAllRecords` are asynchronous operations, so you should ensure that `saveRecord` is complete before you invoke `submitAllRecords`. The following code sample shows the methods used correctly together.

```swift
// Create an array to store a batch of objects.
var tasks = Array<AWSTask<AnyObject>>()
for i in 0...100 {
    tasks.append(kinesisRecorder!.saveRecord(String(format: "TestString-%02d", i).data(using: .utf8), streamName: "YourStreamName")!)
}

AWSTask(forCompletionOfAllTasks: tasks).continueOnSuccessWith(block: { (task:AWSTask<AnyObject>) -> AWSTask<AnyObject>? in
    return kinesisRecorder?.submitAllRecords()
}).continueWith(block: { (task:AWSTask<AnyObject>) -> Any? in
    if let error = task.error as? NSError {
        print("Error: \(error)")
    }
    return nil
})
```

To learn more about working with Amazon Kinesis, see the [Amazon Kinesis Developer Resources](http://aws.amazon.com/kinesis/developer-resources/).

To learn more about the Amazon Kinesis classes, see the [class reference for AWSKinesisRecorder](https://aws-amplify.github.io/aws-sdk-ios/docs/reference/Classes/AWSKinesisRecorder.html).

To learn more about the Amazon Kinesis Firehose classes, see the [class reference for AWSFirehoseRecorder](https://aws-amplify.github.io/aws-sdk-ios/docs/reference/Classes/AWSFirehoseRecorder.html).
