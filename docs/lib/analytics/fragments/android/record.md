## Record event

The Amplify analytics plugin also makes it easy to record custom events within the app. The plugin handles retry logic in the event the device loses network connectivity and automatically batches requests to reduce network bandwidth.

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
val event = AnalyticsEvent.builder()
    .name("PasswordReset")
    .addProperty("Channel", "SMS")
    .addProperty("Successful", true)
    .addProperty("ProcessDuration", 792)
    .addProperty("UserAge", 120.3)
    .build()

Amplify.Analytics.recordEvent(event)
```

</amplify-block>
<amplify-block name="RxJava">

```java
AnalyticsEvent event = AnalyticsEvent.builder()
    .name("PasswordReset")
    .addProperty("Channel", "SMS")
    .addProperty("Successful", true)
    .addProperty("ProcessDuration", 792)
    .addProperty("UserAge", 120.3)
    .build();

RxAmplify.Analytics.recordEvent(event);
```

</amplify-block>
</amplify-block-switcher>

## Flush events

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

<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Analytics.flushEvents();
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.Analytics.flushEvents()
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.Analytics.flushEvents();
```

</amplify-block>
</amplify-block-switcher>


## Global Properties

You can register global properties which will be sent along with all invocations of `Amplify.Analytics.recordEvent`.

<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Analytics.registerGlobalProperties(
    AnalyticsProperties.builder()
        .add("AppStyle", "DarkMode")
        .build());
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.Analytics.registerGlobalProperties(
    AnalyticsProperties.builder()
        .add("AppStyle", "DarkMode")
        .build()
)
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.Analytics.registerGlobalProperties(
    AnalyticsProperties.builder()
        .add("AppStyle", "DarkMode")
        .build());
```

</amplify-block>
</amplify-block-switcher>

To unregister a global property, call `Amplify.Analytics.unregisterGlobalProperties()`:

<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Analytics.unregisterGlobalProperties("AppStyle", "OtherProperty");
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.Analytics.unregisterGlobalProperties("AppStyle", "OtherProperty")
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.Analytics.unregisterGlobalProperties("AppStyle", "OtherProperty");
```

</amplify-block>
</amplify-block-switcher>

## Disable Analytics

To disable analytics, call:

<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Analytics.disable();
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.Analytics.disable()
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.Analytics.disable();
```

</amplify-block>
</amplify-block-switcher>

## Enable Analytics

To re-enable, call:

<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Analytics.enable();
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.Analytics.enable()
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.Analytics.enable();
```

</amplify-block>
</amplify-block-switcher>

