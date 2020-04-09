### Initialization

Open your AppDelegate and add the following code:

```swift
import Amplify
import AmplifyPlugins

class AppDelegate: UIResponder, UIApplicationDelegate {

//...other code
do {
    try Amplify.add(plugin: AWSAPIPlugin())
    try Amplify.add(plugin: AWSDataStorePlugin(schema: AmplifyModels()))
    
    // then call configure() after adding all other plugins
    try Amplify.configure()
} catch {
    print("An error occurred setting up Amplify: \(error)")
}
```
