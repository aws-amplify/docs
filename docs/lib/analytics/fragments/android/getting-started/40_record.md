To record an event, create an `AnalyticsEvent` and call `Amplify.Analytics.recordEvent()` to send it:

<amplify-block-switcher>
<amplify-block name="Java">

```java
AnalyticsEvent event = AnalyticsEvent.builder()
        .name("PasswordReset")
        .addProperty("Channel", "SMS")
        .addProperty("Successful", true)
        .addProperty("ProcessDuration", 792)
        .addProperty("UserAge", 120.3)
        .build();

Amplify.Analytics.recordEvent(event);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
val event: AnalyticsEvent = AnalyticsEvent.builder()
        .name("PasswordReset")
        .addProperty("Channel", "SMS")
        .addProperty("Successful", true)
        .addProperty("ProcessDuration", 792)
        .addProperty("UserAge", 120.3)
        .build()

Amplify.Analytics.recordEvent(event)
```

</amplify-block>
</amplify-block-switcher>
