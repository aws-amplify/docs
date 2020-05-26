To record an event,  specify your event using `BasicAnalyticsEvent` and call `Amplify.Analytics.record()`

```swift
func recordEvents() {
    let properties: [String: AnalyticsPropertyValue] = [
        "eventPropertyStringKey": "eventPropertyStringValue",
        "eventPropertyIntKey": 123,
        "eventPropertyDoubleKey": 12.34,
        "eventPropertyBoolKey": true
    ]
    let event = BasicAnalyticsEvent("eventName", properties: properties)
    Amplify.Analytics.record(event: event)
}
```

## View Analytics Console

From the terminal run the following command. Navigate to the Analytics tab, and then choose View in Pinpoint.

```console
amplify console analytics
```