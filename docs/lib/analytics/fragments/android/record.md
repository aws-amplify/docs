## Record Event

The Amplify analytics plugin also makes it easy to record custom events within the app. The plugin handles retry logic in the event the device looses network connectivity and automatically batches requests to reduce network bandwidth.

```java
import com.amplifyframework.core.Amplify;
import com.amplifyframework.analytics.AnalyticsException;
import com.amplifyframework.analytics.BasicAnalyticsEvent;
import com.amplifyframework.analytics.pinpoint.PinpointProperties

public void recordEvent() throws AnalyticsException {

    // Create an instance of BasicAnalyticsEvent.
    BasicAnalyticsEvent event = new BasicAnalyticsEvent("Amplify-event" + UUID.randomUUID().toString(),
            PinpointProperties.builder()
            .add("DemoProperty1", "DemoValue1")
            .add("DemoProperty2", 2.0)
            .build());

    Amplify.Analytics.recordEvent(event);

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
                "autoFlushEventsInterval": 30
            }
        }
    }
}
```

To manually flush events, call:

```java
Amplify.Analytics.flushEvents();
```

## Global Properties

You can register properties which will be used across all `Amplify.Analytics.record`.

```swift
let globalProperties = ["globalPropertyKey": "value"] as [String: AnalyticsPropertyValue]
Amplify.Analytics.registerGlobalProperties(globalProperties)
```

To unregister all global properties, simply call `Amplify.Analytics.unregisterGlobalProperties()` or to unregister a single property, use

```swift
Amplify.Analytics.unregisterGlobalProperties(["globalPropertyKey"])

## Disable Analytics

To disable analytics, call:
```swift
Amplify.Analytics.disable()
```

## Enable Analytics
To re-enable, call:

```java
Amplify.Analytics.enable()
```

## Disable Analytics

To disable analytics, call:

```java
Amplify.Analytics.disable()
```

## Escape hatch

For advanced use cases where Amplify does not provide the functionality, you can retrieve the escape hatch to access AWSPinpoint instance.

```java
import com.amazonaws.mobileconnectors.pinpoint.analytics.AnalyticsClient;

AmazonPinpointAnalyticsPlugin plugin = (AmazonPinpointAnalyticsPlugin) Amplify
        .Analytics
        .getPlugin("amazonPinpointAnalyticsPlugin");
AnalyticsClient analyticsClient = plugin.getEscapeHatch();
```