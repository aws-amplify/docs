## Record Event

The Amplify Analytics plugin provides a simple interface to record custom events within your app. The plugin handles retry logic in the event the device looses network connectivity, and automatically batches requests to reduce network bandwidth.

```swift
func recordEvents() {
    let properties = ["eventPropertyStringKey": "eventProperyStringValue",
                      "eventPropertyIntKey": 123,
                      "eventPropertyDoubleKey": 12.34,
                      "eventPropertyBoolKey": true] as [String: AnalyticsPropertyValue]
    let event = BasicAnalyticsEvent("eventName", properties: properties)
    Amplify.Analytics.record(event: event)

    // Plugin will automatically flush events. 
    // You do not have to do this in the app code.
    Amplify.Analytics.flushEvents() 
}
```

## Flush Events

Events have default configuration to flush out to the network every 60 seconds. If you would like to change this, update `amplifyconfiguration.json` with the value you would like for `autoFlushEventsInterval` like so
```json
{
    "UserAgent": "aws-amplify-cli/2.0",
    "Version": "1.0",
    "analytics": {
        "plugins": {
            "awsPinpointAnalyticsPlugin": {
                "pinpointAnalytics": {
                    "appId": "AppID",
                    "region": "Region"
                },
                "pinpointTargeting": {
                    "region": "Region"
                },
                "autoFlushEventsInterval": 60
            }
        }
    }
}
```

> **Note**: If you set `autoFlushEventsInterval` to 0, you are responsible for calling `Amplify..flushEvents()` to flush events.


## Global Properties

You can register properties which will be used across all `Amplify.Analytics.record`.

```swift
let globalProperties = ["globalPropertyKey": "value"] as [String: AnalyticsPropertyValue]
Amplify.Analytics.registerGlobalProperties(globalProperties)
```

To unregister all global properties call `Amplify.Analytics.unregisterGlobalProperties()`. 

To unregister a single property:
```swift
Amplify.Analytics.unregisterGlobalProperties(["globalPropertyKey"])
```

## Disable Analytics

To disable analytics:
```swift
Amplify.Analytics.disable()
```

## Enable Analytics

To enable analytics:
```swift
Amplify.Analytics.enable()
```

## Escape Hatch

For advanced use cases where Amplify does not provide the functionality, you can retrieve the escape hatch to access AWSPinpoint instance.

Add `import AmplifyPlugins` and then the following code:

```swift
 func getEscapeHatch() throws {
    let plugin = try Amplify.Analytics.getPlugin(for: "awsPinpointAnalyticsPlugin")
    guard let pinpointAnalyticsPlugin = plugin as? AWSPinpointAnalyticsPlugin else {
        XCTFail("Could not get plugin of type AWSPinpointAnalyticsPlugin")
        return
    }
    let awsPinpoint = pinpointAnalyticsPlugin.getEscapeHatch()
    XCTAssertNotNil(awsPinpoint)
}
```