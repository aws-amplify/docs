<amplify-block-switcher>
<amplify-block name="SwiftUI App">

Create a custom `AppDelegate`, and add to your `application:didFinishLaunchingWithOptions` method

```swift
class AppDelegate: NSObject, UIApplicationDelegate {
  func application(_ application: UIApplication,
                   didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    do {
        let datastoreConfiguration = DataStoreConfiguration.custom(authModeStrategy: .multiAuth)        
        let dataStorePlugin = AWSDataStorePlugin(modelRegistration: AmplifyModels(),
                                                 configuration: datastoreConfiguration)
        try Amplify.configure()
        print("Amplify configured with DataStore plugin")
    } catch {
        print("Failed to initialize Amplify with \(error)")
        return false
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
<amplify-block name="UIKit AppDelegate">

Add to your AppDelegate's `application:didFinishLaunchingWithOptions` method

```swift
func application(_ application: UIApplication,
                 didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

    do {
        let datastoreConfiguration = DataStoreConfiguration.custom(authModeStrategy: .multiAuth)        
        let dataStorePlugin = AWSDataStorePlugin(modelRegistration: AmplifyModels(),
                                                 configuration: datastoreConfiguration)
        try Amplify.configure()
        print("Amplify configured with DataStore plugin")
    } catch {
        print("Failed to initialize Amplify with \(error)")
        return false
    }

    return true
}
```
</amplify-block>
</<amplify-block-switcher>