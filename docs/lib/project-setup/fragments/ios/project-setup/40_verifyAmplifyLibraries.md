### Step 3: Verify that Amplify Libraries are integrated into the application

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

Build your project (`CMD + b`).  If your build succeeeds, then you have successfully added the Amplify library to your project.  In order to run the application (without it erroring), you will need to provision resources in the backend.  If you attempt run your application at this point, you will see the following error:
```
An error occurred setting up Amplify: ConfigurationError: Could not load default `amplifyconfiguration.json` file
```


