Add the following code to your app:

```swift                                
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        try! Amplify.add(plugin: AWSCognitoAuthPlugin())
        try! Amplify.add(plugin: AWSAPIPlugin())
        try! Amplify.configure()
        print("Amplify initialized")

        return true
    }
```