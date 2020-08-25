For advanced use cases where Amplify does not provide the functionality, you can retrieve the escape hatch to access the underlying Amazon Pinpoint client.

Add the following imports:

```swift
import AmplifyPlugins
import AWSPinpoint
```

Then retrieve the escape hatch with this code:

```swift
func getEscapeHatch() {
    do {
        let plugin = try Amplify.Analytics.getPlugin(for: "awsPinpointAnalyticsPlugin") as! AWSPinpointAnalyticsPlugin
        let awsPinpoint = plugin.getEscapeHatch()
    } catch {
        print("Get escape hatch failed with error - \(error)")
    }
}
```