To record an event, specify your event using `BasicAnalyticsEvent` and call `Amplify.Analytics.recordEvent()`

```java
BasicAnalyticsEvent event = new AnalyticsEvent(
        "EventName",
        PinpointProperties.builder()
            .add("DemoProperty1", "DemoValue1")
            .add("DemoProperty2", 2.0)
            .build()
);

Amplify.Analytics.recordEvent(event);
```
