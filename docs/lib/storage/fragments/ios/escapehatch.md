For advanced use cases where Amplify does not provide the functionality, you can retrieve the escape hatch to access the [AWSS3](https://aws-amplify.github.io/aws-sdk-ios/docs/reference/AWSS3/Classes/AWSS3.html) instance.

Add the following imports:

```swift
import AmplifyPlugins
import AWSS3
```

Then retrieve the escape hatch with this code

```swift
func getEscapeHatch() {
    do {
        let plugin = try Amplify.Storage.getPlugin(for: "awsS3StoragePlugin") as! AWSS3StoragePlugin
        let awsS3 = plugin.getEscapeHatch()
    } catch {
        print("Get escape hatch failed with error - \(error)")
    }
}
```