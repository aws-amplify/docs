**Open AppDelegate.swift** and add `import Amplify` at the top of the file:
```swift
import Amplify
```

**Update the following function** to verify that Amplify can be compiled into your project:
```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    do {
        try Amplify.configure()
    } catch {
        print("An error occurred setting up Amplify: \(error)")
    }
    return true
}
```
**Note:** If your app conforms to the `App` protocol, you can use your own `AppDelegate` class. Implement an `AppDelegate` and point Swift UI's `UIApplicationDelegateAdaptor` property wrapper to it, as below.

```swift
class AppDelegate: NSObject, UIApplicationDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
        do {
            try Amplify.configure()
        } catch {
            print("An error occurred setting up Amplify: \(error)")
        }
        return true
    }
}
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

Build your project (`Cmd+b`), then you have successfully added the Amplify library to your project and you should be able to run the application.

Optionally, if you'd like to see additional log messages of what amplify is doing during configuration, you can turn on verbose logging before calling `Amplify.configure()`:
```swift
do {
    Amplify.Logging.logLevel = .verbose
    // Configure Amplify as usual...
    try Amplify.configure()
    // ...
```

Re-running the application with verbose logging on, you will see the following messages:
```console
[Amplify] Configuring
[Amplify] Configuration: nil
```
