To initialize the Amplify DataStore call `Amplify.add(plugin:)` method and add the `AWSDataStorePlugin`, then call `Amplify.configure()`.

**Add the following imports** to the top of your `AppDelegate.swift` file:

```swift
import Amplify
import AmplifyPlugins
```

**Add the following code** to your AppDelegate's `application:didFinishLaunchingWithOptions` method:

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    do {
        // AmplifyModels is generated in the previous step
        let dataStorePlugin = AWSDataStorePlugin(modelRegistration: AmplifyModels())
        try Amplify.add(plugin: dataStorePlugin)
        try Amplify.configure()
        print("Amplify configured with DataStore plugin")
    } catch {
        print("Failed to initialize Amplify with \(error)")
        return false
    }

    return true
}
```
Upon building and running this application you should see the following in your console window:

```console
Amplify configured with DataStore plugin
```
