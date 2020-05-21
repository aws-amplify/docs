To initialize the Amplify Predictions and Authentication categories, we are required to use the `Amplify.add()` method for each category we want.  When we are done calling `add()` on each category, we finish configuring Amplify by calling `Amplify.configure()`.

**Add the following imports** to the top of your `AppDelegate.swift` file:
<!-- TODO update AWSMobileClient -> Auth -->
```swift
import Amplify
import AWSMobileClient
import AWSPredictionsPlugin
```
**Add the following code** to your AppDelegate's `application:didFinishLaunchingWithOptions` method:

<!-- TODO Update AWSMobileClient -> Auth -->
```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    AWSMobileClient.default().initialize { (userState, error) in
        guard error == nil else {
            print("Error initializing AWSMobileClient. Error: \(error!.localizedDescription)")
            return
        }
        print("AWSMobileClient initialized, userstate: \(userState)")
    }

    do {
        try Amplify.add(plugin: AWSPredictionsPlugin())
        try Amplify.configure()
        print("Amplify initialized")
    } catch {
        print("Failed to initialize Amplify with \(error)")
    }

    return true
}
```