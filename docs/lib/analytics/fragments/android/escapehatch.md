For advanced use cases where Amplify does not provide the functionality, you can retrieve the escape hatch to access the underlying Amazon Pinpoint client.

<amplify-block-switcher>
<amplify-block name="Java">

```java
AWSPinpointAnalyticsPlugin plugin = (AWSPinpointAnalyticsPlugin) Amplify
        .Analytics
        .getPlugin("awsPinpointAnalyticsPlugin");
AnalyticsClient analyticsClient = plugin.getEscapeHatch();
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
val plugin: AWSPinpointAnalyticsPlugin = Amplify.Analytics
        .getPlugin("awsPinpointAnalyticsPlugin") as AWSPinpointAnalyticsPlugin
val analyticsClient: AnalyticsClient? = plugin.getEscapeHatch()
```

</amplify-block>
</amplify-block-switcher>