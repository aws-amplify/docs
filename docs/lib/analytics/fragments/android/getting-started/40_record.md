To record an event, specify your event using `BasicAnalyticsEvent` and call `Amplify.Analytics.recordEvent()`

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

## View Analytics Console

From the terminal run the following command. Navigate to the Analytics tab, and then choose View in Pinpoint.

```console
amplify console analytics
```