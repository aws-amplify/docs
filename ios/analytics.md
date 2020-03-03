<br />

**Note**
This guide shows how to build an app using our Amplify Libraries for iOS (Preview) and the Amplify CLI toolchain.
To use the existing AWS Mobile SDK for iOS instead, [click here.](/sdk/ios/analytics)
{: .callout .callout--warning}


# Analytics

The Analytics category enables you to collect analytics data for your application. It comes with built-in support for [Amazon Pinpoint](#using-amazon-pinpoint), but its extensible interface allows it to be extended to target any cloud provider's backend

## Set up your backend

**Prerequisites:**
* An iOS project targeting at least iOS 11.0.
* Install and configure the Amplify CLI

```terminal
$ npm install -g @aws-amplify/cli
$ amplify configure
```

**Steps**

Go to your project directory and run the following commands to get a fully functioning backend with the Analytics category:


Run `amplify init` command as shown:

```terminal
$ amplify init
? Enter a name for the project AmplifyAnalytics
? Enter a name for the environment dev
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building ios
? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use default
```


Add analytics using the command `amplify add analytics`. Here is an example:

```perl
? Provide your pinpoint resource name: `pinpointResourceName`
Adding analytics would add the Auth category to the project if not already added.
? Apps need authorization to send analytics events. Do you want to allow guests and unauthenticated users to send analytics events? (we recommend you allow this when getting 
started) `Yes`
```
    
Push your changes to the cloud using the push command.
```terminal
$ amplify push
```
    
When your backend is successfully updated, there should be two newly created files: `amplifyconfiguration.json` and `awsconfiguration.json` in your project folder.

Optional: Run `amplify console analytics` to open the AWS Pinpoint console in a web browser to view your cloud resources.

## Install Amplify libraries

If this is a new project, run `pod init` to create the `Podfile` to use CocoaPods to manage your dependencies. Add the following to the `Podfile`

```ruby
    target :'YOUR-APP-NAME' do
        use_frameworks!
        pod 'AmplifyPlugins/AWSPinpointAnalyticsPlugin'
        pod 'AWSMobileClient', '~> 2.12.0'
    end
```

Close out of the existing Xcode project if you have it open.

Install the dependencies via CocoaPods
```ruby
$ pod install --repo-update
```

Open the `.xcworkspace` file created by CocoaPods
```ruby
$ open <YOURAPP>.xcworkspace
```

## Add Configuration Files

1. Open the finder of your project and drag the `amplifyconfiguration.json` and `awsconfiguration.json` over to the Xcode window, under the workspace. 
2. Enable `Copy items if needed` if not already enabled
3. For "Added folders", have `Create groups` selected. 
4. For "Add to targets", make sure the app target is checked off.
5. Build (`CMD+B`) the app 

## Initialize Amplify

Initialize `AWSMobileClient`, `Amplify`, and `AWSPinpointAnalyticsPlugin`.

Add the following imports to the top of your `AppDelegate.swift` file:

```swift
import Amplify
import AWSMobileClient
import AmplifyPlugins
```

Add the following code to your AppDelegate's `application:didFinishLaunchingWithOptions` method

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
// Override point for customization after application launch.
    AWSMobileClient.default().initialize { (userState, error) in
        guard error == nil else {
            print("Error initializing AWSMobileClient. Error: \(error!.localizedDescription)")
            return
        }
        print("AWSMobileClient initialized, userstate: \(userState)")
    }

    let analyticsPlugin = AWSPinpointAnalyticsPlugin()
    do {
        try Amplify.add(plugin: analyticsPlugin)
        try Amplify.configure()
        print("Amplify configured with analytics plugin")
    } catch {
        print("Failed to initialize Amplify with \(error)")
    }
    return true
}
```

## Use cases

The AWSPinpointAnalyticsPlugin provides APIs do the following

1. Identify the user.
2. Automatically track app sessions when the user leaves and enters the app. 
3. Record app events which can be viewed through the Pinpoint console.

The following examples assumes you have followed the steps to initialize Amplify and configure it with Analytics.

### Identify User

This call sends information that you have specified about the user to Pinpoint. This could be an unauthenticated or an authenticated user. AWSMobileClient assigns all users an `identityId` that can be used to call `Amplify.Analytics.identifyUser` with. If you have asked for location access and got the user's location information, you can also provide that in `AnalyticsUserProfile.Location`.


```swift
func identifyUser() {
    let userState = AWSMobileClient.default().currentUserState
    let getIdentityIdTask = AWSMobileClient.default().getIdentityId()
    getIdentityIdTask.continueWith { (task) -> Any? in
        if let error = task.error {
            print("Failed to get identityId: \(error)")
        }

        guard let identityId = task.result else {
            print("Missing identityId")
            return nil
        }

        print("Got identityId: \(identityId). UserState: \(userState)")
        let location = AnalyticsUserProfile.Location(latitude: 47.606209,
                                                        longitude: -122.332069,
                                                        postalCode: "98122",
                                                        city: "Seattle",
                                                        region: "WA",
                                                        country: "USA")
        let properties = ["userState": "\(userState)"]
        let userProfile = AnalyticsUserProfile(name: "name",
                                                email: "name@email.com",
                                                location: location,
                                                properties: properties)
        Amplify.Analytics.identifyUser(identityId as String, withProfile: userProfile)

        return nil
    }
}
```

### App Session Tracking

The Amplify analytics plugin records when an application opens and closes. This session information can be viewed either from your local computer's terminal or the AWS Console for Pinpoint.

To view this information in the terminal, run:

```ruby
amplify console analytics
```

To view this from the AWS Console for pinpoint:

1. Navigate to the AWS Console for Pinpoint.
2. Under Analytics, click on Events. 
3. Enable filters, you can select `Session Start` and `Session Stop` events to filter on session events.

### Record Event

The Amplify Analytics plugin also makes it easy to record custom events within the app. The plugin handles retry logic in the event the device looses network connectivity and automatically batches requests to reduce network bandwidth.

```swift
func recordEvents() {
    let properties = ["eventPropertyStringKey": "eventProperyStringValue",
                      "eventPropertyIntKey": 123,
                      "eventPropertyDoubleKey": 12.34,
                      "eventPropertyBoolKey": true] as [String: AnalyticsPropertyValue]
    let event = BasicAnalyticsEvent("eventName", properties: properties)
    Amplify.Analytics.record(event: event)

    // Plugin will automatically flush events. 
    // You do not have to do this in the app code.
    Amplify.Analytics.flushEvents() 
}
```

### Global Properties

You can register properties which will be used across all `Amplify.Analytics.record`.

```swift
let globalProperties = ["globalPropertyKey": "value"] as [String: AnalyticsPropertyValue]
Amplify.Analytics.registerGlobalProperties(globalProperties)
```

To unregister all global properties, simply call `Amplify.Analytics.unregisterGlobalProperties()` or to unregister a single property, use
```swift
Amplify.Analytics.unregisterGlobalProperties(["globalPropertyKey"])
```

### Flush Events

Events have default configuration to flush out to the network every 60 seconds. If you would like to change this, update `amplifyconfiguration.json` with the value you would like for `autoFlushEventsInterval` like so
```json
{
    "UserAgent": "aws-amplify-cli/2.0",
    "Version": "1.0",
    "analytics": {
        "plugins": {
            "awsPinpointAnalyticsPlugin": {
                "pinpointAnalytics": {
                    "appId": "AppID",
                    "region": "Region"
                },
                "pinpointTargeting": {
                    "region": "Region"
                },
                "autoFlushEventsInterval": 60
            }
        }
    }
}
```
If you do set `autoFlushEventsInterval` to 0, you are responsible for calling `Amplify..flushEvents()` to flush events.

### Disable Analytics

To disable analytics, call:
```swift
Amplify.Analytics.disable()
```

To re-enable analytics, call:
```swift
Amplify.Analytics.enable()
```

## Escape Hatch

For advanced use cases where Amplify does not provide the functionality, you can retrieve the escape hatch to access AWSPinpoint instance.

Add `import AmplifyPlugins` and then the following code:

```swift
 func getEscapeHatch() throws {
    let plugin = try Amplify.Analytics.getPlugin(for: "awsPinpointAnalyticsPlugin")
    guard let pinpointAnalyticsPlugin = plugin as? AWSPinpointAnalyticsPlugin else {
        XCTFail("Could not get plugin of type AWSPinpointAnalyticsPlugin")
        return
    }
    let awsPinpoint = pinpointAnalyticsPlugin.getEscapeHatch()
    XCTAssertNotNil(awsPinpoint)
}
```

