## Application Setup

When your backend is successfully updated there will be two newly created files: `amplifyconfiguration.json` and `awsconfiguration.json` in your project folder. The former is used for Amplify Library, while the latter is used for the underlying AWS iOS SDK.

### Cocoapods

> iOS project targeting at least iOS 11.0

If this is a new project, run `pod init` to create a `Podfile` for use with CocoaPods to manage your dependencies. 

Add the following to your `Podfile`:

```ruby
target :'YOUR-APP-NAME' do
  use_frameworks!
  pod 'AmplifyPlugins/AWSPinpointAnalyticsPlugin'
  pod 'AWSMobileClient'
end
```

Close out of the existing Xcode project if you have it open.

Install the dependencies via CocoaPods by running the following command:

```bash
pod install --repo-update
```

Open the `.xcworkspace` file created by CocoaPods:

```ruby
open <YOURAPP>.xcworkspace
# or
xed .
```

### Add Configuration Files

1. Open the finder of your project and drag both `amplifyconfiguration.json` and `awsconfiguration.json` files into your Xcode window, under the workspace. 
2. Enable `Copy items if needed` if not already checked
3. For "Added folders", have `Create groups` selected. 
4. For "Add to targets", make sure the app target is checked off.
5. Build (`CMD+B`) the app 

### Initialize Amplify

Initialize `AWSMobileClient`, `Amplify`, and `AWSPinpointAnalyticsPlugin`.

**Step 1:** Add the following imports to the top of your `AppDelegate.swift` file:

```swift
import Amplify
import AmplifyPlugins
import AWSMobileClient
```

**Step 2:** Add the following code to your AppDelegate's `application:didFinishLaunchingWithOptions` method:

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

    do {
        try Amplify.add(plugin: AWSPinpointAnalyticsPlugin())
        try Amplify.configure()
        print("Amplify configured with analytics plugin")
    } catch {
        print("Failed to initialize Amplify with \(error)")
    }
    return true
}
```
