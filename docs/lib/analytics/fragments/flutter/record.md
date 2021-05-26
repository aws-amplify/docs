## Record event

The Amplify analytics plugin also makes it easy to record custom events within the app. The plugin handles retry logic in the event the device looses network connectivity and automatically batches requests to reduce network bandwidth.




```dart
AnalyticsEvent event = AnalyticsEvent('PasswordReset');
event.properties.addStringProperty('Channel', 'SMS'); 
event.properties.addBoolProperty('Successful', true);
event.properties.addIntProperty('ProcessDuration', 792); 
event.properties.addDoubleProperty('doubleKey', 120.3);

Amplify.Analytics.recordEvent(event: event);
```

## Flush events

Events have default configuration to flush out to the network every 30 seconds. If you would like to change this, update `amplifyconfiguration.dart` with the value in milliseconds you would like for `autoFlushEventsInterval`. This configuration will flush events every 10 seconds:

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




```dart
Amplify.Analytics.flushEvents();
```


## Global Properties

You can register global properties which will be sent along with all invocations of `Amplify.Analytics.recordEvent`.



```dart
AnalyticsProperties properties = new AnalyticsProperties();
properties.addStringProperty('AppStyle', 'DarkMode'); 
Amplify.Analytics.registerGlobalProperties(globalProperties: properties);
```

To unregister a global property, call `Amplify.Analytics.unregisterGlobalProperties()`:




```dart
Amplify.Analytics.unregisterGlobalProperties(propertyName: ['AppStyle', 'OtherProperty']);
```

## Disable Analytics

To disable analytics, call:




```dart
Amplify.Analytics.disable();
```


## Enable Analytics

To re-enable, call:




```dart
Amplify.Analytics.enable();
```

