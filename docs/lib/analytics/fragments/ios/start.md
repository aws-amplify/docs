When your backend is successfully updated, there should be two newly created files: `amplifyconfiguration.json` and `awsconfiguration.json` in your project folder.

## Install Amplify libraries

> iOS project targeting at least iOS 11.0

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

## API Reference

For a complete API reference visit the API Reference

## Using a custom plugin

You can create your custom pluggable for Analytics. This may be helpful if you want to integrate your app with a custom analytics backend.

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