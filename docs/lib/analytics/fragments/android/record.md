## Record Event

The Amplify analytics plugin also makes it easy to record custom events within the app. The plugin handles retry logic in the event the device looses network connectivity and automatically batches requests to reduce network bandwidth.

```java
BasicAnalyticsEvent event = new BasicAnalyticsEvent(
        "EventName",
        PinpointProperties.builder()
            .add("DemoProperty1", "DemoValue1")
            .add("DemoProperty2", 2.0)
            .build()
);

Amplify.Analytics.recordEvent(event);
```

## Flush Events

Events have default configuration to flush out to the network every 30 seconds. If you would like to change this, update `amplifyconfiguration.json` with the value in milliseconds you would like for `autoFlushEventsInterval`. This configuration will flush events every 10 seconds:
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
                "autoFlushEventsInterval": 10000
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

```java
Amplify.Analytics.registerGlobalProperties(
    PinpointProperties.builder()
        .add("GlobalProperty", "globalVal")
        .build()
);
```

To unregister all global properties, simply call `Amplify.Analytics.unregisterGlobalProperties()` or to unregister a single property, use

```java
Set<String> globalPropertyKeys = new HashSet<>();
globalPropertyKeys.add("GlobalProperty");
Amplify.Analytics.unregisterGlobalProperties(globalPropertyKeys);
```

## Disable Analytics

To disable analytics, call:

```java
Amplify.Analytics.disable()
```


## Enable Analytics
To re-enable, call:

```java
Amplify.Analytics.enable()
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
