To initialize the Amplify Auth category, pass in the AWSCognitoAuthPlugin to 'Amplify.add()'.  When we are done calling `add()` on each category that we need, we finish configuring Amplify by calling `Amplify.configure()`.

**Add the following imports** to the top of your `AppDelegate.swift` file:

<amplify-block-switcher>

<amplify-block name="Swift Package Manager">

```swift
import Amplify
import AWSCognitoAuthPlugin
```

</amplify-block>

<amplify-block name="CocoaPods">

```swift
import Amplify
import AmplifyPlugins
```

</amplify-block>

</amplify-block-switcher>


**Add the following code** 

<amplify-block-switcher>

<amplify-block name="UIKit AppDelegate">

Add to your AppDelegate's `application:didFinishLaunchingWithOptions` method

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

    do {
        try Amplify.add(plugin: AWSCognitoAuthPlugin())
        try Amplify.configure()
        print("Amplify configured with auth plugin")
    } catch {
        print("Failed to initialize Amplify with \(error)")
    }

    return true
}
```

</amplify-block>

<amplify-block name="SwiftUI App">

Create a custom `AppDelegate`, and add to your `application:didFinishLaunchingWithOptions` method
```swift
class AppDelegate: NSObject, UIApplicationDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

        do {
            try Amplify.add(plugin: AWSCognitoAuthPlugin())
            try Amplify.configure()
            print("Amplify configured with auth plugin")
        } catch {
            print("Failed to initialize Amplify with \(error)")
        }

        return true
    }
}
```

Then in the `App` scene, use `UIApplicationDelegateAdaptor` property wrapper to use your custom `AppDelegate`
```swift
@main
struct MyAmplifyApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

</amplify-block>

</amplify-block-switcher>

Upon building and running this application you should see the following in your console window:

```bash
Amplify configured with auth plugin
```